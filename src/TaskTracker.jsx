import { useState } from "react";
import { PlusCircle, Trash2, CheckCircle } from "lucide-react";

// Main TaskTracker component
const TaskTracker = () => {
  // State management for tasks and new task input
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // 'all', 'active', or 'completed'

  // Handler for adding new tasks
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setNewTask("");
    }
  };

  // Handler for toggling task completion
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handler for deleting tasks
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filter tasks based on current filter setting
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Tracker</h1>
        <p className="text-gray-600">
          Keep track of your daily tasks and progress
        </p>
      </div>

      {/* Task Input Form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Add Task
          </button>
        </div>
      </form>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              task.completed ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className={`p-1 rounded-full ${
                  task.completed ? "text-green-500" : "text-gray-400"
                }`}
              >
                <CheckCircle size={24} />
              </button>
              <span
                className={`${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {task.createdAt.toLocaleDateString()}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks to display
          </div>
        )}
      </div>

      {/* Task Statistics */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Tasks: {tasks.length}</span>
          <span>
            Completed: {tasks.filter((task) => task.completed).length}
          </span>
          <span>Active: {tasks.filter((task) => !task.completed).length}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;
