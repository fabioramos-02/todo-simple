import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 TO-DO List</h1>
        <p>Simples e objetivo</p>
      </header>

      <main className="app-main">
        <TodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      </main>

      <footer className="app-footer">
        <p>💡 Dica: Clique duas vezes em uma tarefa para editá-la</p>
      </footer>
    </div>
  );
}

export default App;
