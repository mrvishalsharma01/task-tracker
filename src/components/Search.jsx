import React from 'react';

const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks by title or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default Search; 