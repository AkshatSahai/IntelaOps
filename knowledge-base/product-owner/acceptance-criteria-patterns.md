# Acceptance Criteria Patterns

## Purpose

Acceptance criteria define the boundaries of a user story — what the system must do for the story to be considered done. They serve as the contract between the product owner, team, and stakeholders.

## Rule-Oriented Format

For business rules, the rule-oriented format works well:

```
- The system must [condition]
- Users with role [X] can [action]
- When [event], [outcome] must occur within [constraint]
```

## Scenario-Oriented Format (Given/When/Then)

Preferred for testable, behaviour-driven criteria:

```
Scenario: [descriptive name]
  Given [precondition]
  When [action]
  Then [outcome]
  And [additional outcome]
```

## Patterns by Story Type

### Authentication / Access
- Given a user is not logged in, when they visit a protected page, then they are redirected to login
- Given a user has role X, when they attempt action Y, then they see/cannot see Z

### Search / Filter
- Given results exist, when the user searches with term X, then only matching results appear
- Given no results match, when the user searches, then an empty state message is shown
- Given more than N results, then pagination/infinite scroll is activated

### Form Submission
- Given all required fields are complete, when the user submits, then [success state]
- Given a required field is empty, when the user submits, then an inline error appears on that field
- Given invalid data format, when the user submits, then a descriptive error message explains the correct format

### Data Display
- Given data exists, when the user views the list, then items are sorted by [criterion]
- Given data is loading, then a skeleton/loading state is shown
- Given an error occurs, then a user-friendly error message is displayed with a retry option

## What NOT to Include

- Implementation details ("the API will call endpoint X")
- Test procedures (those belong in test cases)
- Non-functional requirements unless they are acceptance thresholds (e.g., "page loads within 2 seconds")
- Every possible edge case — focus on the ones that matter for sign-off

## Definition of Done vs Acceptance Criteria

**Acceptance criteria** are story-specific: they define what this story achieves.
**Definition of Done** is team-wide: it defines the quality gates all stories must pass (code review, tests written, deployed to staging, etc.).

Both must be satisfied for a story to be complete.

## Verifiability Checklist

For each acceptance criterion, ask:
- Can a tester determine pass/fail without interpretation?
- Does it describe observable behaviour (not internal implementation)?
- Is it unambiguous? (Replace "fast", "easy", "appropriate" with measurable alternatives)
- Could two people read it and agree on what it means?
