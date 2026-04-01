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
        let didReceiveDone = false;
        let finishReason: string | null = null;

        const processLine = (line: string) => {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) return;

          const data = trimmed.slice(6);
          if (data === '[DONE]') {
            didReceiveDone = true;
            return;
          }

          try {
            const parsed = JSON.parse(data) as {
              error?: string;
              content?: string;
              finishReason?: string;
            };

            if (parsed.error) {
              throw new Error(parsed.error);
            }

            if (parsed.content) {
              appendStreamChunk(assistantId, parsed.content);
            }

            if (parsed.finishReason) {
              finishReason = parsed.finishReason;
            }
          } catch (parseErr) {
            if (
              parseErr instanceof Error &&
              parseErr.message !== 'Unexpected end of JSON input'
            ) {
              throw parseErr;
            }
            // Skip malformed SSE data
          }
        };

        const processBuffer = (flush = false) => {
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            processLine(line);
          }

          if (flush) {
            const trailing = buffer.trim();
            if (trailing) {
              processLine(trailing);
            }
            buffer = '';
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          processBuffer();
        }

        buffer += decoder.decode();
        processBuffer(true);

        if (!didReceiveDone) {
          throw new Error('The response stream ended unexpectedly before completion.');
        }

        finishStreaming(assistantId);

        if (finishReason === 'length') {
          setError('The model stopped because it hit an output limit. The response may be truncated.');
        } else if (finishReason === 'content_filter') {
          setError('The model output was stopped by a content filter.');
        } else if (finishReason === 'error') {
          setError('The upstream model reported an error while streaming the response.');
        }
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
