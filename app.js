const TODO_STORAGE_KEY = "todo-items";

const createTodo = (title, completed = false) => ({
  title: String(title),
  completed: Boolean(completed),
});

const normalizeTodo = (todo) => {
  if (!todo || typeof todo !== "object") {
    return null;
  }

  return {
    title: typeof todo.title === "string" ? todo.title : "",
    completed: typeof todo.completed === "boolean" ? todo.completed : false,
  };
};

const readTodosFromStorage = () => {
  const rawTodos = localStorage.getItem(TODO_STORAGE_KEY);

  if (!rawTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(rawTodos);

    if (!Array.isArray(parsedTodos)) {
      return [];
    }

    return parsedTodos
      .map(normalizeTodo)
      .filter((todo) => todo !== null && todo.title !== "");
  } catch (error) {
    return [];
  }
};

const writeTodosToStorage = (todos) => {
  const safeTodos = Array.isArray(todos)
    ? todos.map(normalizeTodo).filter((todo) => todo !== null)
    : [];

  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(safeTodos));

  return safeTodos;
};

const todoAppContract = {
  TODO_STORAGE_KEY,
  createTodo,
  normalizeTodo,
  readTodosFromStorage,
  writeTodosToStorage,
};

if (typeof globalThis !== "undefined") {
  globalThis.todoAppContract = todoAppContract;
}

if (typeof window !== "undefined") {
  window.todoAppContract = todoAppContract;
}

console.log("Todo data model and storage contract defined.");
