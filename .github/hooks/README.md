# PR Validation Hook

## Hook name

PR Validation Hook

## Event

`agentStop`

## Purpose

This hook acts as a PR readiness validation gate for the final PR preparation phase. It checks required SDLC artifacts without modifying files or performing any git or PR actions.

## Required artifacts

- `pr.md`
- `implementation.md`
- `verification-report.md`
- `code-review.md`
- `CHANGELOG.md`

## Behavior

- If `pr.md` does not exist, the hook returns `{"decision":"allow"}` so earlier SDLC phases are not blocked.
- If `pr.md` exists and all required artifacts exist and are non-empty, the hook returns `{"decision":"allow"}`.
- If `pr.md` exists and one or more required artifacts are missing or empty, the hook returns `{"decision":"block","reason":"PR readiness validation failed. Required SDLC artifacts are missing or empty."}`.

## Safety constraints

- The hook is read-only.
- It does not modify repository files.
- It does not create, update, or merge a pull request.
- It does not push code.

## Compatibility note

Hook support here is intended for GitHub Copilot CLI and Copilot cloud agent according to the current GitHub Copilot hooks documentation.
