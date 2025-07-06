import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setUsername('');
    setIsAuthenticated(false);
    localStorage.removeItem('username');
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard username={username} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;