import type { Phase } from './types';

export const PHASES: Phase[] = ['reflect', 'compose', 'generate', 'evaluate'];

export const PHASE_LABELS: Record<Phase, string> = {
  reflect: 'Reflect',
  compose: 'Compose',
  generate: 'Generate',
  evaluate: 'Evaluate',
};

export const PHASE_DESCRIPTIONS: Record<Phase, string> = {
  reflect: 'Answer scaffolding questions to clarify your intent',
  compose: 'Review and edit the assembled prompt',
  generate: 'Send the prompt to the AI',
  evaluate: 'Critically evaluate the AI response',
};

export const DEFAULT_MODEL = 'gpt-5-nano';
export const BYOK_MODEL = 'gpt-5.2';

export const MAX_ITERATIONS = 3;
