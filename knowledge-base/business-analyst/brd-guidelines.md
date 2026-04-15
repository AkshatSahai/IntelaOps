# Business Requirements Document (BRD) Guidelines

## Purpose and Audience

A Business Requirements Document (BRD) captures the business problem, the objectives of solving it, and what the solution must achieve — without prescribing how to build it. It is the contract between the business and the delivery team before solution design begins.

**Primary audience:** Executive sponsors, project steering committees, and solution architects who need to understand scope and objectives before approving investment.
**Secondary audience:** Business analysts and developers who use it as the source of truth for requirements traceability.

A BRD answers "why" and "what," not "how." If a BRD contains implementation details (database tables, API contracts, UI layouts), those belong in a Functional Requirements Document or Technical Design Document instead.

## Essential Sections

**1. Executive Summary** (half page maximum)
The problem statement, the proposed solution in one sentence, the estimated business impact, and the requested budget/timeline. Written for a reader who will read only this section.

**2. Business Objectives**
Measurable goals the solution must achieve. Tie each objective to a business metric: revenue, cost reduction, time-to-market, compliance. Example: "Reduce customer onboarding time from 14 days to 3 days, reducing acquisition cost by an estimated 20%."

**3. Scope**
In-scope: what the solution will address. Out-of-scope: what is explicitly excluded and why. A clear out-of-scope section prevents scope creep and sets stakeholder expectations. Use a table for clarity.

**4. Business Requirements**
Numbered, atomic requirements. Each requirement describes an observable business capability or constraint. Format: "The system must enable [role] to [action] so that [business outcome]." Number them (BR-001, BR-002) for traceability.

**5. Assumptions and Constraints**
Assumptions are things believed to be true but not confirmed — if they turn out to be false, the project is impacted. Constraints are non-negotiable boundaries (regulatory, budget, technology, timeline). Both must be documented and reviewed with sponsors.

**6. Stakeholders**
Who has a stake in the outcome. Include role, interest, level of influence, and required communication frequency. Use the RACI framework for decisions.

**7. Success Criteria**
How the project will be declared successful at go-live and 90 days post-launch. Must be measurable.

**8. Risks and Dependencies**
Business risks (not technical risks). Dependencies on other projects, teams, or third parties that could affect delivery.

## Traceability

Every business requirement should trace to: at least one functional requirement (in the FRD), at least one test case (in the test plan), and a specific deliverable in the project plan. Traceability matrices catch gaps in test coverage and ensure every requirement is eventually delivered.

Use a simple table: BRD Requirement ID → FRD Requirement ID → Test Case ID → Sprint/Release.

## Common BRD Failures

**Requirements as solutions:** "The system must use a REST API" is not a business requirement — it is a technical constraint. Rewrite: "The system must integrate with [third-party system] to enable [business capability]."

**Ambiguous language:** "The system should be user-friendly" cannot be tested or traced. Replace with measurable criteria.

**Missing out-of-scope:** Without explicit exclusions, stakeholders assume everything adjacent to the stated scope is included. Be explicit.

**No stakeholder sign-off:** A BRD without formal approval by the sponsor is not a contract — it is a suggestion. Get sign-off before requirements are handed to the solution team.

**Living document without versioning:** BRDs change. Each version must be dated, versioned, and compared against the previous version. Change log at the front of the document.

## BRD vs FRD vs User Stories

| Document | Level | Author | Answers |
|----------|-------|--------|---------|
| BRD | Business | BA / Sponsor | Why? What business problem? |
| FRD | Functional | BA | What must the system do? |
| User Story | Feature | PO | What does the user need? |

In agile contexts, a lightweight BRD (often called a Project Charter or Initiative Brief) replaces the full BRD. It captures the same essential elements in 2–3 pages rather than 20–30.
