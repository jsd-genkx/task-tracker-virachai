import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
// import App from "./App.jsx";
import TaskTracker from "./TaskTracker.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <main className="flex justify-center">
      <TaskTracker />
    </main>
  </StrictMode>
);
