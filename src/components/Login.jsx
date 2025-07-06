import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    setError('');
    onLogin(username.trim());
  };

  return (
    <div className="container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              color: '#333',
              marginBottom: '8px'
            }}>
              Task Tracker
            </h1>
            <p style={{ color: '#6c757d', fontSize: '16px' }}>
              Welcome! Please enter your username to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoFocus
              />
              {error && (
                <p style={{ 
                  color: '#dc3545', 
                  fontSize: '14px', 
                  marginTop: '8px' 
                }}>
                  {error}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Get Started
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px', 
            padding: '16px',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <p style={{ 
              fontSize: '14px', 
              color: '#6c757d',
              margin: 0
            }}>
              💡 This is a demo app. No real authentication required!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 