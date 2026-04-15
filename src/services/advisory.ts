// Framework detection via keyword matching (no LLM call).

interface FrameworkKeywords {
  name: string;
  keywords: string[];
}

const FRAMEWORK_MAP: FrameworkKeywords[] = [
  { name: 'RICE', keywords: ['rice', 'reach', 'impact', 'confidence', 'effort', 'prioriti'] },
  { name: 'WSJF', keywords: ['wsjf', 'weighted shortest job', 'cost of delay', 'job size'] },
  { name: 'MoSCoW', keywords: ['moscow', 'must have', 'should have', 'could have', 'won\'t have', 'must-have', 'should-have'] },
  { name: 'Kano', keywords: ['kano', 'delighter', 'basic need', 'performance need', 'excitement'] },
  { name: 'SWOT', keywords: ['swot', 'strength', 'weakness', 'opportunit', 'threat'] },
  { name: 'Root Cause Analysis', keywords: ['root cause', '5 why', 'five why', 'fishbone', 'ishikawa', 'cause and effect'] },
  { name: 'Decision Matrix', keywords: ['decision matrix', 'weighted criteria', 'scoring matrix', 'pugh matrix', 'option analysis'] },
  { name: 'Stakeholder Mapping', keywords: ['stakeholder map', 'influence interest', 'power interest', 'stakeholder matrix', 'influence grid'] },
];

export function detectRelevantFrameworks(userMessage: string): string[] {
  const lower = userMessage.toLowerCase();
  return FRAMEWORK_MAP
    .filter(({ keywords }) => keywords.some((kw) => lower.includes(kw)))
    .map(({ name }) => name);
}
