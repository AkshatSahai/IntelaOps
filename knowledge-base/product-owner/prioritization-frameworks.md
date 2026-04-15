# Prioritization Frameworks

## Why Prioritization Is Hard

Prioritization is a zero-sum game: saying yes to one thing means saying no to another. Without a framework, decisions default to whoever argues loudest, most recently, or with most seniority. Frameworks make the trade-offs explicit and defensible.

## WSJF — Weighted Shortest Job First (SAFe)

Best for: large backlogs with items of varying size and value.

**Formula:** WSJF = Cost of Delay / Job Duration

**Cost of Delay** = User/Business Value + Time Criticality + Risk Reduction / Opportunity Enablement

Score each component 1–10, sum for Cost of Delay, divide by effort (also 1–10). Higher WSJF = do first.

**Practical tip:** Use relative scoring. Ask "is this worth more or less than item X?" rather than absolute values.

## MoSCoW

Best for: release scoping and stakeholder alignment.

| Category | Definition | Guidance |
|----------|-----------|---------|
| **Must Have** | Non-negotiable for the release | If removed, the product fails or is illegal |
| **Should Have** | Important but not vital | High value, would hurt to omit |
| **Could Have** | Nice to have | Include if time/budget allows |
| **Won't Have** | Explicitly excluded this release | Sets expectations, may appear in future |

**Watch out:** MoSCoW inflation — stakeholders want everything as Must Have. Challenge rigorously: "What happens if we ship without this?"

## Kano Model

Best for: understanding customer delight vs dissatisfaction.

| Category | Characteristic | Strategy |
|----------|---------------|---------|
| **Basic needs** | Expected; absence = dissatisfaction | Must deliver these |
| **Performance** | More = more satisfaction | Invest proportionally |
| **Delighters** | Unexpected; presence = delight | Differentiate here |
| **Indifferent** | Users don't care either way | Deprioritize |
| **Reverse** | Presence causes dissatisfaction | Avoid |

## Impact vs Effort Matrix

Best for: quick team alignment, not high-stakes decisions.

Plot items on a 2x2: Impact (Y axis) × Effort (X axis):
- **Quick wins** (high impact, low effort) — do first
- **Major projects** (high impact, high effort) — plan carefully
- **Fill-ins** (low impact, low effort) — do when capacity allows
- **Avoid** (low impact, high effort) — don't do

## OKR-Aligned Prioritization

Items directly contributing to an active Objective score higher. Score each backlog item: "Does this advance OKR X? By how much?" Items with no OKR connection are candidates for removal.

## Choosing the Right Framework

| Situation | Recommended Framework |
|-----------|----------------------|
| Large SAFe programme | WSJF |
| Release scope negotiation | MoSCoW |
| Product discovery | Kano |
| Sprint planning | Impact vs Effort |
| Quarterly planning | OKR alignment |
