const TODO_STORAGE_KEY = "todo-items";

const isValidTodoTitle = (title) =>
  typeof title === "string" && title.trim().length > 0;

const isValidTodoCompletion = (completed) => typeof completed === "boolean";

const validateTodoInput = (title, completed) => {
  if (!isValidTodoTitle(title) || !isValidTodoCompletion(completed)) {
    return null;
  }

  return {
    title: title.trim(),
    completed,
  };
};

const createTodo = (title, completed = false) => {
  const validatedTodo = validateTodoInput(title, completed);

  if (!validatedTodo) {
    return null;
  }

  return { ...validatedTodo };
};

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

const todoState = readTodosFromStorage();

const persistTodoState = () => {
  writeTodosToStorage(todoState);
  return todoState;
};

const createTodoItem = (title, completed = false) => {
  const todo = createTodo(title, completed);

  if (!todo) {
    return null;
  }

  todoState.push(todo);
  persistTodoState();
  return todo;
};

const getTodos = () => [...todoState];

const updateTodoItem = (index, updates = {}) => {
  if (typeof index !== "number" || index < 0 || index >= todoState.length) {
    return null;
  }

  const current = todoState[index];
  const hasTitleUpdate = Object.prototype.hasOwnProperty.call(updates, "title");
  const hasCompletedUpdate = Object.prototype.hasOwnProperty.call(
    updates,
    "completed",
  );

  if (hasTitleUpdate && !isValidTodoTitle(updates.title)) {
    return null;
  }

  if (hasCompletedUpdate && !isValidTodoCompletion(updates.completed)) {
    return null;
  }

  const nextTitle = hasTitleUpdate ? updates.title : current.title;
  const nextCompleted = hasCompletedUpdate
    ? updates.completed
    : current.completed;

  if (!isValidTodoTitle(nextTitle) || !isValidTodoCompletion(nextCompleted)) {
    return null;
  }

  const nextTodo = {
    title: nextTitle.trim(),
    completed: nextCompleted,
  };

  todoState[index] = nextTodo;
  persistTodoState();
  return todoState[index];
};

const deleteTodoItem = (index) => {
  if (typeof index !== "number" || index < 0 || index >= todoState.length) {
    return false;
  }

  todoState.splice(index, 1);
  persistTodoState();
  return true;
};

const todoAppContract = {
  TODO_STORAGE_KEY,
  isValidTodoTitle,
  isValidTodoCompletion,
  validateTodoInput,
  createTodo,
  normalizeTodo,
  readTodosFromStorage,
  writeTodosToStorage,
  persistTodoState,
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
