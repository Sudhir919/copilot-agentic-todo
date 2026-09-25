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

const todoState = [];

const createTodoItem = (title, completed = false) => {
  const todo = createTodo(title, completed);
  todoState.push(todo);
  return todo;
};

const getTodos = () => [...todoState];

const updateTodoItem = (index, updates = {}) => {
  if (typeof index !== "number" || index < 0 || index >= todoState.length) {
    return null;
  }

  const current = todoState[index];
  const nextTodo = normalizeTodo({
    ...current,
    ...updates,
  });

  if (!nextTodo || nextTodo.title === "") {
    return null;
  }

  todoState[index] = nextTodo;
  return todoState[index];
};

const deleteTodoItem = (index) => {
  if (typeof index !== "number" || index < 0 || index >= todoState.length) {
    return false;
  }

  todoState.splice(index, 1);
  return true;
};

const todoAppContract = {
  TODO_STORAGE_KEY,
  createTodo,
  normalizeTodo,
  readTodosFromStorage,
  writeTodosToStorage,
  todoState,
  createTodoItem,
  getTodos,
  updateTodoItem,
  deleteTodoItem,
};

if (typeof globalThis !== "undefined") {
  globalThis.todoAppContract = todoAppContract;
}

if (typeof window !== "undefined") {
  window.todoAppContract = todoAppContract;
}

console.log("Todo in-memory state and CRUD behavior defined.");
