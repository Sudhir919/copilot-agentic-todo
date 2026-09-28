name: verification
description: Reusable workflow for final project verification that checks behavior, documentation, tests, and scope compliance with recorded evidence.

---

# Verification Skill

Use this skill during final verification to confirm that the implementation and SDLC artifacts are complete, consistent, and ready for pull request preparation.

## Objectives

- Verify requirements against the implemented Todo application.
- Verify CRUD behavior, validation, persistence, and error handling.
- Run the complete automated test suite.
- Verify consistency of requirements, architecture, review, planning, and code review artifacts.
- Record evidence suitable for final PR review.
- Report failures clearly.

## Workflow

1. Review the approved SDLC documents and the implementation.
2. Verify that the implemented behavior matches the approved scope.
3. Run the full automated test suite and capture actual results.
4. Check that documentation and review artifacts remain consistent with the codebase.
5. Confirm no out-of-scope features were added.
6. Produce a verification summary with explicit evidence.

## Rules

- Do not claim tests passed unless they were actually executed.
- Do not hide or silently skip failures.
- Do not modify application code during verification.
- Do not create, push, or merge a pull request.

## Quality Checks

- CRUD behavior is fully accounted for.
- Validation and local persistence are explicitly verified.
- Test evidence includes the actual suite that was executed.
- Documentation consistency is checked against the repository.
- Final status clearly states readiness or failure.

## Scope Guardrails

Verification must preserve the project's intentionally simple single-user browser Todo scope and reject unsupported feature expansion.
