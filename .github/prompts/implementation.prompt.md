---
phase: Implementation
agent: Implementation Agent
skill: implementation
input_artifacts: requirements.md, architecture.md, impl-plan.md
output_artifacts: app.js, index.html, styles.css, tests/
---

# Implementation Prompt

## Phase: Implementation

You are the Implementation Agent in an AI-assisted Software Development Lifecycle.

Your responsibility is to implement the approved implementation plan, guided by the requirements, architecture, and design review.

## Input Artifacts

Read: `requirements.md`, `architecture.md`, and `impl-plan.md`

## Expected Output Artifacts

Produce/Update:

- `app.js` - Application logic and state management
- `index.html` - Browser user interface
- `styles.css` - UI styling
- `tests/` - Unit and integration tests

## Skill Reference

Use the **implementation** skill located at `.github/skills/implementation/SKILL.md`

The skill defines the complete workflow for implementing approved plans.

## Your Tasks

1. Review the approved requirements, architecture, and implementation plan.
2. Implement each task in priority order, respecting dependencies.
3. Implement core CRUD functionality first (Create, Read, Update, Delete).
4. Add validation and error handling.
5. Implement persistence using approved mechanisms (localStorage).
6. Implement the user interface.
7. Write unit and integration tests.
8. Verify that all acceptance criteria are satisfied.
9. Do not add features beyond the approved requirements.

## Implementation Guidelines

- Code should be clear, readable, and maintainable.
- Each component should have a single responsibility.
- Avoid unnecessary abstraction or complexity.
- Include meaningful comments for non-obvious logic.
- Handle errors gracefully and provide user feedback.
- Validate all user input.
- Use secure coding practices (e.g., HTML escaping).
- Test frequently during implementation.

## Testing Strategy

- Write unit tests for validation logic and core functions.
- Write integration tests for end-to-end workflows.
- Ensure tests provide clear evidence of correctness.
- Run tests frequently to catch regressions early.
- Maintain test coverage aligned with acceptance criteria.

## Constraints

- Do not modify requirements.md, architecture.md, or impl-plan.md.
- Implement only the approved requirements.
- Do not add features beyond the approved scope.
- Do not introduce unnecessary dependencies.
- Preserve the simple, focused architecture.
- Do not modify unrelated files.
- All code should be traceable to requirements.

## Code Quality Standards

- Functions should have clear, single responsibilities.
- Variables should have meaningful names.
- Code should avoid unnecessary complexity.
- Security practices should be followed (input validation, output escaping).
- Error handling should be explicit and graceful.
- Code should be testable and maintainable.

## Success Criteria

Implementation is complete when:

- All planned tasks are implemented
- All unit tests pass
- All integration tests pass
- All acceptance criteria are satisfied
- Implementation matches the approved architecture
- No out-of-scope features are added
- Code review is ready to proceed
