import React from 'react';

const TaskFilter = ({ currentFilter, onFilterChange, stats }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', icon: '📋', count: stats.total },
    { key: 'pending', label: 'Pending', icon: '🔁', count: stats.pending },
    { key: 'completed', label: 'Completed', icon: '✅', count: stats.completed },
    { key: 'high', label: 'High Priority', icon: '🔴', count: stats.highPriority },
    { key: 'overdue', label: 'Overdue', icon: '⚠️', count: stats.overdue }
  ];

  return (
    <div className="card">
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          Filter Tasks
        </h3>
      </div>
      
      <div className="filters">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
            <span className="badge badge-primary" style={{ 
              fontSize: '10px', 
              padding: '2px 6px',
              marginLeft: '4px'
            }}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;