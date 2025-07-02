import React, { useEffect, useState } from "react";

function ApiDemo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 20;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter posts by search
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="bg-gray-400 dark:bg-gray-700 rounded shadow p-4 max-w-2xl mx-auto my-6 sm:p-6 md:p-8 transition-colors duration-300">
      <h2 className="font-bold text-lg mb-2 text-center md:text-2xl">API Demo: Posts</h2>
      <input
        type="text"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        placeholder="Search posts..."
        className="mb-4 px-2 py-1 rounded border w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <>
          <ul className="space-y-2 animate-fadein">
            {paginatedPosts.map((post) => (
              <li key={post.id} className="border-b border-gray-200 dark:border-gray-500 pb-2">
                <h3 className="font-semibold text-base md:text-lg">{post.title}</h3>
                <p className="text-sm md:text-base text-gray-400 dark:text-gray-300">{post.body}</p>
              </li>
            ))}
            {filteredPosts.length === 0 && <li>No posts found.</li>}
          </ul>
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-2 py-1 rounded bg-gray-500 text-white disabled:opacity-50 transition"
              >
                Prev
              </button>
              <span className="mx-2">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-2 py-1 rounded bg-gray-500 text-white disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      {/* Custom animation for fade-in */}
      <style>{`
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadein { animation: fadein 0.7s; }
      `}</style>
    </div>
  );
}

export default ApiDemo;
