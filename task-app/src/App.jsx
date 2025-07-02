import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Card from "./components/Card";
import TaskManager from "./components/TaskManager";
import ApiDemo from "./pages/ApiDemo";
// import useLocalStorage from "./hooks/useLocalStorage";
function Home() {
  return (
    <main>
      <Button>Click Me</Button>
      <Card title="Welcome">This is the Home page!</Card>
      <Card title="Task Manager">
        <TaskManager />
      </Card>
    </main>
  );
}

function About() {
  return (
    <main>
      <Card title="About">This is the About page!</Card>
    </main>
  );
}

function App() {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/api-demo" element={<ApiDemo />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;