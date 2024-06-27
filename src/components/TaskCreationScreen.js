import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, saveTasks } from '../utils/localStorage';
import './TaskCreationScreen.css'; // Import the CSS file

const TaskCreationScreen = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      status: 'todo'
    };
    const tasks = getTasks();
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    // Clear the input fields
    setTitle('');
    setDescription('');
    setDueDate('');
    navigate('/');
  };
  const handleBackHome = () => {
    navigate('/');
  };
  return (
    <div className="task-creation-container">
      <h2>Create New Task</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleCreateTask}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <div className='btn-container'>
        <button className='back-btn' onClick={handleBackHome}>Back to Home</button>
        <button type="submit">Create Task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreationScreen;
