const TODO_STORAGE_KEY = "todo-items";
let lastStorageError = null;

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
  try {
    const rawTodos = localStorage.getItem(TODO_STORAGE_KEY);

    if (!rawTodos) {
      lastStorageError = null;
      return [];
    }

    const parsedTodos = JSON.parse(rawTodos);

    if (!Array.isArray(parsedTodos)) {
      lastStorageError = null;
      return [];
    }

    const normalizedTodos = parsedTodos
      .map(normalizeTodo)
      .filter((todo) => todo !== null && todo.title !== "");

    lastStorageError = null;
    return normalizedTodos;
  } catch (error) {
    lastStorageError = "Could not load saved todos.";
    console.error(error);
    return [];
  }
};

const writeTodosToStorage = (todos) => {
  const safeTodos = Array.isArray(todos)
    ? todos.map(normalizeTodo).filter((todo) => todo !== null)
    : [];

  try {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(safeTodos));
    lastStorageError = null;
    return safeTodos;
  } catch (error) {
    lastStorageError = "Could not save todos. Your changes may not be saved.";
    console.error(error);
    return safeTodos;
  }
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

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const renderTodoList = (container = null) => {
  const target =
    container ||
    (typeof document !== "undefined"
      ? document.querySelector("#todo-list")
      : null);

  if (!target) {
    return [];
  }

  const todos = getTodos();

  if (todos.length === 0) {
    target.innerHTML = '<p class="todo-empty">No todos yet.</p>';
    return todos;
  }

  target.innerHTML = `
    <ul class="todo-list">
      ${todos
        .map(
          ({ title, completed }, index) => `
            <li class="todo-item ${completed ? "is-complete" : ""}">
              <form class="todo-update-form" data-index="${index}" novalidate>
                <div class="todo-update-row">
                  <input
                    class="todo-update-title"
                    type="text"
                    value="${escapeHtml(title)}"
                    aria-label="Update todo title"
                  />
                  <label class="todo-update-checkbox">
                    <input
                      class="todo-update-status"
                      type="checkbox"
                      ${completed ? "checked" : ""}
                    />
                    <span>Completed</span>
                  </label>
                  <button type="submit">Save</button>
                  <button
                    type="button"
                    class="todo-delete-button"
                    data-index="${index}"
                    aria-label="Delete todo"
                  >
                    Delete
                  </button>
                </div>
                <p class="todo-update-message" aria-live="polite"></p>
              </form>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;

  if (typeof target.querySelectorAll === "function") {
    target.querySelectorAll(".todo-update-form").forEach((form) => {
      if (
        !form.dataset.todoUpdateBound &&
        typeof form.addEventListener === "function"
      ) {
        form.addEventListener("submit", handleTodoUpdateSubmit);
        form.dataset.todoUpdateBound = "true";
      }
    });

    target.querySelectorAll(".todo-delete-button").forEach((button) => {
      if (
        !button.dataset.todoDeleteBound &&
        typeof button.addEventListener === "function"
      ) {
        button.addEventListener("click", handleTodoDeleteClick);
        button.dataset.todoDeleteBound = "true";
      }
    });
  }

  return todos;
};

const handleTodoDeleteClick = (event) => {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  if (typeof document === "undefined") {
    return null;
  }

  lastStorageError = null;

  const button =
    event && event.target && typeof event.target.closest === "function"
      ? event.target.closest(".todo-delete-button")
      : null;

  if (!button) {
    return null;
  }

  const index = Number(button.dataset.index);
  const deleted = deleteTodoItem(index);

  if (!deleted) {
    return null;
  }

  if (lastStorageError) {
    showStorageErrorMessage();
    renderTodoList();
    return deleted;
  }

  renderTodoList();
  return deleted;
};

