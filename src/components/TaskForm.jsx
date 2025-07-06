import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState(initialData?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    
    setError('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    });
    
    // Reset form if not editing
    if (!initialData) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setTags('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
        {initialData ? 'Edit Task' : 'Add New Task'}
      </h3>
      
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description (Optional)
        </label>
        <textarea
          id="description"
          className="form-input form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority" className="form-label">
          Priority
        </label>
        <select
          id="priority"
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate" className="form-label">
          Due Date (Optional)
        </label>
        <input
          type="datetime-local"
          id="dueDate"
          className="form-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tags" className="form-label">
          Tags (Optional)
        </label>
        <input
          type="text"
          id="tags"
          className="form-input"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas (e.g., work, urgent, project)"
        />
      </div>

      {error && (
        <p style={{ 
          color: '#dc3545', 
          fontSize: '14px', 
          marginBottom: '16px' 
        }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;