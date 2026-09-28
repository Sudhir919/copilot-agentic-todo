name: architecture-design
description: Reusable workflow for deriving a simple high-level architecture from approved requirements while preserving the project's intentionally small scope.

---

# Architecture Design Skill

Use this skill during the architecture phase to translate approved requirements into a minimal, implementable, and testable design.

## Objectives

- Map approved requirements to the smallest set of necessary components.
- Define component responsibilities and boundaries.
- Describe CRUD and persistence data flow.
- Select only the technologies justified by the requirements.
- Document architectural decisions, constraints, and assumptions.
- Preserve simplicity and avoid unjustified infrastructure.

## Workflow

1. Treat the approved requirements as the source of truth.
2. Identify the minimum components needed to satisfy the requirements.
3. Define each component's responsibility and interactions.
4. Describe data flow for create, view, update, delete, save, and reload behavior.
5. Define the Todo data model using only approved fields.
6. Record technology choices and explain why they are sufficient.
7. Validate the design for simplicity, implementability, and testability.

## Rules

- Do not implement application code.
- Do not change approved requirements.
- Do not create implementation tasks.
- Prefer the simplest architecture that satisfies the requirements.
- Avoid backend, cloud, microservice, or infrastructure additions unless explicitly required.

## Quality Checks

- Every architectural element is traceable to one or more requirements.
- Component responsibilities are distinct and understandable.
- Persistence is addressed explicitly.
- The data model stays minimal.
- Technology choices are appropriate for a small single-user browser app.
- The architecture supports unit and integration testing.

## Scope Guardrails

Do not add authentication, remote storage, multi-user coordination, databases, APIs, queues, external integrations, or other infrastructure when browser-local behavior is sufficient.
