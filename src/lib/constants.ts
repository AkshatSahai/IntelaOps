import type { RoleOption } from "@/lib/types";

// ------ Model config -------

export const MODEL_ID = "claude-sonnet-4-6" as const;
export const MAX_TOKENS = 4096 as const;
export const EMBEDDING_MODEL = "text-embedding-3-small" as const;
export const EMBEDDING_DIMENSIONS = 1536 as const;

// ------ RAG config -------

export const RAG_MATCH_COUNT = 5 as const;
export const RAG_MATCH_THRESHOLD = 0.7 as const;

// ------ Role & artifact definitions -------

export const ROLES: RoleOption[] = [
  {
    id: "product-owner",
    label: "Product Owner",
    description:
      "Define and prioritize the product backlog. Write user stories, acceptance criteria, and sprint goals.",
    artifactTypes: [
      {
        id: "user-story",
        label: "User Story",
        description: "A standard As a / I want / So that user story with acceptance criteria.",
      },
      {
        id: "user-story-bug",
        label: "Bug Report (User Story format)",
        description: "A bug captured as a structured user story with reproduction steps.",
      },
      {
        id: "epic",
        label: "Epic",
        description: "A large body of work that encompasses multiple user stories.",
      },
      {
        id: "sprint-goal",
        label: "Sprint Goal",
        description: "A concise statement of what the team intends to achieve this sprint.",
      },
      {
        id: "acceptance-criteria",
        label: "Acceptance Criteria",
        description: "Given / When / Then criteria for an existing story.",
      },
      {
        id: "backlog-refinement-notes",
        label: "Backlog Refinement Notes",
        description: "Structured notes capturing decisions and open questions from a refinement session.",
      },
    ],
  },
  {
    id: "business-analyst",
    label: "Business Analyst",
    description:
      "Elicit, analyse, and document requirements. Bridge stakeholders and development teams.",
    artifactTypes: [
      {
        id: "business-requirements-document",
        label: "Business Requirements Document (BRD)",
        description: "A formal document capturing business objectives, scope, and requirements.",
      },
      {
        id: "functional-specification",
        label: "Functional Specification",
        description: "Detailed functional requirements describing system behaviour.",
      },
      {
        id: "use-case",
        label: "Use Case",
        description: "A structured use case with actors, preconditions, and flow of events.",
      },
      {
        id: "process-map",
        label: "Process Map (text/structured)",
        description: "A textual or structured representation of a business process.",
      },
      {
        id: "gap-analysis",
        label: "Gap Analysis",
        description: "Current state vs future state analysis identifying gaps and recommendations.",
      },
      {
        id: "stakeholder-analysis",
        label: "Stakeholder Analysis",
        description: "Identification and assessment of key stakeholders and their interests.",
      },
    ],
  },
];

export const ROLE_MAP: Record<string, RoleOption> = Object.fromEntries(
  ROLES.map((r) => [r.id, r])
);
