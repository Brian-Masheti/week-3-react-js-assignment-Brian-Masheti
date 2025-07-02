import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {
  // Check localStorage for theme preference, default to 'light'
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("theme");
    return saved ? saved : "light";
  });

  // Update localStorage and <html> class whenever theme changes
  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Toggle between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
