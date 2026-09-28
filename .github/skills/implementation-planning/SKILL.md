name: implementation-planning
description: Reusable workflow for turning approved requirements, architecture, and design review outcomes into dependency-ordered implementation tasks with clear testing expectations.

---

# Implementation Planning Skill

Use this skill during the planning phase to prepare a practical implementation sequence without writing application code.

## Objectives

- Break approved work into small actionable tasks.
- Order tasks by dependency.
- Assign priorities and identify blockers.
- Include testing strategy and definition of done.
- Keep the plan aligned with the approved scope.

## Workflow

1. Use requirements, architecture, and design review as the only planning inputs.
2. Enumerate the implementation work required for the approved behavior.
3. Split the work into dependency-ordered tasks.
4. Mark prerequisites, follow-on tasks, and blocked work clearly.
5. Include unit, integration, and final verification coverage.
6. Define completion criteria for the implementation phase.
7. Validate that no task introduces unapproved functionality.

## Rules

- Do not write application code.
- Do not redesign the architecture during planning.
- Do not add optional work that is unsupported by the approved scope.
- Keep tasks concrete enough for incremental execution.

## Quality Checks

- Every approved requirement is covered by one or more tasks.
- Dependencies are explicit and realistic.
- Testing work is represented, not implied.
- Blocked tasks are identified honestly.
- The definition of done includes implementation, tests, verification, and scope compliance.

## Scope Guardrails

Avoid planning work for advanced product features, infrastructure, or integrations that do not exist in the approved requirements and architecture.
