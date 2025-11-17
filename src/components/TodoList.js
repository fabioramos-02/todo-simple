import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onUpdate }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>🎉 Nenhuma tarefa cadastrada!</p>
        <p>Adicione uma nova tarefa acima para começar.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-stats">
        <div className="stat">
          <span className="stat-number">{totalTodos}</span>
          <span className="stat-label">Criadas</span>
        </div>
        <div className="stat">
          <span className="stat-number">{completedTodos}</span>
          <span className="stat-label">Concluídas</span>
        </div>
      </div>

      <div className="todos-container">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;