import type { ArtifactType, ConversationPhase, Message } from "@/lib/types";

// How many user messages are expected per phase before advancing
const PHASE_MESSAGE_THRESHOLDS: Record<ConversationPhase, number> = {
  intro: 1,
  discovery: 3,
  clarification: 2,
  validation: 1,
  generation: 0,
  review: 99, // stays in review until user is done
};

const PHASE_ORDER: ConversationPhase[] = [
  "intro",
  "discovery",
  "clarification",
  "validation",
  "generation",
  "review",
];

export function determineNextPhase(
  currentPhase: ConversationPhase,
  messages: Message[]
): ConversationPhase {
  const userMessages = messages.filter((m) => m.role === "user").length;
  const threshold = PHASE_MESSAGE_THRESHOLDS[currentPhase];

  if (userMessages >= threshold) {
    const currentIndex = PHASE_ORDER.indexOf(currentPhase);
    const nextIndex = Math.min(currentIndex + 1, PHASE_ORDER.length - 1);
    return PHASE_ORDER[nextIndex] ?? currentPhase;
  }

  return currentPhase;
}

export function isArtifactComplete(
  phase: ConversationPhase,
  _artifactType: ArtifactType
): boolean {
  return phase === "review" || phase === "generation";
}

export function buildConversationContext(messages: Message[]): string {
  return messages
    .filter((m) => m.role !== "system")
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n\n");
}

export function getRequiredFields(_artifactType: ArtifactType): string[] {
  // Returns the minimum fields needed before generation can proceed
  // TODO: expand per artifact type
  return ["user", "goal", "value"];
}
