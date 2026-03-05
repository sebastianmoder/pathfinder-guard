'use client';

import { useEffect, useCallback } from 'react';
import { SplitPanel } from '@/components/layout/SplitPanel';
import { ScaffoldingPanel } from '@/components/scaffolding/ScaffoldingPanel';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { useLabSession } from '@/hooks/useLabSession';
import { useChat } from '@/hooks/useChat';
import { useHasHydrated } from '@/hooks/useSessionPersistence';
import { useChatStore } from '@/stores/chatStore';
import { useHistoryStore } from '@/stores/historyStore';
import { getLabConfig } from '@/content/labs';
import type { LabId } from '@/lib/types';

interface LabWorkspaceProps {
  labId: LabId;
}

export function LabWorkspace({ labId }: LabWorkspaceProps) {
  const hasHydrated = useHasHydrated();
  const { session, startLab } = useLabSession();
  const { messages, isStreaming, error, model, sendMessage } = useChat();
  const clearError = useCallback(() => useChatStore.getState().setError(null), []);
  const saveSession = useHistoryStore((s) => s.saveSession);

  // Initialize the lab session after hydration
  useEffect(() => {
    if (!hasHydrated) return;
    if (!session || session.labId !== labId) {
      const config = getLabConfig(labId);
      if (config) {
        startLab(labId, config.iterations.length);
      }
    }
  }, [labId, session, startLab, hasHydrated]);

  // Auto-save to history whenever there is meaningful progress
  useEffect(() => {
    if (!hasHydrated || !session || messages.length === 0) return;
    const config = getLabConfig(session.labId);
    const timer = setTimeout(() => {
      saveSession(
        config?.meta.title ?? session.labId,
        session,
        messages,
        config?.iterations.length ?? 3
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasHydrated, session, messages, saveSession]);

  // Show loading skeleton while hydrating from sessionStorage
  if (!hasHydrated) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-guard-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-guard-blue-400">Loading session...</p>
        </div>
      </div>
    );
  }

  const currentIteration = session?.currentIteration ?? 1;

  const handleSendToAI = (prompt: string) => {
    sendMessage(prompt, currentIteration);
  };

  // Show lab complete state
  const currentIterState = session?.iterations[currentIteration];
  const isLabComplete = currentIterState?.isComplete && !session?.iterations[currentIteration + 1];

  if (isLabComplete) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md px-8">
          <div className="w-16 h-16 rounded-full bg-guard-success/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-guard-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-guard-blue-900 mb-2">
            Lab Complete
          </h2>
          <p className="text-sm text-guard-blue-600 mb-6">
            You've completed all iterations of this lab. Review your chat
            history to reflect on how your prompts and the AI's responses
            evolved across iterations.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-guard-accent text-white px-6 py-2.5 text-sm font-medium hover:bg-guard-accent-hover transition-colors"
          >
            Back to Labs
          </a>
        </div>
      </div>
    );
  }

  return (
    <SplitPanel
      left={
        <ScaffoldingPanel
          onSendToAI={handleSendToAI}
          isStreaming={isStreaming}
          chatMessages={messages}
        />
      }
      right={
        <div className="relative h-full">
          <ChatPanel messages={messages} model={model} />
          {error && (
            <div className="absolute bottom-16 left-0 right-0 mx-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2 animate-fade-in-up">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="flex-1">{error}</span>
              <button
                onClick={clearError}
                className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
                aria-label="Dismiss error"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      }
    />
  );
}
