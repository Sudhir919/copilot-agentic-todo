name: requirements-analysis
description: Reusable workflow for turning a user story into clear, testable, scope-controlled requirements for a simple Todo application.

---

# Requirements Analysis Skill

Use this skill during the requirements phase to convert a user story into an approved requirements specification without designing or implementing the solution.

## Objectives

- Identify functional requirements from the user story.
- Separate functional requirements from non-functional requirements.
- Surface ambiguities, missing decisions, and conflicting expectations.
- Preserve approved human decisions and assumptions.
- Define explicit out-of-scope items.
- Produce testable acceptance criteria.
- Prevent scope expansion beyond the approved product intent.

## Workflow

1. Read the full user story before making assumptions.
2. Extract the user goal, core behaviors, constraints, and stated exclusions.
3. Identify any requirement gaps that could materially change behavior.
4. Ask all required clarification questions in one batch when clarification is necessary.
5. Record only approved assumptions or clearly justified inferences.
6. Organize the outcome into overview, scope, functional requirements, non-functional requirements, assumptions, out-of-scope items, and acceptance criteria.
7. Validate that each requirement is observable and testable.

## Rules

- Do not implement code.
- Do not design architecture.
- Do not create implementation tasks.
- Do not silently invent product decisions.
- Do not prescribe unnecessary technologies.
- Keep the Todo scope intentionally simple.

## Quality Checks

- Every requirement is traceable to the user story or an approved clarification.
- Functional requirements describe system behavior, not implementation details.
- Non-functional requirements are measurable or verifiable where practical.
- Acceptance criteria can be tested directly.
- Assumptions are clearly labeled.
- Out-of-scope items explicitly block feature creep.
- No advanced capabilities are introduced unless explicitly approved.

## Scope Guardrails

Reject or flag additions such as authentication, collaboration, reminders, filtering, categories, priorities, due dates, attachments, analytics, backend services, databases, cloud services, or external integrations unless the approved story requires them.
