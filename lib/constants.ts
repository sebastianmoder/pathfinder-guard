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

export type ModelAvailability = 'Free' | 'Paid';

export type ModelOption = {
  id: string;
  name: string;
  provider: string;
  label: string;
  availability: ModelAvailability;
};

export const DEFAULT_MODEL_OPTION: ModelOption = {
  id: 'minimax/minimax-m2.5',
  name: 'MiniMax M2.5',
  provider: 'MiniMax',
  label: 'MiniMax M2.5 (MiniMax)',
  availability: 'Free',
};

export const DEFAULT_MODEL = DEFAULT_MODEL_OPTION.id;

export const BYOK_MODELS: ModelOption[] = [
  DEFAULT_MODEL_OPTION,
  {
    id: 'mistralai/mistral-small-3.2-24b-instruct',
    name: 'Mistral Small 3.2 24B',
    provider: 'Mistral AI',
    label: 'Mistral Small 3.2 24B',
    availability: 'Paid',
  },
  {
    id: 'openai/gpt-5.4',
    name: 'GPT-5.4',
    provider: 'OpenAI',
    label: 'GPT-5.4 (OpenAI)',
    availability: 'Paid',
  },
  {
    id: 'anthropic/claude-opus-4.6',
    name: 'Claude Opus 4.6',
    provider: 'Anthropic',
    label: 'Claude Opus 4.6 (Anthropic)',
    availability: 'Paid',
  },
  {
    id: 'anthropic/claude-sonnet-4.6',
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    label: 'Claude Sonnet 4.6 (Anthropic)',
    availability: 'Paid',
  },
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    label: 'Gemini 2.5 Flash (Google)',
    availability: 'Paid',
  },
  {
    id: 'meta-llama/llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    label: 'Llama 4 Maverick (Meta)',
    availability: 'Paid',
  },
];
export const DEFAULT_BYOK_MODEL = DEFAULT_MODEL;

export const MAX_ITERATIONS = 3;
