// ============================================================
// PHASE & ITERATION ENUMS
// ============================================================

export type Phase = 'reflect' | 'compose' | 'generate' | 'evaluate';

export type LabId = 'activity-planning' | 'assessment-creation' | 'rubric-design';

// ============================================================
// LAB CONTENT TYPES (static config, not runtime state)
// ============================================================

export interface ScaffoldingQuestion {
  id: string;
  question: string;
  placeholder?: string;
  templateSlot: string;
  inputType: 'text' | 'textarea';
}

export interface TemplateSlot {
  id: string;
  label: string;
  defaultText: string;
}

export interface PromptTemplate {
  templateText: string;
  slots: TemplateSlot[];
}

export interface EvaluationReflection {
  id: string;
  question: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface FailureMode {
  id: string;
  title: string;
  description: string;
}

export interface EvaluationTools {
  reflectionQuestions: EvaluationReflection[];
  checklist: ChecklistItem[];
  failureModes: FailureMode[];
}

export interface IterationConfig {
  iterationNumber: number;
  title: string;
  focus: string;
  isOptional: boolean;
  scaffoldingQuestions: ScaffoldingQuestion[];
  promptTemplate: PromptTemplate;
  evaluationTools: EvaluationTools;
}

export interface LabMeta {
  id: LabId;
  title: string;
  description: string;
  estimatedTime: string;
  learningOutcome: string;
  coreSkill: string;
  icon: string;
}

export interface LabConfig {
  meta: LabMeta;
  iterations: IterationConfig[];
}

// ============================================================
// RUNTIME STATE TYPES
// ============================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  iterationNumber: number;
  isStreaming?: boolean;
}

export interface IterationAnswers {
  [questionId: string]: string;
}

export interface ChecklistState {
  [checklistItemId: string]: boolean;
}

export interface IterationState {
  iterationNumber: number;
  currentPhase: Phase;
  answers: IterationAnswers;
  checklistState: ChecklistState;
  assembledPrompt: string;
  promptEdited: boolean;
  isComplete: boolean;
}

export interface LabSessionState {
  sessionId: string;
  labId: LabId;
  currentIteration: number;
  iterations: Record<number, IterationState>;
  startedAt: number;
  lastActivityAt: number;
  additionalContext?: string | null;
  additionalContextFileName?: string | null;
}

export interface SessionHistoryEntry {
  id: string;
  labId: LabId;
  labTitle: string;
  startedAt: number;
  lastActivityAt: number;
  currentIteration: number;
  currentPhase: Phase;
  totalIterations: number;
  isComplete: boolean;
  sessionSnapshot: LabSessionState;
  chatSnapshot: ChatMessage[];
}

export interface ChatState {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  model: string;
}

export interface ApiKeySettings {
  openaiKey: string | null;
  preferredModel: string;
}
