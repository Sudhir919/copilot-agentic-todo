---
name: design-review
description: Reusable workflow for reviewing architecture against approved requirements, identifying evidence-based risks, and keeping the design aligned with project scope.

---

# Design Review Skill

Use this skill during the design review phase to assess whether the proposed architecture is correct, simple, maintainable, and ready for implementation.

## Objectives

- Check requirements-to-architecture alignment.
- Review component responsibilities and interaction boundaries.
- Review CRUD, persistence, and reload data flow.
- Review the Todo data model for completeness and simplicity.
- Review security, maintainability, and testability within scope.
- Identify real risks, gaps, or unnecessary complexity.
- Determine whether architecture changes are justified.

## Workflow

1. Read the approved requirements and the proposed architecture together.
2. Compare the architecture against each relevant requirement.
3. Review components, data flow, persistence, and data model.
4. Evaluate testability and maintainability.
5. Consider only security concerns relevant to the approved scope.
6. Document findings with clear severity, evidence, and recommendations.
7. State explicitly when no change is required.

## Rules

- Do not implement application features.
- Do not silently change requirements.
- Do not invent findings to fill the report.
- Recommend changes only when evidence supports them.
- Keep the review within the approved product scope.

## Quality Checks

- Findings reference specific requirements or architectural decisions.
- Persistence behavior is reviewed.
- The design remains simple and free of unnecessary services.
- Recommendations are actionable.
- No scope-expanding features are introduced through review comments.
- Final status clearly states whether redesign or changes are needed.

## Scope Guardrails

Treat backend systems, auth, external integrations, advanced workflows, and multi-user behavior as out of scope unless already approved in the requirements.
