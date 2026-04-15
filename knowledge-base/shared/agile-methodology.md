# Agile Methodology Fundamentals

## Core Agile Principles for Product Roles

The Agile Manifesto's four values are not abstractions — they are daily decision guides for product owners and business analysts:

1. **Individuals and interactions over processes and tools**: A 10-minute conversation with a developer beats a 5-page requirements document. Face time reduces misunderstanding.
2. **Working software over comprehensive documentation**: Shipping a working increment gets real feedback. Polished documentation without working software creates false confidence.
3. **Customer collaboration over contract negotiation**: Stakeholders are partners in shaping the product, not parties to a contract. Requirements will change — plan for collaboration, not compliance.
4. **Responding to change over following a plan**: The plan serves the goal; the goal doesn't serve the plan. When circumstances change, update the plan.

None of these values eliminates documentation, planning, or process. They establish what to prioritize when the two come into conflict.

## Sprint Ceremonies and the Role of PO/BA

**Sprint Planning** (first day of sprint, up to 2 hours per sprint week)
The product owner presents the top-priority stories and explains the sprint goal. The team asks clarifying questions, estimates stories that lack estimates, and commits to what can be completed. BA inputs: refined requirements, answered open questions, acceptance criteria finalized.

**Daily Standup** (15 minutes, every day)
Three questions: What did I do yesterday? What will I do today? What is blocking me? The PO attends as an observer and dependency resolver — not as a reporter. If blockers relate to requirements clarity, the PO should schedule immediate follow-up. Standups are not status meetings; they are synchronization events.

**Sprint Review / Demo** (last day of sprint, up to 1 hour per sprint week)
The team demonstrates working software to stakeholders. The product owner accepts or rejects stories against acceptance criteria. Stakeholders provide feedback that informs upcoming backlog items. This is the primary feedback loop — if stakeholders are not attending, the loop is broken.

**Sprint Retrospective** (after review, up to 45 minutes per sprint week)
The team reflects on the process: What went well? What didn't? What will we change? The PO and BA participate fully. Common topics: requirements clarity gaps, ceremony effectiveness, communication bottlenecks.

**Backlog Refinement** (mid-sprint, 5–10% of sprint capacity)
Product owner and BA collaborate with the team to detail upcoming stories, resolve open questions, and estimate new items. Stories should be sprint-ready two sprints ahead of when they will be worked.

## Definition of Ready

A story is ready for sprint planning when it meets all of these criteria:
- Written in user story format with clear business value
- INVEST criteria satisfied (independent, negotiable, valuable, estimable, small, testable)
- Acceptance criteria defined and reviewed with the team
- Dependencies identified and either resolved or accepted
- Design artifacts attached where applicable
- Team has estimated the story

Pulling not-ready stories into a sprint is the primary cause of mid-sprint confusion and sprint goal failure.

## Definition of Done

The Definition of Done (DoD) is the team-level checklist that all stories must satisfy to be accepted:
- Code reviewed and merged
- Unit and integration tests written and passing
- Deployed to staging environment
- Acceptance criteria verified (either by PO or automated test)
- No new lint errors or type errors introduced
- Documentation updated if applicable

The DoD is agreed upon by the team and product owner. It is not adjusted per-story. Stories that don't meet the DoD are not done — they return to the backlog.

## Velocity and Capacity Planning

**Velocity** is the average number of story points completed per sprint over the last 3–5 sprints. It is a planning tool, not a performance metric. Using velocity to compare teams or pressure individuals is an anti-pattern.

**Capacity planning:** Calculate actual available hours per person per sprint (accounting for ceremonies, PTO, and other commitments), then use historical velocity to estimate how many story points fit in the next sprint.

Do not plan to 100% capacity. Leave 15–20% buffer for unplanned work, refinement, and surprises. Teams that plan to 100% routinely fail to hit sprint goals.

## Agile Roles in Practice

**Product Owner** holds the product vision, owns the backlog, and is the primary voice of the customer to the development team. One PO per product — shared ownership creates conflicting priorities.

**Business Analyst** (in agile contexts) bridges the gap between business stakeholders and the development team. BAs support elicitation, requirements detailing, process mapping, and acceptance criteria definition. In smaller teams, the PO and BA roles may be combined.

**Scrum Master / Agile Coach** facilitates ceremonies, removes organizational impediments, and coaches the team on agile practices. The Scrum Master does not manage the team or the backlog.
