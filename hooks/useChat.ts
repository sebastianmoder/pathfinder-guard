'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { useLabSessionStore } from '@/stores/labSessionStore';

export function useChat() {
  const messages = useChatStore((s) => s.messages);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const error = useChatStore((s) => s.error);
  const model = useChatStore((s) => s.model);
  const byokKey = useChatStore((s) => s.byokKey);
  const addUserMessage = useChatStore((s) => s.addUserMessage);
  const startStreaming = useChatStore((s) => s.startStreaming);
  const appendStreamChunk = useChatStore((s) => s.appendStreamChunk);
  const finishStreaming = useChatStore((s) => s.finishStreaming);
  const setError = useChatStore((s) => s.setError);

  const sendMessage = useCallback(
    async (prompt: string, iterationNumber: number) => {
      // Add user message
      addUserMessage(prompt, iterationNumber);

      // Start assistant streaming message
      const assistantId = startStreaming(iterationNumber);

      try {
        // Build conversation history for the API
        const allMessages = useChatStore.getState().messages;
        const apiMessages = allMessages
          .filter((m) => !m.isStreaming)
          .map((m) => ({ role: m.role, content: m.content }));

        // Prepend system message if additional context is set
        const additionalContext = useLabSessionStore.getState().session?.additionalContext;
        const systemMessages = additionalContext
          ? [{ role: 'system', content: `Additional course context provided by the educator:\n\n${additionalContext}` }]
          : [];

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...systemMessages, ...apiMessages],
            model,
            ...(byokKey ? { apiKey: byokKey } : {}),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `API error: ${response.status}`
          );
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;

            const data = trimmed.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.content) {
                appendStreamChunk(assistantId, parsed.content);
              }
            } catch (parseErr) {
              if (parseErr instanceof Error && parseErr.message !== 'Unexpected end of JSON input') {
                throw parseErr;
              }
              // Skip malformed SSE data
            }
          }
        }

        finishStreaming(assistantId);
      } catch (err) {
        finishStreaming(assistantId);
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [model, byokKey, addUserMessage, startStreaming, appendStreamChunk, finishStreaming, setError]
  );

  return {
    messages,
    isStreaming,
    error,
    model,
    sendMessage,
  };
}
