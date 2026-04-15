import type { RoleDefinition, ArtifactType, RoleId, ArtifactTypeId } from '@/lib/types';

// ------ Model config -------

export const MODEL = 'claude-sonnet-4-20250514' as const;
export const MAX_TOKENS = 4096 as const;
export const EMBEDDING_MODEL = 'text-embedding-3-small' as const;
export const EMBEDDING_DIMENSIONS = 1536 as const;

// ------ RAG config -------

export const RAG_MATCH_COUNT = 5 as const;
export const RAG_MATCH_THRESHOLD = 0.7 as const;

// ------ Artifact type definitions -------

export const ARTIFACT_TYPES: ArtifactType[] = [
  // Product Owner artifacts
  {
    id: 'user-story-bug',
    name: 'User Story: Bug',
    description: 'A bug captured in structured user story format with reproduction steps and impact assessment.',
    requiredSections: [
      'Bug Description',
      'Current Behavior',
      'Expected Behavior',
      'Reproduction Steps',
      'Impact Assessment',
      'Acceptance Criteria',
      'Edge Cases',
      'Open Questions',
    ],
  },
  {
    id: 'user-story-feature',
    name: 'User Story: Feature',
    description: 'A new capability described from the user perspective with full acceptance criteria.',
    requiredSections: [
      'User Persona',
      'Feature Description',
      'Business Value',
      'Feasibility Notes',
      'Dependencies',
      'Acceptance Criteria',
      'Edge Cases',
      'Definition of Done',
    ],
  },
  {
    id: 'user-story-enhancement',
    name: 'User Story: Enhancement',
    description: 'An improvement to an existing capability with clear scope boundaries.',
    requiredSections: [
      'Enhancement Description',
      'Current State',
      'Desired State',
      'Scope Boundaries',
      'Acceptance Criteria',
      'Regression Considerations',
    ],
  },
  {
    id: 'sprint-goal',
    name: 'Sprint Goal Statement',
    description: 'A concise statement of team intent for the sprint with measurable success criteria.',
    requiredSections: [
      'Sprint Goal',
      'Business Outcome',
      'Key Deliverables',
      'Success Criteria',
    ],
  },
  // Business Analyst artifacts
  {
    id: 'brd',
    name: 'Business Requirements Document',
    description: 'A formal document capturing business objectives, stakeholders, and requirements.',
    requiredSections: [
      'Executive Summary',
      'Business Objectives',
      'Stakeholders',
      'Functional Requirements',
      'Non-Functional Requirements',
      'Regulatory Requirements',
      'Operational Requirements',
      'Assumptions and Constraints',
      'Traceability Matrix',
    ],
  },
  {
    id: 'process-map',
    name: 'Current State Process Map',
    description: 'A structured representation of the current business process with gap analysis.',
    requiredSections: [
      'Process Overview',
      'Actors and Roles',
      'Process Steps',
      'Pain Points',
      'Gap Analysis',
      'Recommendations',
    ],
  },
  {
    id: 'feasibility-assessment',
    name: 'Feasibility Assessment',
    description: 'A multi-dimensional feasibility analysis with risk register and recommendation.',
    requiredSections: [
      'Overview',
      'Technical Feasibility',
      'Operational Feasibility',
      'Financial Feasibility',
      'Regulatory Feasibility',
      'Timeline Assessment',
      'Risk Register',
      'Recommendation',
    ],
  },
  {
    id: 'stakeholder-analysis',
    name: 'Stakeholder Analysis',
    description: 'Identification and assessment of stakeholders with communication plan.',
    requiredSections: [
      'Stakeholder Inventory',
      'Influence/Interest Matrix',
      'Disposition Assessment',
      'Communication Plan',
      'Risk Factors',
    ],
  },
];

const ARTIFACT_TYPE_MAP: Map<ArtifactTypeId, ArtifactType> = new Map(
  ARTIFACT_TYPES.map((a) => [a.id, a])
);

// ------ Role definitions -------

export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    id: 'product-owner',
    name: 'Product Owner',
    description:
      'Define and prioritise the product backlog. Write user stories, acceptance criteria, and sprint goals.',
    icon: 'clipboard-list',
    artifactTypes: ['user-story-bug', 'user-story-feature', 'user-story-enhancement', 'sprint-goal'],
    advisoryCapabilities: [
      'Backlog prioritisation (RICE, WSJF, MoSCoW)',
      'Stakeholder negotiation coaching',
      'Sprint planning facilitation',
      'General PO mentoring',
    ],
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    description:
      'Elicit, analyse, and document requirements. Bridge stakeholders and development teams.',
    icon: 'bar-chart',
    artifactTypes: ['brd', 'process-map', 'feasibility-assessment', 'stakeholder-analysis'],
    advisoryCapabilities: [
      'Requirements elicitation coaching',
      'Process improvement analysis',
      'Data analysis framing',
      'Stakeholder conflict resolution',
    ],
  },
];

const ROLE_MAP: Map<RoleId, RoleDefinition> = new Map(
  ROLE_DEFINITIONS.map((r) => [r.id, r])
);

// ------ Helper functions -------

export function getRoleById(id: RoleId): RoleDefinition {
  const role = ROLE_MAP.get(id);
  if (!role) throw new Error(`Unknown role: ${id}`);
  return role;
}

export function getArtifactType(id: ArtifactTypeId): ArtifactType {
  const artifact = ARTIFACT_TYPE_MAP.get(id);
  if (!artifact) throw new Error(`Unknown artifact type: ${id}`);
  return artifact;
}

// ------ Legacy alias (used by some components) -------

/** @deprecated Use ROLE_DEFINITIONS */
export const ROLES = ROLE_DEFINITIONS.map((r) => ({
  ...r,
  label: r.name,
  artifactTypes: r.artifactTypes.map((id) => {
    const at = ARTIFACT_TYPE_MAP.get(id);
    return { id, label: at?.name ?? id, description: at?.description ?? '' };
  }),
}));
