import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'todos';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoaded = useRef(false); // 🔥 Novo: controlar se já carregou

  // Carregar uma vez quando o componente montar
  useEffect(() => {
    // 🔥 Prevenir múltiplas execuções no Strict Mode
    if (hasLoaded.current) return;
    
    const loadTodos = () => {
      try {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        console.log('📥 Tentando carregar do localStorage:', savedTodos);
        
        if (savedTodos && savedTodos !== 'undefined' && savedTodos !== 'null') {
          const parsedTodos = JSON.parse(savedTodos);
          if (Array.isArray(parsedTodos)) {
            setTodos(parsedTodos);
            console.log('✅ Tarefas carregadas:', parsedTodos.length);
          }
        }
      } catch (error) {
        console.error('❌ Erro ao carregar tarefas:', error);
        setTodos([]);
      } finally {
        setIsLoaded(true);
        hasLoaded.current = true; // 🔥 Marcar como carregado
      }
    };

    loadTodos();
  }, []);

  // Salvar sempre que todos mudarem
  useEffect(() => {
    if (isLoaded) {
      console.log('💾 Salvando no localStorage:', todos);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        console.log('✅ Tarefas salvas com sucesso');
      } catch (error) {
        console.error('❌ Erro ao salvar tarefas:', error);
      }
    }
  }, [todos, isLoaded]);

  const addTodo = (title) => {
    if (title && title.trim()) {
      const newTodo = {
        id: Date.now() + Math.random(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos(prev => [newTodo, ...prev]);
      return true;
    }
    return false;
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
    if (newTitle && newTitle.trim()) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, title: newTitle.trim() } : todo
        )
      );
      return true;
    }
    return false;
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    isLoaded
  };
};