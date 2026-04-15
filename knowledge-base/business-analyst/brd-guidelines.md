# Business Requirements Document (BRD) Guidelines

## What a BRD Is

A BRD is a formal document that captures what a business needs — not how a system will deliver it. It describes the business problem, the solution scope, and the requirements that a solution must satisfy.

It is distinct from a Functional Specification (which describes system behaviour) and a Technical Specification (which describes how to build it).

## When to Write a BRD

Write a BRD when:
- The initiative is large, cross-functional, or high-stakes
- Multiple vendors or systems are involved and formal sign-off is required
- Regulatory or compliance requirements must be documented
- The project will go through a formal approval or governance process

A BRD may be overkill for a small feature change within an existing product. Use your judgement about formality vs agility.

## Standard BRD Structure

### 1. Executive Summary
- Business problem or opportunity (2–3 sentences)
- Proposed solution direction (high level)
- Key stakeholders and sponsor

### 2. Business Context
- Background: why is this being done now?
- Current state: how does the business operate today?
- Pain points: what is failing, costly, or missing?
- Business objectives: what does success look like?

### 3. Scope
- **In scope**: features, processes, and systems included
- **Out of scope**: explicitly excluded items (prevents scope creep)
- **Assumptions**: what you're treating as true without confirmation
- **Constraints**: limitations the solution must work within (budget, timeline, technology)

### 4. Stakeholder Analysis
- Who are the stakeholders?
- What is their interest and influence?
- What do they need from this project?
- (See stakeholder-analysis-frameworks.md)

### 5. Business Requirements
Numbered, unambiguous requirement statements:

```
BR-001: The system shall allow authorised finance users to export transaction data
        in CSV format for any date range within the last 24 months.
BR-002: ...
```

Each requirement should be:
- Atomic (one requirement per statement)
- Measurable or verifiable
- Free of solution assumptions

### 6. Functional Overview (High Level)
- Key use cases or process flows (narrative, not detailed specs)
- Integration touchpoints with other systems

### 7. Non-Functional Requirements
- Performance (response time, throughput)
- Security (authentication, authorisation, data protection)
- Compliance (regulatory standards that apply)
- Availability and disaster recovery

### 8. Success Metrics
How will the business measure whether the project achieved its objectives?
- KPIs before and after
- Acceptance thresholds

### 9. Risks and Issues
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|

### 10. Sign-Off
Stakeholder approval table with names, roles, and dates.

## Writing Quality Requirements

Good requirements are:
- **Complete**: covers all conditions and scenarios needed
- **Consistent**: no contradictions with other requirements
- **Unambiguous**: only one interpretation possible
- **Verifiable**: can be tested
- **Traceable**: linked to a business objective

Avoid: "user-friendly", "fast", "flexible", "appropriate" — replace with measurable alternatives.
