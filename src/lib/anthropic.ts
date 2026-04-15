import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL_ID = "claude-sonnet-4-6" as const;
export const MAX_TOKENS = 4096 as const;
