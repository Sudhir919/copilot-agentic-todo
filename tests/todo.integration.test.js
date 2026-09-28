const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

const normalizeComparable = (value) => JSON.parse(JSON.stringify(value));

function buildBrowserEnvironment({ storage = {} } = {}) {
  const todoList = {
    innerHTML: "",
    dataset: {},
    querySelectorAll() {
      return [];
    },
  };

  const formMessage = {
    textContent: "",
    classList: {
      toggle() {},
    },
  };

  const titleInput = { value: "" };
  const completedInput = { checked: false };

  const localStorage = {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(storage, key)
        ? storage[key]
        : null;
    },
    setItem(key, value) {
      storage[key] = String(value);
    },
    removeItem(key) {
      delete storage[key];
    },
  };

  const document = {
    readyState: "complete",
    querySelector(selector) {
      if (selector === "#todo-list") {
        return todoList;
      }

      if (selector === "#todo-form-message") {
        return formMessage;
      }

      if (selector === "#todo-title-input") {
        return titleInput;
      }

      if (selector === "#todo-completed-input") {
        return completedInput;
      }

      return null;
    },
    addEventListener() {},
  };

  const context = {
    console,
    document,
    localStorage,
    globalThis: null,
    window: null,
  };

  context.globalThis = context;
  context.window = context;

  vm.createContext(context);
  vm.runInContext(appSource, context);

  return {
    app: context.todoAppContract,
    storage,
    document,
    formMessage,
    titleInput,
    completedInput,
    todoList,
  };
}

test("browser create flow renders incomplete and complete todos and persists them", () => {
  const env = buildBrowserEnvironment();

  env.titleInput.value = "Review design";
  env.completedInput.checked = false;
  env.app.handleCreateTodoSubmit({ preventDefault() {} });

  assert.equal(env.formMessage.textContent, "Todo added.");
  assert.ok(env.todoList.innerHTML.includes("Review design"));
  assert.ok(!env.todoList.innerHTML.includes("is-complete"));

  env.titleInput.value = "Ship release";
  env.completedInput.checked = true;
  env.app.handleCreateTodoSubmit({ preventDefault() {} });

  assert.ok(env.todoList.innerHTML.includes("Ship release"));
  assert.ok(env.todoList.innerHTML.includes("is-complete"));
  assert.deepEqual(normalizeComparable(env.app.getTodos()), [
    { title: "Review design", completed: false },
    { title: "Ship release", completed: true },
  ]);
  assert.equal(
    env.storage["todo-items"],
    JSON.stringify([
      { title: "Review design", completed: false },
      { title: "Ship release", completed: true },
    ]),
  );
});

test("browser update flow reflects valid changes and rejects invalid titles", () => {
  const env = buildBrowserEnvironment({
    storage: {
      "todo-items": JSON.stringify([
        { title: "Write summary", completed: false },
      ]),
    },
  });

  const validForm = {
    dataset: { index: "0" },
    closest(selector) {
      return selector === ".todo-update-form" ? this : null;
    },
    querySelector(selector) {
      if (selector === ".todo-update-title") {
        return { value: "Write final summary" };
      }

      if (selector === ".todo-update-status") {
        return { checked: true };
      }

      if (selector === ".todo-update-message") {
        return {
          textContent: "",
          classList: {
            toggle() {},
          },
        };
      }

      return null;
    },
  };

  env.app.handleTodoUpdateSubmit({
    target: validForm,
    preventDefault() {},
  });

  assert.ok(env.todoList.innerHTML.includes("Write final summary"));
  assert.ok(env.todoList.innerHTML.includes("is-complete"));
  assert.deepEqual(normalizeComparable(env.app.getTodos()), [
    { title: "Write final summary", completed: true },
  ]);

  const invalidForm = {
    dataset: { index: "0" },
    closest(selector) {
      return selector === ".todo-update-form" ? this : null;
    },
    querySelector(selector) {
      if (selector === ".todo-update-title") {
        return { value: "   " };
      }

      if (selector === ".todo-update-status") {
        return { checked: true };
      }

      if (selector === ".todo-update-message") {
        return {
          textContent: "",
          classList: {
            toggle() {},
          },
        };
      }

      return null;
    },
  };

  env.app.handleTodoUpdateSubmit({
    target: invalidForm,
    preventDefault() {},
  });

  assert.equal(env.app.getTodos()[0].title, "Write final summary");
  assert.deepEqual(normalizeComparable(env.app.getTodos()), [
    { title: "Write final summary", completed: true },
  ]);
});

test("browser delete flow removes items and reload uses persisted state", () => {
  const env = buildBrowserEnvironment({
    storage: {
      "todo-items": JSON.stringify([
        { title: "Fix dashboard", completed: false },
      ]),
    },
  });

  const deleteButton = {
    dataset: { index: "0" },
    closest(selector) {
      return selector === ".todo-delete-button" ? this : null;
    },
  };

  env.app.handleTodoDeleteClick({
    target: deleteButton,
    preventDefault() {},
  });

  assert.deepEqual(normalizeComparable(env.app.getTodos()), []);
  assert.equal(env.storage["todo-items"], JSON.stringify([]));
  assert.ok(env.todoList.innerHTML.includes("No todos yet."));

  const reloadedEnv = buildBrowserEnvironment({
    storage: {
      "todo-items": JSON.stringify([
        { title: "Fix dashboard", completed: false },
      ]),
    },
  });

  reloadedEnv.app.renderTodoList(reloadedEnv.todoList);
  assert.ok(reloadedEnv.todoList.innerHTML.includes("Fix dashboard"));
  assert.deepEqual(normalizeComparable(reloadedEnv.app.getTodos()), [
    { title: "Fix dashboard", completed: false },
  ]);
});
