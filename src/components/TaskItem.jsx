import React, { useState } from 'react';
import TaskForm from './TaskForm.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { isDark } = useTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) + ' • ' + date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays === 0) return 'today';
    return 'upcoming';
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleEdit = (updatedTask) => {
    onUpdate(task.id, updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <TaskForm
          initialData={task}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  const dueDateStatus = getDueDateStatus(task.dueDate);
  const isOverdue = dueDateStatus === 'overdue';

  return (
    <>
      <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
        <div className="task-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
            <div className={`priority-indicator priority-${task.priority}`}></div>
            <input
              type="checkbox"
              className="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <div style={{ flex: 1 }}>
              <h4 className="task-title">{task.title}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span className={`badge badge-${task.priority}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
                <span className={`badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
                  {task.completed ? '✅ Completed' : '🔁 Pending'}
                </span>
              </div>
            </div>
          </div>
          <div className="task-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary"
              style={{ padding: '8px 12px', fontSize: '12px' }}
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn btn-danger"
              style={{ padding: '8px 12px', fontSize: '12px' }}
            >
              Delete
            </button>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span>Created: {formatDate(task.createdAt)}</span>
            {task.dueDate && (
              <div className={`due-date ${dueDateStatus}`}>
                <span>📅 Due: {formatDueDate(task.dueDate)}</span>
                {dueDateStatus === 'overdue' && <span>⚠️ Overdue</span>}
                {dueDateStatus === 'today' && <span>⚡ Due Today</span>}
              </div>
            )}
          </div>
          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map((tag, index) => (
                <span key={index} className="task-tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
              Confirm Delete
            </h3>
            <p style={{ marginBottom: '24px', color: '#6c757d' }}>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;