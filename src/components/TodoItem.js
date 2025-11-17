import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onUpdate(todo.id, editTitle);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyPress}
            className="edit-input"
            autoFocus
          />
        </form>
      ) : (
        <span 
          className="todo-title"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}
      
      <button 
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        title="Excluir tarefa"
      >
        ×
      </button>
    </div>
  );
};

export default TodoItem;