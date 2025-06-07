import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
       console.log("Fetched tasks from API:", res.data);
      setTasks(res.data);
       if (res.data.length > 0 && res.data[0].user?.name) {
        setUserName(res.data[0].user.name);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();

    
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
<div className="min-h-screen bg-gray-100 p-6">
  <nav className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">

    <div className="flex items-center space-x-3">
      <img
        src="logo.png"
        alt="Your Company"
        className="h-12 w-auto"
      />
      <span className="text-lg font-bold text-gray-800">
        Task Manager
      </span>
    </div>
    <button
      onClick={handleLogout}
      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
    >
      Logout
    </button>
  </nav>

  <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
    Glad you’re back, {userName}!
  </h2>

  <div className="max-w-xl mx-auto space-y-6">
    <TaskForm fetchTasks={fetchTasks} />
    <TaskList tasks={tasks} fetchTasks={fetchTasks} />
  </div>
</div>
  );
}

export default Dashboard;
