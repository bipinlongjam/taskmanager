
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TaskCreationScreen from './components/TaskCreationScreen';
import TaskListScreen from './components/TaskListScreen';
import TaskDetailsScreen from './components/TaskDetailsScreen';

function App() {
  return (
    <div>
     <h1 className='heading'>Task Manager</h1>
     <Router>
      <Routes>
        <Route path="/" element={<TaskListScreen/>}/>
        <Route path="/task/:taskId" element={<TaskDetailsScreen/>} />
        <Route path="/create-task" element={<TaskCreationScreen/>}/>
      </Routes>
     </Router>
    
    </div>
  );
}

export default App;
