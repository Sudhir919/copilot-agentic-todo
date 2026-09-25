const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

function loadApp({
  storage = {},
  readThrows = false,
  writeThrows = false,
} = {}) {
  const localStorage = {
    getItem(key) {
      if (readThrows) {
        throw new Error("read failure");
      }

      return Object.prototype.hasOwnProperty.call(storage, key)
        ? storage[key]
        : null;
    },
    setItem(key, value) {
      if (writeThrows) {
        throw new Error("write failure");
      }

      storage[key] = String(value);
    },
    removeItem(key) {
      delete storage[key];
    },
  };

  const document = {
    readyState: "complete",
    querySelector() {
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

  return { app: context.todoAppContract, storage };
}

const normalizeComparable = (value) => JSON.parse(JSON.stringify(value));

test("validateTodoInput accepts valid todo data and rejects invalid titles", () => {
  const { app } = loadApp();

  assert.deepEqual(
    normalizeComparable(app.validateTodoInput("Read the docs", true)),
    {
      title: "Read the docs",
      completed: true,
    },
  );
  assert.equal(app.validateTodoInput("", false), null);
  assert.equal(app.validateTodoInput("   ", true), null);
  assert.equal(app.validateTodoInput("Valid", "yes"), null);
});

test("createTodo creates valid todo objects and rejects invalid input", () => {
  const { app } = loadApp();

  assert.deepEqual(
    normalizeComparable(app.createTodo("Submit report", false)),
    {
      title: "Submit report",
      completed: false,
    },
  );
  assert.equal(app.createTodo("", false), null);
  assert.equal(app.createTodo("Clean desk", "done"), null);
});

test("createTodoItem and getTodos manage the in-memory todo list", () => {
  const { app } = loadApp();

  const first = app.createTodoItem("Write tests", false);
  const second = app.createTodoItem("Ship feature", true);

  assert.deepEqual(normalizeComparable(first), {
    title: "Write tests",
    completed: false,
  });
  assert.deepEqual(normalizeComparable(second), {
    title: "Ship feature",
    completed: true,
  });
  assert.deepEqual(normalizeComparable(app.getTodos()), [
    { title: "Write tests", completed: false },
    { title: "Ship feature", completed: true },
  ]);
});

test("updateTodoItem updates valid titles and completion states but rejects invalid changes", () => {
  const { app } = loadApp({
    storage: {
      "todo-items": JSON.stringify([
        { title: "Draft article", completed: false },
      ]),
    },
  });

  assert.deepEqual(
    normalizeComparable(
      app.updateTodoItem(0, { title: "Draft final", completed: true }),
    ),
    {
      title: "Draft final",
      completed: true,
    },
  );
  assert.equal(app.updateTodoItem(0, { title: "", completed: false }), null);
  assert.equal(
    app.updateTodoItem(0, { title: "Still valid", completed: "yes" }),
    null,
  );
  assert.deepEqual(normalizeComparable(app.getTodos()), [
    { title: "Draft final", completed: true },
  ]);
});

test("deleteTodoItem removes items and returns false for invalid indexes", () => {
  const { app } = loadApp({
    storage: {
      "todo-items": JSON.stringify([
        { title: "Delete me", completed: false },
        { title: "Keep me", completed: true },
      ]),
    },
  });

  assert.equal(app.deleteTodoItem(0), true);
  assert.deepEqual(normalizeComparable(app.getTodos()), [
    { title: "Keep me", completed: true },
  ]);
  assert.equal(app.deleteTodoItem(99), false);
  assert.equal(app.deleteTodoItem(-1), false);
});

test("readTodosFromStorage and writeTodosToStorage handle valid persisted data and malformed storage", () => {
  const { app, storage } = loadApp();

  const written = app.writeTodosToStorage([
    { title: "Persist first", completed: false },
    { title: "Persist second", completed: true },
    { title: "", completed: true },
  ]);

  assert.deepEqual(normalizeComparable(written), [
    { title: "Persist first", completed: false },
    { title: "Persist second", completed: true },
  ]);
  assert.equal(
    storage["todo-items"],
    JSON.stringify(normalizeComparable(written)),
  );
  assert.deepEqual(
    normalizeComparable(app.readTodosFromStorage()),
    normalizeComparable(written),
  );

  storage["todo-items"] = "{bad-json";
  assert.deepEqual(normalizeComparable(app.readTodosFromStorage()), []);

  storage["todo-items"] = JSON.stringify({ title: "wrong-shape" });
  assert.deepEqual(normalizeComparable(app.readTodosFromStorage()), []);
});

test("storage read and write failures are handled gracefully without throwing", () => {
  const readFailure = loadApp({ readThrows: true });
  assert.deepEqual(
    normalizeComparable(readFailure.app.readTodosFromStorage()),
    [],
  );

  const writeFailure = loadApp({ writeThrows: true });
  const created = writeFailure.app.createTodoItem("Stored when failing", false);

  assert.deepEqual(normalizeComparable(created), {
    title: "Stored when failing",
    completed: false,
  });
  assert.deepEqual(normalizeComparable(writeFailure.app.getTodos()), [
    { title: "Stored when failing", completed: false },
  ]);
});
