import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTasks } from '../utils/localStorage';
import './TaskListScreen.css'; // Import the CSS file

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('status'); // Default sort by status
  const navigate = useNavigate()
  useEffect(() => {
    const storedTasks = getTasks();
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);

  useEffect(() => {
    filterTasks(searchTerm);
  }, [tasks, searchTerm]);

  const filterTasks = (term) => {
    setSearchTerm(term);
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  const sortTasks = (sortBy) => {
    setSortBy(sortBy);
    let sorted = [...filteredTasks];
    switch (sortBy) {
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'status':
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'dueDate':
        sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      default:
        break;
    }
    setFilteredTasks(sorted);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'green';
      case 'in progress':
        return 'yellow';
      case 'todo':
        return 'blue';
      default:
        return 'black'; // default color if status is unknown
    }
  };

  const handleCreateTask = () => {
    navigate('/create-task');
  };

  return (
    <div className="task-list-container">
      <div className='head-container'>
        <h2>Task List</h2>
          <button className="create-task-button" onClick={handleCreateTask}>Create Task</button>
      </div>
      <div className='inputs'>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => filterTasks(e.target.value)}
      />
      <select onChange={(e) => sortTasks(e.target.value)}>
        <option value="status">Sort by Status</option>
        <option value="title">Sort by Title</option>
        <option value="dueDate">Sort by Due Date</option>
      </select>
      </div>
      {filteredTasks.length === 0 ? (
        <p>No results found.</p>
      ) : (
      <ol className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className="task-item">
            <Link to={`/task/${task.id}`} className="task-link">
              <span className="task-title">{task.title}</span>
              <span className="task-status" style={{ color: getStatusColor(task.status) }}>{task.status}</span>
              <span className="task-due-date">{task.dueDate}</span>
            </Link>
          </li>
        ))}
      </ol>
      )}
    </div>
  );
};

export default TaskListScreen;
