import type { Message, Role } from "@/lib/types";
import { anthropic, MODEL_ID } from "@/lib/anthropic";
import { FRAMEWORK_DETECTION_PROMPT } from "@/prompts/advisory";

export async function detectRelevantFrameworks(
  userMessage: string
): Promise<string[]> {
  const response = await anthropic.messages.create({
    model: MODEL_ID,
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: `${FRAMEWORK_DETECTION_PROMPT}\n\n${userMessage}`,
      },
    ],
  });

  const text =
    response.content[0]?.type === "text" ? response.content[0].text : "";

  return text
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean);
}

export function buildAdvisoryContext(messages: Message[]): string {
  return messages
    .filter((m) => m.role !== "system")
    .slice(-10) // last 10 messages for context window efficiency
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n\n");
}

export function shouldTransitionToGuided(userMessage: string): boolean {
  const triggers = [
    "write a",
    "create a",
    "generate a",
    "draft a",
    "make a",
    "build a",
    "user story",
    "brd",
    "requirements document",
    "acceptance criteria",
  ];
  const lower = userMessage.toLowerCase();
  return triggers.some((t) => lower.includes(t));
}

export function extractRoleContext(_messages: Message[], _role: Role): string {
  // TODO: extract key facts from conversation for RAG query construction
  return "";
}
