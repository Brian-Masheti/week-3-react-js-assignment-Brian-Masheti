import React from "react";

// Simple footer component
function Footer () {
    return (
        <footer className="bg-gray-800 text-white text-center py-4 mt-8">
            <p>&copy; {new Date().getFullYear()} Task Management App. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer;