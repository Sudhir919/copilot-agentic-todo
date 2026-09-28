# Repository Instructions

## Project purpose

This repository demonstrates an AI-assisted SDLC workflow around a simple single-user browser todo application.

## Approved Todo application scope

- Keep the product limited to basic todo CRUD: create, view, update, delete.
- Support a required todo title and a completion status.
- Keep the app single-user and browser-based.
- Do not add authentication, backend services, cloud sync, filtering, categories, priorities, due dates, tags, or other advanced features unless requirements explicitly change.

## Existing architecture and data model

- The application is intentionally small and client-side only: `index.html` provides the UI, `app.js` contains validation, CRUD, rendering, and persistence logic, and `styles.css` contains presentation.
- Todo items use a minimal data model: `{ title: string, completed: boolean }`.
- Persistence uses browser `localStorage` with the storage key `todo-items`; the app loads on startup and writes after every state change.

## Validation

- Use repository evidence before making claims about requirements, architecture, behavior, or test status.
- Prefer the approved artifacts and existing source files as the source of truth.
- Test command: `node --test tests/todo.unit.test.js tests/todo.integration.test.js`

## SDLC workflow

- Follow the existing 8-phase SDLC flow represented by the root artifacts: requirements, architecture, design review, implementation plan, implementation, code review, verification, and PR preparation.
- The functional Copilot configuration lives under `.github/agents/`, `.github/skills/`, `.github/prompts/`, and `.github/hooks/`.
- Do not recreate duplicate root-level configuration folders for Agents, Skills, Prompts, Instructions, or Hooks.

## Change guardrails

- Preserve existing application functionality unless a task explicitly requires a behavior change.
- Avoid unnecessary features, refactors, dependencies, or infrastructure.
- Keep the Todo application simple and aligned with the approved scope.
