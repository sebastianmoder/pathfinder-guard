'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  LabId,
  LabSessionState,
  IterationState,
  Phase,
} from '@/lib/types';
import { PHASES } from '@/lib/constants';

interface LabSessionStore {
  session: LabSessionState | null;

  startLab: (labId: LabId, totalIterations: number) => void;
  restoreSession: (session: LabSessionState) => void;
  setAnswer: (iterationNumber: number, questionId: string, answer: string) => void;
  setAssembledPrompt: (iterationNumber: number, prompt: string) => void;
  markPromptEdited: (iterationNumber: number) => void;
  advancePhase: () => void;
  advanceIteration: () => void;
  toggleChecklistItem: (iterationNumber: number, itemId: string) => void;
  completeIteration: (iterationNumber: number) => void;
  completeLab: () => void;
  resetSession: () => void;
  setAdditionalContext: (text: string | null, fileName: string | null) => void;
}

function createIterationState(iterationNumber: number): IterationState {
  return {
    iterationNumber,
    currentPhase: 'reflect',
    answers: {},
    checklistState: {},
    assembledPrompt: '',
    promptEdited: false,
    isComplete: false,
  };
}

function getNextPhase(current: Phase): Phase | null {
  const index = PHASES.indexOf(current);
  if (index < PHASES.length - 1) {
    return PHASES[index + 1];
  }
  return null;
}

export const useLabSessionStore = create<LabSessionStore>()(
  persist(
    (set, get) => ({
  session: null,

  startLab: (labId, totalIterations) => {
    const iterations: Record<number, IterationState> = {};
    for (let i = 1; i <= totalIterations; i++) {
      iterations[i] = createIterationState(i);
    }
    set({
      session: {
        sessionId: crypto.randomUUID(),
        labId,
        currentIteration: 1,
        iterations,
        startedAt: Date.now(),
        lastActivityAt: Date.now(),
      },
    });
  },

  restoreSession: (session) => {
    set({ session });
  },

  setAnswer: (iterationNumber, questionId, answer) => {
    const { session } = get();
    if (!session) return;
    set({
      session: {
        ...session,
        lastActivityAt: Date.now(),
        iterations: {
          ...session.iterations,
          [iterationNumber]: {
            ...session.iterations[iterationNumber],
            answers: {
              ...session.iterations[iterationNumber].answers,
              [questionId]: answer,
            },
          },
        },
      },
    });
  },

  setAssembledPrompt: (iterationNumber, prompt) => {
    const { session } = get();
    if (!session) return;
    set({
      session: {
        ...session,
        lastActivityAt: Date.now(),
        iterations: {
          ...session.iterations,
          [iterationNumber]: {
            ...session.iterations[iterationNumber],
            assembledPrompt: prompt,
          },
        },
      },
    });
  },

  markPromptEdited: (iterationNumber) => {
    const { session } = get();
    if (!session) return;
    set({
      session: {
        ...session,
        iterations: {
          ...session.iterations,
          [iterationNumber]: {
            ...session.iterations[iterationNumber],
            promptEdited: true,
          },
        },
      },
    });
  },

  advancePhase: () => {
    const { session } = get();
    if (!session) return;

    const currentIter = session.iterations[session.currentIteration];
    const nextPhase = getNextPhase(currentIter.currentPhase);
    if (!nextPhase) return;

    set({
      session: {
        ...session,
        lastActivityAt: Date.now(),
        iterations: {
          ...session.iterations,
          [session.currentIteration]: {
            ...currentIter,
            currentPhase: nextPhase,
          },
        },
      },
    });
  },

  advanceIteration: () => {
    const { session } = get();
    if (!session) return;

    const currentIter = session.iterations[session.currentIteration];
    const nextIterNum = session.currentIteration + 1;

    if (!session.iterations[nextIterNum]) return;

    set({
      session: {
        ...session,
        lastActivityAt: Date.now(),
        currentIteration: nextIterNum,
        iterations: {
          ...session.iterations,
          [session.currentIteration]: {
            ...currentIter,
            isComplete: true,
          },
        },
      },
    });
  },

  toggleChecklistItem: (iterationNumber, itemId) => {
    const { session } = get();
    if (!session) return;
    const currentChecklist =
      session.iterations[iterationNumber].checklistState;
    set({
      session: {
        ...session,
        iterations: {
          ...session.iterations,
          [iterationNumber]: {
            ...session.iterations[iterationNumber],
            checklistState: {
              ...currentChecklist,
              [itemId]: !currentChecklist[itemId],
            },
          },
        },
      },
    });
  },

  completeIteration: (iterationNumber) => {
    const { session } = get();
    if (!session) return;
    set({
      session: {
        ...session,
        lastActivityAt: Date.now(),
        iterations: {
          ...session.iterations,
          [iterationNumber]: {
            ...session.iterations[iterationNumber],
            isComplete: true,
          },
        },
      },
    });
  },

  completeLab: () => {
    const { session } = get();
    if (!session) return;
    const updatedIterations = { ...session.iterations };
    updatedIterations[session.currentIteration] = {
      ...updatedIterations[session.currentIteration],
      isComplete: true,
    };
    set({
      session: {
        ...session,
        lastActivityAt: Date.now(),
        iterations: updatedIterations,
      },
    });
  },

  setAdditionalContext: (text, fileName) => {
    const { session } = get();
    if (!session) return;
    set({
      session: {
        ...session,
        lastActivityAt: Date.now(),
        additionalContext: text,
        additionalContextFileName: fileName,
      },
    });
  },

  resetSession: () => {
    set({ session: null });
  },
}),
    {
      name: 'guard-lab-session',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
