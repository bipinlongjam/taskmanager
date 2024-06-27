import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasks, saveTasks } from '../utils/localStorage';
import './TaskDetailsScreen.css'; // Import the CSS file

const TaskDetailsScreen = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = getTasks();
    const selectedTask = tasks.find(task => task.id === taskId);
    if (!selectedTask) {
      navigate('/'); // Redirect if task not found
    } else {
      setTask(selectedTask);
    }
  }, [taskId, navigate]);

  const handleDelete = () => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
    navigate('/');
  };

  const handleStatusUpdate = (newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    const tasks = getTasks();
    const updatedTasks = tasks.map(t => (t.id === taskId ? updatedTask : t));
    saveTasks(updatedTasks);
    setTask(updatedTask);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className="task-details-container">
      <h2>{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.status}</p>
      <button className="delete-btn" onClick={handleDelete}>Delete Task</button>
      <select onChange={(e) => handleStatusUpdate(e.target.value)} value={task.status}>
        <option value="todo">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
        <button className="back-btn" onClick={handleBackHome}>Back to Home</button>
    </div>
  );
};

export default TaskDetailsScreen;
