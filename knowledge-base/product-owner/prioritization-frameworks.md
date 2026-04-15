# Prioritization Frameworks

## Why Prioritization Frameworks Matter

Without a framework, backlog prioritization defaults to whoever speaks loudest (HiPPO effect), most recently requested (recency bias), or easiest to build (effort bias). Prioritization frameworks bring structure, transparency, and defensibility to ordering decisions. They also create a shared language for conversations with stakeholders about trade-offs.

No framework is perfect. The goal is consistency and explicitness — not false precision.

## RICE Scoring

RICE combines four factors into a numeric score. Use it when you have quantitative data about reach and impact.

**Formula:** `(Reach × Impact × Confidence) / Effort`

- **Reach**: How many users/customers are affected per time period (e.g., per quarter)? Use actual data from analytics where possible.
- **Impact**: How much does this move the needle for each person reached? Use a scale: 3 = massive, 2 = significant, 1 = moderate, 0.5 = low, 0.25 = minimal.
- **Confidence**: How confident are you in the above estimates? 100% = high confidence, 80% = medium, 50% = low. Gut-feel estimates should be 50%.
- **Effort**: Total person-months of work across all functions (product, design, engineering).

**When to use:** Product roadmap prioritization with analytics data available. Particularly effective when comparing features that serve different user segments.

**Pitfall:** RICE can be gamed by inflating Reach and Confidence. Require evidence for any Confidence score above 80%.

## WSJF (Weighted Shortest Job First)

WSJF comes from SAFe (Scaled Agile Framework) and prioritizes items that deliver cost of delay the fastest. It is ideal for PI planning and program-level backlogs.

**Formula:** `Cost of Delay / Job Duration`

**Cost of Delay** = User/Business Value + Time Criticality + Risk Reduction/Opportunity Enablement (each scored 1–21 using Fibonacci)

**Job Duration** is a relative size estimate (also Fibonacci).

**When to use:** Large-scale agile programs coordinating multiple teams. Best when items have different urgency profiles — some decay quickly if delayed, others don't.

**Pitfall:** WSJF requires team consensus on relative scoring, which takes practice. Don't apply it to individual user stories — use it at the feature or epic level.

## MoSCoW Method

MoSCoW categorizes backlog items into four buckets for a given release or sprint:

| Category | Meaning |
|----------|---------|
| **Must Have** | Non-negotiable; the release fails without this |
| **Should Have** | High value; include if possible, but the release ships without it |
| **Could Have** | Nice to have; include only if time and capacity permit |
| **Won't Have (this time)** | Explicitly out of scope for this release |

**Rule of thumb:** Must Haves should be no more than 60% of total estimated effort. If everything is a Must Have, the categorization is broken.

**When to use:** Release scoping, MVP definition, stakeholder alignment workshops. Particularly effective when you need a fast group decision with multiple stakeholders in the room.

**Pitfall:** MoSCoW is subjective. Different stakeholders will categorize the same item differently. Facilitate the conversation explicitly — don't let individuals pre-classify their own requests.

## Kano Model

The Kano model classifies features by the relationship between implementation and customer satisfaction:

- **Basic (Must-Be) Quality**: Expected features. Their absence causes strong dissatisfaction; their presence is neutral. Example: a mobile app that doesn't crash.
- **Performance Quality**: Linear relationship — more is better. Example: faster page load times.
- **Excitement (Delighter) Quality**: Unexpected features that create delight. Their absence is neutral; their presence creates strong positive response. Example: a personalized onboarding experience.
- **Indifferent Quality**: Features users don't care about either way. Cut these.
- **Reverse Quality**: Features some users dislike. Add only for specific segments.

**When to use:** Discovery and strategy phases, feature concept evaluation, differentiation decisions. Kano is a qualitative tool — use surveys or user interviews to classify features.

**Pitfall:** Delighters become Basic requirements over time (iPhone touchscreen, for example). Re-evaluate Kano classification each product generation.

## Choosing the Right Framework

| Situation | Best Framework |
|-----------|----------------|
| Quantitative data available, comparing many features | RICE |
| SAFe/program-level planning, multiple teams | WSJF |
| Release scoping with stakeholders in the room | MoSCoW |
| Early discovery, differentiating MVP features | Kano |
| Quick gut-check triage | MoSCoW |

In practice, combine frameworks: use Kano to classify features in discovery, MoSCoW to scope the release, and RICE to order items within the Must Have bucket.

## Communicating Prioritization Decisions

When explaining a prioritization decision to stakeholders, always state: what framework was used, what inputs drove the score, and what was deprioritized as a result. Transparency prevents HiPPO overrides and builds stakeholder trust in the process over time.
