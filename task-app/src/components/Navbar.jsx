import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

// Simple navbar component
function Navbar() {
    return (
        <nav>
            <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
                <div className="font-bold text-lg">Task App</div>
                <div className="space-x-4 flex items-center">
                    <a href="/" className='hover:underline'>Home</a>
                    <a href="/about" className='hover:underline'>About</a>
                    <a href="/api-demo" className='hover:underline'>API Demo</a>
                    <ThemeToggleButton />
                </div>
            </div>
        </nav>
    );
}

// Theme toggle button as a subcomponent
function ThemeToggleButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white transition"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? '🌙' : '☀️'}
        </button>
    );
}

export default Navbar;