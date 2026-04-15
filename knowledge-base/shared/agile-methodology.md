# Agile Methodology Fundamentals

## The Agile Manifesto

Four values (left side is valued more than right):
1. **Individuals and interactions** over processes and tools
2. **Working software** over comprehensive documentation
3. **Customer collaboration** over contract negotiation
4. **Responding to change** over following a plan

Twelve principles guide application of these values. The most important for product and BA work:
- Deliver working software frequently (weeks, not months)
- Business people and developers work together daily
- Welcome changing requirements, even late in development
- Simplicity — the art of maximising work not done — is essential

## Scrum Framework

### Roles
- **Product Owner**: owns the backlog, sets priorities, represents stakeholder interests
- **Scrum Master**: removes impediments, coaches the team on Scrum
- **Development Team**: self-organising, cross-functional, builds the product

### Events
| Event | Purpose | Timebox (2-week sprint) |
|-------|---------|------------------------|
| Sprint Planning | Select backlog items and create sprint plan | 4 hours |
| Daily Scrum | Synchronise and identify impediments | 15 minutes |
| Sprint Review | Demo to stakeholders, inspect increment | 2 hours |
| Sprint Retrospective | Improve team process | 1.5 hours |
| Backlog Refinement | Elaborate and estimate backlog items | ~1 day ongoing |

### Artefacts
- **Product Backlog**: ordered list of all desired work
- **Sprint Backlog**: selected items for the sprint + plan to deliver them
- **Product Increment**: the sum of all completed work, potentially shippable

## Kanban

Kanban is a continuous flow system (vs Scrum's sprint-based iterations).

Key practices:
- Visualise the workflow (Kanban board)
- Limit work in progress (WIP limits per column)
- Manage flow (measure cycle time, identify bottlenecks)
- Make policies explicit (definition of ready, definition of done per stage)
- Improve collaboratively

Kanban suits teams with unpredictable, incoming work (support, maintenance, ops).

## Scaled Agile (SAFe, LeSS)

For programmes with multiple teams:

**SAFe Programme Increment (PI)** planning: all teams align on a 10-week plan, identifying dependencies and risks across teams.

**Key constructs:**
- **Epic**: large initiative spanning multiple teams/PIs
- **Feature**: unit of value deliverable within one PI by one ART
- **Story**: unit of work for one team in one sprint

BAs in SAFe typically operate at the feature/epic level, translating business needs into features for Product Managers, who then own the team-level backlog with Product Owners.

## Agile vs Waterfall Trade-offs

| Dimension | Agile | Waterfall |
|-----------|-------|-----------|
| Requirements | Emergent, evolving | Defined upfront |
| Risk | Managed through iteration | Managed through planning |
| Feedback | Frequent (each sprint) | Late (at delivery) |
| Change | Welcomed | Costly and formal |
| Documentation | Enough, not exhaustive | Comprehensive |
| Best for | Complex, uncertain domains | Stable, well-understood domains |

Avoid false dichotomies — many organisations use hybrid approaches, with formal documentation at programme level and agile execution at team level.
