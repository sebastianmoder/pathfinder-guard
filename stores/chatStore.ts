'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatMessage } from '@/lib/types';
import { DEFAULT_MODEL, DEFAULT_BYOK_MODEL } from '@/lib/constants';

const LEGACY_DEFAULT_MODEL = 'arcee-ai/trinity-large-preview:free';

interface ChatStore {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  model: string;
  byokKey: string | null;

  addUserMessage: (content: string, iterationNumber: number) => string;
  startStreaming: (iterationNumber: number) => string;
  appendStreamChunk: (messageId: string, chunk: string) => void;
  finishStreaming: (messageId: string) => void;
  setError: (error: string | null) => void;
  setModel: (model: string) => void;
  setByokKey: (key: string | null) => void;
  clearMessages: () => void;
  restoreMessages: (messages: ChatMessage[]) => void;
}

function generateId(): string {
  return crypto.randomUUID();
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
  messages: [],
  isStreaming: false,
  error: null,
  model: DEFAULT_MODEL,
  byokKey: null,

  addUserMessage: (content, iterationNumber) => {
    const id = generateId();
    const message: ChatMessage = {
      id,
      role: 'user',
      content,
      timestamp: Date.now(),
      iterationNumber,
    };
    set((state) => ({
      messages: [...state.messages, message],
    }));
    return id;
  },

  startStreaming: (iterationNumber) => {
    const id = generateId();
    const message: ChatMessage = {
      id,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      iterationNumber,
      isStreaming: true,
    };
    set((state) => ({
      messages: [...state.messages, message],
      isStreaming: true,
      error: null,
    }));
    return id;
  },

  appendStreamChunk: (messageId, chunk) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, content: m.content + chunk } : m
      ),
    }));
  },

  finishStreaming: (messageId) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, isStreaming: false } : m
      ),
      isStreaming: false,
    }));
  },

  setError: (error) => {
    set({ error, isStreaming: false });
  },

  setModel: (model) => {
    set({ model });
  },

  setByokKey: (key) => {
    set({
      byokKey: key,
      model: key ? DEFAULT_BYOK_MODEL : DEFAULT_MODEL,
    });
  },

  clearMessages: () => {
    set({ messages: [], error: null });
  },

  restoreMessages: (messages) => {
    set({ messages: messages.map((m) => ({ ...m, isStreaming: false })), error: null });
  },
}),
    {
      name: 'guard-chat',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        messages: state.messages,
        model: state.model,
        byokKey: state.byokKey,
      }),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<ChatStore>;
        const shouldUpgradeLegacyDefault =
          !persisted.byokKey && persisted.model === LEGACY_DEFAULT_MODEL;

        return {
          ...currentState,
          ...persisted,
          model: shouldUpgradeLegacyDefault
            ? DEFAULT_MODEL
            : persisted.model ?? currentState.model,
        };
      },
    }
  )
);
