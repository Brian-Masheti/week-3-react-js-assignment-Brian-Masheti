import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Practice Tailwind CSS", completed: false },
  { id: 3, text: "Build a Task App", completed: false },
]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  // Add a new task
  function handleAddTask(e) {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false },
    ]);
    setNewTask("");
  }

  // Toggle completed status
  function handleToggleCompleted(id) {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Delete a task
  function handleDeleteTask(id) {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  // Filter tasks based on filter state
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-bold text-lg mb-1">Tasks</h2>
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          className={`px-2 py-1 rounded text-sm ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-2 py-1 rounded text-sm ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`px-2 py-1 rounded text-sm ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex items-center mb-3 gap-2">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="New task"
          className="border rounded px-2 py-1 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Add
        </button>
      </form>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompleted(task.id)}
              className="mr-2"
            />
            <span
              className={`flex-1 ${task.completed ? "line-through text-green-600" : ""}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="ml-2 text-red-500 hover:text-red-700"
              title="Delete"
            >
              <img
                src="data:image/png;base64,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"
                alt="Delete"
                className="h-4 w-4"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;