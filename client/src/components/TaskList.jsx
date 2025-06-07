import { CheckCircle, Circle, Trash2 } from "lucide-react";
import api from "../services/api";

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const toggleCompleted = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("Toggle failed:", err.response?.data || err.message);
    }
  };

  if (!tasks.length) {
    return <p className="text-center text-gray-500 italic mt-6">No tasks found.</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center hover:shadow-lg transition duration-200 group"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleCompleted(task)}
              className="text-blue-600"
            >
              {task.completed ? (<CheckCircle className="w-6 h-6 text-green-500" />) : (<Circle className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />)}
            </button>
            <span
              className={`text-base font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`} >
              {task.title}
            </span>
          </div>

          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 hover:text-red-700 transition duration-150"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
