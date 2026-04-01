'use client';

import { Button } from '@/components/ui/Button';
import type { Phase } from '@/lib/types';

interface PhaseNavigationProps {
  currentPhase: Phase;
  currentIteration: number;
  totalIterations: number;
  isOptionalNext: boolean;
  isStreaming: boolean;
  onAdvancePhase: () => void;
  onSendToAI: () => void;
  onAdvanceIteration: () => void;
  onCompleteLab: () => void;
}

export function PhaseNavigation({
  currentPhase,
  currentIteration,
  totalIterations,
  isOptionalNext,
  isStreaming,
  onAdvancePhase,
  onSendToAI,
  onAdvanceIteration,
  onCompleteLab,
}: PhaseNavigationProps) {
  if (currentPhase === 'reflect') {
    return (
      <div className="pt-4 border-t border-guard-border">
        <Button onClick={onAdvancePhase} size="lg" className="w-full">
          Continue to Compose
        </Button>
      </div>
    );
  }

  if (currentPhase === 'compose') {
    return (
      <div className="pt-4 border-t border-guard-border">
        <Button onClick={onSendToAI} size="lg" className="w-full">
          Send to AI
        </Button>
      </div>
    );
  }

  if (currentPhase === 'generate') {
    return (
      <div className="pt-4 border-t border-guard-border">
        <div className="flex items-center justify-center gap-2 text-sm text-guard-blue-500">
          {isStreaming ? (
            <>
              <div className="w-2 h-2 rounded-full bg-guard-accent animate-pulse" />
              AI is generating a response...
            </>
          ) : (
            <Button onClick={onAdvancePhase} size="lg" className="w-full">
              Continue to Evaluate
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (currentPhase === 'evaluate') {
    const hasNextIteration = currentIteration < totalIterations;
    let actionButton = null;

    if (hasNextIteration) {
      actionButton = (
        <Button onClick={onAdvanceIteration} size="lg" className="w-full">
          {isOptionalNext
            ? `Continue to Iteration ${currentIteration + 1} (Optional)`
            : `Continue to Iteration ${currentIteration + 1}`}
        </Button>
      );
    } else {
      actionButton = (
        <Button onClick={onCompleteLab} size="lg" className="w-full">
          Complete Lab
        </Button>
      );
    }

    return (
      <div className="pt-4 border-t border-guard-border space-y-2">
        {actionButton}
      </div>
    );
  }

  return null;
}
