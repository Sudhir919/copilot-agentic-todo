name: pr-preparation
description: Reusable workflow for final pull request preparation, including readiness checks, evidence gathering, and safe handling of existing pull requests.

---

# PR Preparation Skill

Use this skill during the final PR phase to prepare or update a professional pull request without altering application code or merging changes.

## Objectives

- Perform final readiness checks across implementation, review, verification, and changelog artifacts.
- Confirm test evidence exists and is current.
- Check Git branch and working tree status.
- Determine whether an appropriate existing pull request already exists.
- Update an existing PR when appropriate instead of creating a duplicate.
- Prepare a complete PR description for reviewer use.

## Workflow

1. Read the final SDLC artifacts and changelog.
2. Confirm implementation, code review, and verification are complete.
3. Run or verify the required tests and record the evidence used.
4. Check branch name and Git status.
5. Determine whether a matching PR already exists for the branch or change set.
6. If a suitable PR exists, update it.
7. If no suitable PR exists, prepare and create one.
8. Confirm the PR operation succeeded before reporting success.

## Rules

- Never merge the PR automatically.
- Never create a duplicate PR when an appropriate existing PR already exists.
- Never claim a PR was created or updated unless the operation actually succeeded.
- Do not modify application source code as part of PR preparation.
- Do not hide failed tests.

## Required PR Sections

- Summary
- Changes Made
- Test Evidence
- Known Limitations
- Changelog
- Reviewer Checklist

## Quality Checks

- The PR description is consistent with the approved SDLC artifacts.
- Test evidence is concrete and current.
- Known limitations stay within the approved scope.
- Reviewer checklist covers requirements, architecture, design review, implementation plan, unit tests, integration tests, verification, code review, and scope compliance.
- Existing PR detection is completed before any create action.
