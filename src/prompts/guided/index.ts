import type { ArtifactType, ConversationPhase, Role } from "@/lib/types";

// ------ Phase introduction prompts -------

export const PHASE_INTROS: Record<ConversationPhase, string> = {
  intro: `Introduce yourself briefly, confirm the artifact type the user wants to create,
and explain how the conversation will work. Ask the first discovery question.`,

  discovery: `You are in the discovery phase. Ask open-ended questions to understand
the context, users, problem, and value. Probe for specifics — avoid vague answers.`,

  clarification: `You are in the clarification phase. You have the core information.
Now identify and resolve any ambiguities, missing details, or edge cases.`,

  validation: `You are in the validation phase. Summarise your understanding back to the user,
check for accuracy, and surface any remaining blind spots before generating the artifact.`,

  generation: `You are generating the artifact. Use all information gathered.
Apply best practices from the knowledge base. Format it cleanly and completely.`,

  review: `The artifact has been generated. Ask the user if they want any refinements.
Offer 2-3 specific improvement suggestions if applicable.`,
};

// ------ Artifact-specific question sets -------

export const GUIDED_PROMPTS: Partial<Record<ArtifactType, Record<ConversationPhase, string>>> = {
  "user-story": {
    intro: `We're going to create a user story together. I'll ask you a series of questions
to make sure we capture the right context, user need, and acceptance criteria.
Let's start: Who is the primary user or persona this story is for, and what are they trying to accomplish?`,

    discovery: `Good. Now let's dig deeper:
- What problem does this solve for the user? What happens if we don't build it?
- Are there secondary users or personas affected by this?
- What constraints or dependencies should we know about?`,

    clarification: `We're nearly there. A few clarifying questions:
- What does "done" look like — how would you test this story?
- Are there any edge cases or error states we need to handle?
- What is NOT in scope for this story?`,

    validation: `Let me summarise what I've understood before I write the story.
[SUMMARY PLACEHOLDER]
Does this capture everything correctly? Anything to add or correct?`,

    generation: `Based on our conversation, here is your user story:`,

    review: `Here is your completed user story. Would you like to refine anything?
I'd suggest reviewing: (1) acceptance criteria completeness, (2) scope boundaries, (3) definition of done.`,
  },

  "business-requirements-document": {
    intro: `We're going to create a Business Requirements Document (BRD).
I'll guide you through the key sections. Let's start with context:
What is the business initiative or project this BRD covers, and what triggered it?`,

    discovery: `Let's explore the business context more:
- What are the primary business objectives? How will success be measured?
- Who are the key stakeholders and what are their interests?
- What is the scope — what's in and out of bounds?`,

    clarification: `Let's sharpen the requirements:
- Are there regulatory, compliance, or security considerations?
- What are the key assumptions and constraints?
- What dependencies exist on other systems, teams, or projects?`,

    validation: `Before I draft the BRD, let me confirm my understanding:
[SUMMARY PLACEHOLDER]
Does this represent the full picture? Any gaps?`,

    generation: `Based on our conversation, here is your Business Requirements Document:`,

    review: `Your BRD is ready. Suggested review areas: (1) completeness of functional requirements,
(2) clarity of success metrics, (3) stakeholder sign-off process.`,
  },
};

export function getGuidedPrompt(
  artifactType: ArtifactType,
  phase: ConversationPhase,
  _role: Role
): string {
  const artifactPrompts = GUIDED_PROMPTS[artifactType];
  if (artifactPrompts?.[phase]) {
    return artifactPrompts[phase];
  }
  // Fall back to generic phase intro
  return PHASE_INTROS[phase];
}

// ------ Artifact generation template -------

export function buildGenerationPrompt(
  artifactType: ArtifactType,
  role: Role,
  context: string,
  ragContext: string
): string {
  return `You are generating a ${artifactType} for a ${role}.

KNOWLEDGE BASE CONTEXT (use this to ensure best-practice quality):
${ragContext}

CONVERSATION CONTEXT (what the user told you):
${context}

Generate a complete, professional ${artifactType}. Use proper formatting with markdown headers.
Apply every applicable best practice from the knowledge base context above.`;
}
