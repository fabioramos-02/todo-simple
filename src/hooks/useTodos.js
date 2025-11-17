import { useState, useEffect } from 'react';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  // Carregar tarefas do localStorage ao iniciar
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Salvar tarefas no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    if (title.trim()) {
      const newTodo = {
        id: Date.now(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos(prev => [newTodo, ...prev]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newTitle) => {
    if (newTitle.trim()) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, title: newTitle.trim() } : todo
        )
      );
    }
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted
  };
};