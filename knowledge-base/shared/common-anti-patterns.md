# Common Anti-Patterns in Product and BA Work

## What Anti-Patterns Are

Anti-patterns are common responses to recurring problems that feel reasonable in the moment but consistently produce bad outcomes. Unlike simply "doing it wrong," an anti-pattern has a recognizable structure — which is what makes it seductive and what makes naming it useful. When you can name an anti-pattern, you can recognize it earlier and intervene.

## Scope Creep

**Pattern:** The scope of a project or sprint expands incrementally, with each addition seeming small and reasonable, until the original commitment is undeliverable.

**How it happens:** A stakeholder adds "just one more thing" during demo feedback. A developer notices a related problem while building and fixes it without discussion. The product owner says yes to a new request without removing something else.

**Signs:** Sprint velocity consistently below commitment. "Almost done" becomes the permanent status. The original sprint goal is forgotten.

**Prevention:**
- Maintain a written scope boundary with an explicit out-of-scope section
- Every addition to sprint scope requires a removal of equivalent size
- Use the sprint goal as the filter: "Does this addition serve the sprint goal?" If not, it goes to the backlog.

## Gold Plating

**Pattern:** A developer or designer adds features or polish beyond the agreed acceptance criteria because they believe the result will be better. The additions are not requested and not approved.

**How it differs from scope creep:** Scope creep is driven by stakeholder additions. Gold plating is driven by the team's own initiative.

**Why it's a problem:** Gold plating consumes capacity without delivering prioritized value. It introduces unreviewed functionality. It delays the delivery of other prioritized items.

**Prevention:** Acceptance criteria define done. Once criteria are met, the story is complete — any further work requires a new story and explicit prioritization.

## Bikeshedding (Parkinson's Law of Triviality)

**Pattern:** A group spends disproportionate time and energy on low-stakes, easy-to-understand decisions while avoiding complex, high-stakes decisions.

**Why it happens:** Simple decisions invite everyone's opinion (everyone has a view on button color). Complex decisions require expertise and carry risk — people unconsciously avoid them.

**Examples in product work:** 45-minute debates on UI label wording. Lengthy email threads about which icon to use. Repeated re-opening of already-decided low-stakes choices.

**Prevention:**
- Time-box discussions on minor decisions explicitly: "We have 5 minutes for this."
- Assign ownership: "This is [person]'s call — let them decide."
- Defer low-stakes decisions: "Ship with option A and revisit after we have user data."

## HiPPO (Highest Paid Person's Opinion)

**Pattern:** Product decisions are made based on the seniority of the person advocating for them rather than evidence, user research, or structured analysis.

**Why it's damaging:** It overrides good decisions with bad ones. It disincentivizes the team from gathering evidence (why bother if the executive will override anyway?). It creates a culture of approval-seeking rather than decision-making.

**Prevention:**
- Agree on decision criteria before a decision meeting, not during
- Present evidence-based recommendations with explicit assumptions
- Frame disagreements as competing hypotheses: "I think X because of evidence Y. What evidence would change your view?"
- Run experiments to resolve disagreements rather than arguing from authority

## Analysis Paralysis

**Pattern:** A team or individual defers making a decision indefinitely because the available information seems insufficient, waiting for more data or more certainty that never arrives.

**Why it happens:** Making a decision means being accountable for the outcome. More analysis feels like risk reduction but actually just delays commitment.

**Signs:** Decisions in "in review" for multiple sprints. Requests for more data that address questions already answered. Repeated re-opening of options that were previously narrowed down.

**Prevention:**
- Set explicit decision deadlines: "We will decide by [date] with the information available."
- Define the minimum information needed to make a good-enough decision (not a perfect one)
- Use time-boxed spikes for research: 2 days maximum before a decision is made on available evidence
- Apply the reversibility test: "Is this decision reversible?" If yes, decide quickly and adjust later.

## Premature Requirements Specification

**Pattern:** The BA or product owner invests heavily in detailing requirements for work that is far from being built — only to find that requirements change by the time development begins.

**Why it's tempting:** Detailed requirements feel like preparation. Stakeholders feel reassured by thick documentation.

**Why it's wasteful:** Requirements for work three quarters away will change. The work of writing them is wasted, and so is the work of updating them.

**Prevention:** Apply "just in time" requirements — detail work two sprints ahead of implementation, not ten. Use placeholders (epics, one-line problem statements) for far-future work.

## Proxy Ownership

**Pattern:** A person holds the product owner title but routes all decisions through a more senior stakeholder rather than making decisions directly.

**Impact:** Decision cycles lengthen from hours to days. The team cannot get timely answers. The PO loses credibility as a decision-maker.

**Prevention:** Product ownership requires delegated authority. Before accepting a PO role, confirm explicitly what decisions can be made independently and what requires escalation. If most decisions require escalation, the role needs to be restructured.
