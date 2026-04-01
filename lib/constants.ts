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

export const DEFAULT_MODEL = 'stepfun/step-3.5-flash:free';
export const BYOK_MODELS = [
  { id: 'stepfun/step-3.5-flash:free', label: 'Step 3.5 Flash (StepFun)' },
  { id: 'mistralai/mistral-small-3.2-24b-instruct', label: 'Mistral Small 3.2 24B' },
  { id: 'minimax/minimax-m2.5', label: 'MiniMax M2.5' },
  { id: 'openai/gpt-5.4', label: 'GPT-5.4 (OpenAI)' },
  { id: 'anthropic/claude-opus-4.6', label: 'Claude Opus 4.6 (Anthropic)' },
  { id: 'anthropic/claude-sonnet-4.6', label: 'Claude Sonnet 4.6 (Anthropic)' },
  { id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash (Google)' },
  { id: 'meta-llama/llama-4-maverick', label: 'Llama 4 Maverick (Meta)' },
];
export const DEFAULT_BYOK_MODEL = BYOK_MODELS[0].id;

export const MAX_ITERATIONS = 3;
