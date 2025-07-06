import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';
import TaskFilter from './TaskFilter.jsx';
import Search from './Search.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { loadTasks, saveTasks } from '../utils/localStorage';

const Dashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (newTask) => {
    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      tags: newTask.tags || [],
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([task, ...tasks]);
    setShowAddForm(false);
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, ...updatedTask }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    if (filter === 'high' && task.priority !== 'high') return false;
    if (filter === 'overdue') {
      if (task.completed) return false;
      if (!task.dueDate) return false;
      const now = new Date();
      const due = new Date(task.dueDate);
      if (due >= now) return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const descriptionMatch = task.description?.toLowerCase().includes(searchLower);
      const tagsMatch = task.tags?.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!titleMatch && !descriptionMatch && !tagsMatch) return false;
    }
    
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    highPriority: tasks.filter(task => task.priority === 'high').length,
    overdue: tasks.filter(task => {
      if (task.completed) return false;
      if (!task.dueDate) return false;
      const now = new Date();
      const due = new Date(task.dueDate);
      return due < now;
    }).length
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Task Dashboard</h1>
          <div className="header-actions">
            <span style={{ color: 'var(--text-secondary)' }}>
              Welcome, <strong>{username}</strong>!
            </span>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button onClick={onLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.highPriority}</div>
            <div className="stat-label">High Priority</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
              My Tasks
            </h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="btn btn-primary"
            >
              {showAddForm ? 'Cancel' : '+ Add Task'}
            </button>
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="card">
            <TaskForm onSubmit={addTask} onCancel={() => setShowAddForm(false)} />
          </div>
        )}

        {/* Search */}
        <Search 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Task Filter */}
        <TaskFilter 
          currentFilter={filter} 
          onFilterChange={setFilter}
          stats={stats}
        />

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </div>
    </div>
  );
};

export default Dashboard; 