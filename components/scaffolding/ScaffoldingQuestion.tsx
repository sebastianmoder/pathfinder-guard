'use client';

import { cn } from '@/lib/utils';
import { TextArea } from '@/components/ui/TextArea';
import type { ScaffoldingQuestion as QuestionType } from '@/lib/types';

interface ScaffoldingQuestionProps {
  question: QuestionType;
  value: string;
  onChange: (value: string) => void;
  index: number;
}

export function ScaffoldingQuestion({
  question,
  value,
  onChange,
  index,
}: ScaffoldingQuestionProps) {
  return (
    <div className="group">
      <div className="flex items-start gap-3 mb-2">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-guard-blue-50 flex items-center justify-center mt-0.5">
          <span className="w-2 h-2 rounded-full bg-guard-blue-400" />
        </div>
        <label
          htmlFor={`question-${question.id}`}
          className="text-sm font-medium text-guard-blue-800 leading-relaxed"
        >
          {question.question}
        </label>
      </div>
      <div className="ml-9">
        <TextArea
          id={`question-${question.id}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className={cn(
            'min-h-[60px]',
            question.inputType === 'text' && 'min-h-[40px] resize-none'
          )}
        />
      </div>
    </div>
  );
}
