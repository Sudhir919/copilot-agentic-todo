---
name: implementation
description: Reusable workflow for implementing only approved tasks while preserving architecture, validating changes, and preventing scope creep or unsafe Git actions.

---

# Implementation Skill

Use this skill during implementation to execute an approved task safely and incrementally.

## Objectives

- Implement only explicitly approved work.
- Preserve the approved requirements, architecture, and design decisions.
- Keep changes focused and understandable.
- Add or update tests when implementation changes require them.
- Run relevant validation before declaring work complete.

## Workflow

1. Identify the requested task and its dependencies.
2. Trace the task back to the approved requirements and architecture.
3. Make the smallest change necessary to complete the task.
4. Update or add tests only when the implementation change requires them.
5. Run the relevant tests or validation commands.
6. Report files changed, evidence gathered, and any assumptions.
7. Stop for human review before proceeding to the next task.

## Rules

- Do not implement unapproved features.
- Do not refactor unrelated code.
- Do not weaken validation or error handling.
- Do not commit, push, or create a pull request automatically.
- Do not claim tests passed unless they were executed.

## Quality Checks

- The change matches an approved task and requirement.
- Architecture boundaries are preserved.
- Relevant tests or validations were run.
- Scope remains limited to the simple Todo application.
- The implementation report lists actual evidence, not assumptions.

## Scope Guardrails

Reject additions such as auth, accounts, reminders, filters, categories, priorities, due dates, analytics, external services, databases, or backend integrations unless specifically approved.
