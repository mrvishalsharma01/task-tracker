import React, { useState } from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks, onToggle, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 className="empty-state-title">No tasks found</h3>
          <p className="empty-state-text">
            {tasks.length === 0 
              ? "You haven't created any tasks yet. Click 'Add Task' to get started!"
              : "No tasks match your current filter. Try changing the filter or add new tasks."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
          Tasks ({tasks.length})
        </h3>
      </div>
      
      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;