const handleTodoUpdateSubmit = (event) => {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  if (typeof document === "undefined") {
    return null;
  }

  lastStorageError = null;

  const form =
    event && event.target && typeof event.target.closest === "function"
      ? event.target.closest(".todo-update-form")
      : null;

  if (!form) {
    return null;
  }

  const index = Number(form.dataset.index);
  const titleInput = form.querySelector(".todo-update-title");
  const completedInput = form.querySelector(".todo-update-status");
  const messageElement = form.querySelector(".todo-update-message");

  if (!titleInput || Number.isNaN(index)) {
    return null;
  }

  const updatedTodo = updateTodoItem(index, {
    title: titleInput.value,
    completed: completedInput ? completedInput.checked : false,
  });

  if (!updatedTodo) {
    if (messageElement) {
      messageElement.textContent = "Please enter a valid todo title.";
      messageElement.classList.toggle("is-error", true);
    }
    return null;
  }

  if (lastStorageError) {
    if (messageElement) {
      showStorageErrorMessage(messageElement);
    }
    renderTodoList();
    return updatedTodo;
  }

  if (messageElement) {
    messageElement.textContent = "Todo updated.";
    messageElement.classList.toggle("is-error", false);
  }

  renderTodoList();
  return updatedTodo;
};

const showTodoFormMessage = (message, isError = false) => {
  if (typeof document === "undefined") {
    return null;
  }

  const messageElement = document.querySelector("#todo-form-message");

  if (!messageElement) {
    return null;
  }

  messageElement.textContent = message;
  messageElement.classList.toggle("is-error", isError);
  return messageElement;
};

const showStorageErrorMessage = (messageElement = null) => {
  const message = lastStorageError || "Could not save todos.";

  if (messageElement) {
    messageElement.textContent = message;
    messageElement.classList.toggle("is-error", true);
    return messageElement;
  }

  return showTodoFormMessage(message, true);
};

const handleCreateTodoSubmit = (event) => {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  if (typeof document === "undefined") {
    return null;
  }

  lastStorageError = null;

  const titleInput = document.querySelector("#todo-title-input");
  const completedInput = document.querySelector("#todo-completed-input");

  if (!titleInput) {
    return null;
  }

  const title = titleInput.value;
  const completed = completedInput ? completedInput.checked : false;
  const createdTodo = createTodoItem(title, completed);

  if (!createdTodo) {
    showTodoFormMessage("Please enter a valid todo title.", true);
    return null;
  }

  if (lastStorageError) {
    titleInput.value = "";
    if (completedInput) {
      completedInput.checked = false;
    }

    showStorageErrorMessage();
    renderTodoList();
    return createdTodo;
  }

  titleInput.value = "";
  if (completedInput) {
    completedInput.checked = false;
  }

  showTodoFormMessage("Todo added.", false);
  renderTodoList();
  return createdTodo;
};

const initializeTodoAppUI = () => {
  if (typeof document === "undefined") {
    return null;
  }

  const listContainer = document.querySelector("#todo-list");
  const todoForm = document.querySelector("#todo-form");

  if (!listContainer) {
    return null;
  }

  renderTodoList(listContainer);

  if (
    todoForm &&
    !todoForm.dataset.todoCreateBound &&
    typeof todoForm.addEventListener === "function"
  ) {
    todoForm.addEventListener("submit", handleCreateTodoSubmit);
    todoForm.dataset.todoCreateBound = "true";
  }

  return listContainer;
};

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
  escapeHtml,
  renderTodoList,
  handleTodoDeleteClick,
  handleTodoUpdateSubmit,
  showTodoFormMessage,
  showStorageErrorMessage,
  handleCreateTodoSubmit,
  initializeTodoAppUI,
  updateTodoItem,
  deleteTodoItem,
};

if (typeof globalThis !== "undefined") {
  globalThis.todoAppContract = todoAppContract;
}

if (typeof window !== "undefined") {
  window.todoAppContract = todoAppContract;
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTodoAppUI);
  } else {
    initializeTodoAppUI();
  }
}

console.log("Todo in-memory state and CRUD behavior defined.");
