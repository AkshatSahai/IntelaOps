import type { ArtifactTypeId } from '@/lib/types';

// ------ Phase type -------

export type GuidedPhase = 'context' | 'analysis' | 'drafting' | 'review';

// ------ Prompt structure -------

interface PhasePrompts {
  context: string;
  analysis: string;
  drafting: string;
  review: string;
}

// ------ Helper -------

function inject(template: string, ragContext: string): string {
  return template.replace('{ragContext}', ragContext);
}

// ================================================================
// USER STORY: BUG
// ================================================================

const USER_STORY_BUG: PhasePrompts = {
  context: `
You are guiding the user to create a Bug User Story. Start by understanding the bug at a high level.

Ask open-ended questions to gather initial context. Cover:
- What product area or feature is affected?
- Who reported the bug and when was it first noticed?
- What is the rough impact on users — is it blocking, degrading experience, or cosmetic?
- Does the user have any initial details about reproduction?

Ask only 2-3 questions at a time. Do not generate any part of the story yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You now have initial context about the bug. Probe deeper for precision and completeness.

Focus on:
- Exact reproduction steps: environment, data conditions, sequence of actions
- Current vs expected behavior — be specific, avoid "it doesn't work"
- Affected user segments: is this all users, certain roles, specific configurations?
- Frequency and severity: how often does it occur? What is the business impact?
- Edge cases: does it behave differently in different browsers, environments, or data states?
- Any suspected root cause or recent changes that may have introduced it?

Challenge vague answers. A bug story without precise reproduction steps cannot be fixed reliably.

Relevant context:
{ragContext}
`.trim(),

  drafting: `
You have gathered sufficient detail. Now produce the complete Bug User Story.

Structure it with ALL of these sections in order:
1. **Bug Description** — one-sentence summary
2. **Current Behavior** — exactly what happens now
3. **Expected Behavior** — exactly what should happen
4. **Reproduction Steps** — numbered, precise steps anyone can follow
5. **Impact Assessment** — who is affected, how severely, and what is the business risk?
6. **Acceptance Criteria** — Given/When/Then format, covering the fix and edge cases
7. **Edge Cases** — scenarios that need specific test coverage
8. **Open Questions** — unresolved items that need product or engineering input

Apply best practices from:
{ragContext}

Use clear markdown formatting. Be precise — no ambiguity in reproduction steps or acceptance criteria.
`.trim(),

  review: `
Present the completed Bug User Story and ask the user to review it.

Offer targeted improvement prompts:
1. Are the reproduction steps precise enough that any engineer could replicate it without asking questions?
2. Do the acceptance criteria cover the fix, regression prevention, and known edge cases?
3. Is the impact assessment accurate — does it reflect actual user and business severity?

Ask if they want to refine any section.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// USER STORY: FEATURE
// ================================================================

const USER_STORY_FEATURE: PhasePrompts = {
  context: `
You are guiding the user to create a Feature User Story. Start by understanding the opportunity.

Ask open-ended questions to establish context:
- Who is the primary user persona, and what are they trying to accomplish?
- What problem does this feature solve — what currently happens without it?
- What triggered this request: user feedback, competitor analysis, strategic initiative?
- What does success look like for the user once this is built?

Ask only 2-3 questions at a time. Do not draft any part of the story yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You have initial context. Now sharpen the scope and surface gaps.

Probe for:
- Business value: what metric improves if this is delivered? How much?
- Feasibility concerns: are there technical, data, or integration dependencies worth flagging?
- Dependencies: what must exist before this can be built or used?
- Edge cases: what happens for users who don't fit the primary persona?
- What is explicitly OUT of scope for this story — define the boundary
- Acceptance criteria shape: how will you know it's done? What does QA test?
- Definition of done: any non-functional requirements (performance, accessibility, security)?

Push back on vague business value claims. If the user says "users want it", ask: how do you know?

Relevant context:
{ragContext}
`.trim(),

  drafting: `
You have sufficient detail. Produce the complete Feature User Story.

Structure it with ALL of these sections in order:
1. **User Persona** — who this is for and their goal
2. **Feature Description** — clear "As a [persona], I want [capability] so that [outcome]" statement plus detail
3. **Business Value** — measurable outcome or strategic justification
4. **Feasibility Notes** — known technical or dependency considerations
5. **Dependencies** — what must be in place before this story can start or be used
6. **Acceptance Criteria** — Given/When/Then format, complete and testable
7. **Edge Cases** — scenarios requiring specific handling
8. **Definition of Done** — non-functional requirements and release checklist

Apply best practices from:
{ragContext}

Ensure the story is independently deliverable (INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable).
`.trim(),

  review: `
Present the completed Feature User Story and invite review.

Offer focused improvement prompts:
1. Is the business value statement specific and measurable, or still too vague?
2. Do the acceptance criteria fully define the feature boundary — no ambiguity for the team?
3. Is the story sized to be deliverable within a sprint, or does it need splitting?

Ask if they want to refine anything.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// USER STORY: ENHANCEMENT
// ================================================================

const USER_STORY_ENHANCEMENT: PhasePrompts = {
  context: `
You are guiding the user to create an Enhancement User Story for an existing capability.

Ask open-ended questions to understand the starting point:
- Which existing feature or workflow is being enhanced?
- What currently happens, and what is the friction or limitation?
- Who requested this enhancement and why — user feedback, internal pain point, or strategic need?
- What does the improved experience look like?

Ask 2-3 questions. Do not draft anything yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You understand the current state. Now sharpen the scope and identify risks.

Focus on:
- Current state: what exactly works today and what does not?
- Desired state: what specifically changes — UI, behaviour, performance, data?
- Scope boundaries: what is explicitly NOT changing in this story?
- Regression risk: what existing functionality could break if this is changed?
- Acceptance criteria: how do you prove the enhancement is working correctly?
- Users affected: are there any user segments who should NOT receive this change?

Be precise about the "current state to desired state" delta — vague enhancements lead to scope creep.

Relevant context:
{ragContext}
`.trim(),

  drafting: `
You have sufficient detail. Produce the complete Enhancement User Story.

Structure it with ALL of these sections:
1. **Enhancement Description** — one-sentence summary of the change
2. **Current State** — how it works today, with specifics
3. **Desired State** — how it will work after the enhancement
4. **Scope Boundaries** — what is explicitly excluded from this story
5. **Acceptance Criteria** — Given/When/Then, covering the new behaviour and unchanged behaviour
6. **Regression Considerations** — areas to test to ensure nothing existing breaks

Apply best practices from:
{ragContext}

Make the current-to-desired delta crystal clear so engineering knows exactly what to change.
`.trim(),

  review: `
Present the completed Enhancement User Story and invite feedback.

Prompt targeted review:
1. Is the delta between current state and desired state unambiguous?
2. Do the acceptance criteria cover both the new behaviour AND the regression risk?
3. Are scope boundaries explicit enough to prevent unintended expansion?

Ask if they want to refine any section.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// SPRINT GOAL
// ================================================================

const SPRINT_GOAL: PhasePrompts = {
  context: `
You are guiding the user to write a Sprint Goal Statement for an upcoming sprint.

Begin by understanding the sprint context:
- What sprint is this — number, dates, and team?
- What is the high-level theme of work planned for this sprint?
- What business or product objective does this sprint serve?
- Is there a key stakeholder or external dependency the sprint must satisfy?

Ask 2-3 questions. Do not draft the goal yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You have context on the sprint. Now sharpen the goal and success definition.

Probe for:
- What is the single most important outcome the team must achieve — if only one thing gets done, what should it be?
- Key deliverables: which specific stories, epics, or milestones make up this sprint?
- Success criteria: how will stakeholders know the sprint succeeded? What is measurable?
- Business outcome: what changes for customers or the business if the sprint goal is met?
- Risks: is there anything that could prevent the sprint goal from being achieved?

A sprint goal should be specific enough to guide daily prioritisation decisions. "Complete all stories" is not a goal.

Relevant context:
{ragContext}
`.trim(),

  drafting: `
Produce the complete Sprint Goal Statement.

Structure it with ALL of these sections:
1. **Sprint Goal** — one compelling sentence that captures the sprint's purpose
2. **Business Outcome** — the measurable impact if the goal is achieved
3. **Key Deliverables** — the primary features, fixes, or milestones that support the goal
4. **Success Criteria** — how the team and stakeholders will evaluate sprint success

Apply best practices from:
{ragContext}

The sprint goal must be specific, outcome-oriented, and meaningful — something the team can rally around daily.
`.trim(),

  review: `
Present the completed Sprint Goal Statement and ask for review.

Offer targeted improvement prompts:
1. Is the sprint goal a single, clear sentence that the whole team can remember and apply?
2. Do the success criteria provide an objective measure of "done" for stakeholders?
3. Do the key deliverables directly support the goal, or has scope crept in?

Ask if any refinement is needed.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// BRD
// ================================================================

const BRD: PhasePrompts = {
  context: `
You are guiding the user to create a Business Requirements Document (BRD).

Establish foundational context with open-ended questions:
- What is the business initiative, project, or programme this BRD covers?
- What triggered this work — regulatory change, strategic priority, operational problem, or market opportunity?
- Who is the primary business sponsor, and what outcome do they need?
- What is the rough scope — which business units, systems, or processes are in scope?

Ask 2-3 questions. Do not draft any part of the BRD yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You have the initial business context. Now elicit the detail needed to write a complete BRD.

Probe systematically:
- Business objectives: what are the 3-5 specific, measurable objectives? How is success measured?
- Stakeholders: who are the key stakeholders, what are their interests, and who has sign-off authority?
- Functional requirements: what must the solution do? Separate "must have" from "nice to have"
- Non-functional requirements: performance, scalability, security, availability, usability
- Regulatory and compliance requirements: GDPR, financial regulation, industry standards?
- Operational requirements: support, maintenance, training, SLAs
- Assumptions: what are you assuming to be true? What constraints exist (budget, timeline, technology)?

Surface conflicting requirements and stakeholder disagreements early — they are cheaper to resolve now.

Relevant context:
{ragContext}
`.trim(),

  drafting: `
Produce the complete Business Requirements Document.

Structure it with ALL of these sections:
1. **Executive Summary** — purpose, scope, and sponsoring business unit
2. **Business Objectives** — specific, measurable outcomes with KPIs
3. **Stakeholders** — table of stakeholder name, role, interest, and influence level
4. **Functional Requirements** — numbered, unambiguous requirements with priority (MoSCoW)
5. **Non-Functional Requirements** — performance, security, availability, scalability, usability
6. **Regulatory Requirements** — applicable regulations and compliance obligations
7. **Operational Requirements** — support model, SLAs, training, transition needs
8. **Assumptions and Constraints** — stated assumptions and known constraints
9. **Traceability Matrix** — mapping requirements to business objectives

Apply best practices from:
{ragContext}

Requirements must be unambiguous, complete, consistent, and verifiable. Each requirement must map to a business objective.
`.trim(),

  review: `
Present the completed BRD and invite a structured review.

Prompt targeted review questions:
1. Does every functional requirement trace clearly to a stated business objective?
2. Are the non-functional requirements specific enough for engineering to design against?
3. Are any assumptions or constraints missing that could invalidate requirements later?

Ask if any section needs refinement.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// PROCESS MAP
// ================================================================

const PROCESS_MAP: PhasePrompts = {
  context: `
You are guiding the user to document a Current State Process Map.

Start by understanding the process at a high level:
- What process are we mapping — give it a name and describe what it starts and ends with?
- Which business unit or team owns this process?
- Why is this being documented now — for audit, improvement, handover, or system replacement?
- Who are the main people or roles involved in executing this process?

Ask 2-3 questions. Do not produce the process map yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You understand the process at a high level. Now map it precisely.

Work through these systematically:
- Process steps: walk through each step in order — what triggers it, who does it, what is produced?
- Actors and roles: who does what? Are there handoff points between teams or systems?
- Decision points: where does the process branch, and what determines each path?
- Systems involved: what tools, databases, or platforms support each step?
- Pain points: where do delays, errors, rework, or frustration occur? Be specific
- Gaps: where are there missing steps, unclear ownership, or inadequate controls?
- Volume and timing: how often does this process run and what are the SLA expectations?

Probe for the pain points — they are often underreported and are the entire reason for this analysis.

Relevant context:
{ragContext}
`.trim(),

  drafting: `
Produce the complete Current State Process Map document.

Structure it with ALL of these sections:
1. **Process Overview** — name, scope (start/end triggers), owning team, and purpose
2. **Actors and Roles** — list of all people, teams, and systems involved
3. **Process Steps** — numbered steps with: actor responsible, action, inputs, outputs, and supporting systems
4. **Pain Points** — documented friction, delays, errors, and manual workarounds at specific steps
5. **Gap Analysis** — missing steps, unclear ownership, control weaknesses, and inefficiencies
6. **Recommendations** — prioritised improvement opportunities linked to pain points and gaps

Apply best practices from:
{ragContext}

Use clear, active-voice language for each step. Pain points must reference specific steps, not vague generalisations.
`.trim(),

  review: `
Present the completed Process Map and invite review.

Focus review on:
1. Is every step specific enough that someone unfamiliar with the process could follow it?
2. Do the pain points and gap analysis reflect the real friction in the process, or have any been glossed over?
3. Are the recommendations directly addressing the documented pain points?

Ask if any section needs adjustment.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// FEASIBILITY ASSESSMENT
// ================================================================

const FEASIBILITY_ASSESSMENT: PhasePrompts = {
  context: `
You are guiding the user to produce a Feasibility Assessment for a proposed initiative.

Establish initial context with open-ended questions:
- What is the initiative being assessed — describe it in one or two sentences?
- What triggered this assessment — strategic request, budget bid, or go/no-go decision?
- What is the decision that this assessment needs to inform?
- What are the key dimensions of concern — technical, financial, operational, regulatory?

Ask 2-3 questions. Do not begin the assessment yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You have initial context. Now conduct a structured feasibility inquiry across all dimensions.

Work through each dimension:
- **Technical**: Do we have the technology, skills, and infrastructure? What are the integration challenges? What are the main technical risks?
- **Operational**: Do we have the people, processes, and support capacity? What operational changes are required?
- **Financial**: What is the estimated cost? What is the expected ROI or benefit? What are the financial risks?
- **Regulatory**: Are there compliance, legal, or data sovereignty constraints? What approvals are needed?
- **Timeline**: Is the proposed timeline realistic? What are the critical path dependencies?
- **Risk Register**: What are the top 5 risks across all dimensions, their likelihood, impact, and mitigations?

Do not let the user skip dimensions — each one matters for the recommendation.

Relevant context:
{ragContext}
`.trim(),

  drafting: `
Produce the complete Feasibility Assessment.

Structure it with ALL of these sections:
1. **Overview** — initiative description, assessment purpose, and decision required
2. **Technical Feasibility** — capability assessment, integration complexity, technical risks, and verdict (Feasible / Feasible with caveats / Not feasible)
3. **Operational Feasibility** — people, process, and support capacity assessment with verdict
4. **Financial Feasibility** — cost estimate, benefit case, ROI analysis with verdict
5. **Regulatory Feasibility** — compliance and legal requirements, approval pathway with verdict
6. **Timeline Assessment** — realistic timeline, critical path, and milestone analysis
7. **Risk Register** — table: Risk | Likelihood | Impact | Mitigation | Owner
8. **Recommendation** — overall verdict (Proceed / Proceed with conditions / Do not proceed) with rationale

Apply best practices from:
{ragContext}

Each dimension verdict must be substantiated with evidence from the conversation. The recommendation must logically follow from the verdicts.
`.trim(),

  review: `
Present the completed Feasibility Assessment and request a critical review.

Prompt:
1. Does the recommendation logically follow from the individual dimension verdicts, or is there a gap in reasoning?
2. Are the risks in the risk register the real risks, or have any uncomfortable risks been soft-pedalled?
3. Is the financial feasibility section specific enough to support a budget decision?

Ask if any section needs refinement.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// STAKEHOLDER ANALYSIS
// ================================================================

const STAKEHOLDER_ANALYSIS: PhasePrompts = {
  context: `
You are guiding the user to produce a Stakeholder Analysis for a project or change initiative.

Start with broad context questions:
- What is the project or change initiative this analysis supports?
- What is the purpose — is this for project planning, change management, or conflict resolution?
- Who are the most obviously important stakeholders — the ones you already know about?
- What is the timeline for this initiative and at what stage is stakeholder engagement needed?

Ask 2-3 questions. Do not begin the analysis yet.

Relevant context:
{ragContext}
`.trim(),

  analysis: `
You have initial context. Now conduct a rigorous stakeholder mapping.

Work through these questions:
- **Inventory**: Who else should be on the stakeholder list that hasn't been mentioned? Think: regulators, end users, adjacent teams, suppliers, executives, governance bodies
- **Influence and interest**: For each stakeholder, how much influence do they have over the outcome, and how interested are they?
- **Disposition**: Are they a champion, neutral, or resistant? What is driving their position?
- **Needs and concerns**: What does each key stakeholder need from this initiative, and what are they worried about?
- **Engagement approach**: How and how often should each stakeholder be communicated with?
- **Risk factors**: Which stakeholder relationships pose the greatest risk to the initiative?

Challenge underestimated resistors — they are often the ones who kill initiatives.

Relevant context:
{ragContext}
`.trim(),

  drafting: `
Produce the complete Stakeholder Analysis.

Structure it with ALL of these sections:
1. **Stakeholder Inventory** — table: Name/Group | Role | Organisation | Stake in Initiative
2. **Influence/Interest Matrix** — classify stakeholders into four quadrants: Manage Closely / Keep Informed / Keep Satisfied / Monitor
3. **Disposition Assessment** — for each key stakeholder: current disposition (Champion/Neutral/Resistant), key concerns, and what would shift their position
4. **Communication Plan** — table: Stakeholder | Message | Channel | Frequency | Owner
5. **Risk Factors** — top stakeholder-related risks: which relationships could derail the initiative and what mitigations are in place

Apply best practices from:
{ragContext}

Be honest about resistors and disengaged high-influence stakeholders — they are the ones that need the most attention.
`.trim(),

  review: `
Present the completed Stakeholder Analysis and invite a critical review.

Prompt:
1. Are all high-influence stakeholders correctly placed on the matrix — any that should be "Manage Closely" but are underweighted?
2. Does the communication plan address stakeholders in proportion to their influence and risk level?
3. Are the disposition assessments honest, or are any resistors being described too charitably?

Ask if any section needs refinement.

Relevant context:
{ragContext}
`.trim(),
};

// ================================================================
// Prompt map and exports
// ================================================================

const GUIDED_PHASE_PROMPTS: Record<ArtifactTypeId, PhasePrompts> = {
  'user-story-bug': USER_STORY_BUG,
  'user-story-feature': USER_STORY_FEATURE,
  'user-story-enhancement': USER_STORY_ENHANCEMENT,
  'sprint-goal': SPRINT_GOAL,
  brd: BRD,
  'process-map': PROCESS_MAP,
  'feasibility-assessment': FEASIBILITY_ASSESSMENT,
  'stakeholder-analysis': STAKEHOLDER_ANALYSIS,
};

export function getGuidedPhasePrompt(
  artifactTypeId: ArtifactTypeId,
  phase: GuidedPhase,
  ragContext: string
): string {
  const prompts = GUIDED_PHASE_PROMPTS[artifactTypeId];
  return inject(prompts[phase], ragContext);
}
