---
name: code-review
description: Reusable workflow for evidence-based review of implementation correctness, safety, test coverage, and scope compliance without silently changing application code.

---

# Code Review Skill

Use this skill during the code review phase to assess the implementation against the approved SDLC artifacts and repository evidence.

## Objectives

- Review implementation against approved requirements and architecture.
- Check correctness, security, validation, persistence, and error handling.
- Review test coverage and evidence.
- Check code clarity, duplication, and dependency safety.
- Separate confirmed issues from suggestions.
- Confirm scope compliance.

## Workflow

1. Review the approved requirements, architecture, design review, and implementation plan.
2. Inspect the application and test code that implements the approved behavior.
3. Check CRUD behavior, validation, persistence, reload behavior, and failure handling.
4. Review whether tests cover the important paths.
5. Document findings by severity with file-level evidence.
6. State explicitly when no issue is found in a review area.
7. Base readiness only on repository evidence and actual test results.

## Rules

- Do not silently modify application code.
- Do not modify tests during review.
- Do not invent findings.
- Do not declare tests passing without evidence.
- Keep recommendations aligned with the approved scope.

## Quality Checks

- Findings distinguish confirmed defects from suggestions.
- Security and error handling are reviewed within project scope.
- Test coverage gaps are called out clearly.
- Dependency and architecture simplicity are preserved.
- Review conclusions are supported by evidence.

## Scope Guardrails

Do not use review comments to introduce new product capabilities or architecture beyond the approved Todo application scope.
