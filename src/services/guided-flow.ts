import type { ArtifactTypeId, RoleId } from '@/lib/types';
import { getArtifactType } from '@/lib/constants';

export type GuidedPhase = 'context' | 'analysis' | 'drafting' | 'review';

// Number of user messages required before advancing to the next phase
const PHASE_THRESHOLDS: Record<GuidedPhase, number> = {
  context: 2,
  analysis: 5,
  drafting: 6,
  review: 999, // stays in review
};

const PHASE_ORDER: GuidedPhase[] = ['context', 'analysis', 'drafting', 'review'];

export function determinePhase(
  _artifactTypeId: ArtifactTypeId,
  messageCount: number
): GuidedPhase {
  // Walk backwards through phases to find the highest one the message count has unlocked
  for (let i = PHASE_ORDER.length - 1; i >= 0; i--) {
    const phase = PHASE_ORDER[i];
    if (phase === undefined) continue;
    const threshold = PHASE_THRESHOLDS[phase];
    if (messageCount >= threshold) {
      return phase;
    }
  }
  const first = PHASE_ORDER[0];
  return first ?? 'context';
}

export function validateArtifactCompleteness(
  _roleId: RoleId,
  artifactTypeId: ArtifactTypeId,
  content: string
): boolean {
  const artifactType = getArtifactType(artifactTypeId);
  return artifactType.requiredSections.every((section) =>
    content.toLowerCase().includes(section.toLowerCase())
  );
}
