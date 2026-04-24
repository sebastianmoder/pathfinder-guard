'use client';

import { useRef, useState, useCallback } from 'react';
import { useLabSessionStore } from '@/stores/labSessionStore';

type UploadState = 'idle' | 'loading' | 'done' | 'error';
export type ContextUploadMode = 'general' | 'assignment' | 'curriculum';

interface ContextUploadSectionProps {
  mode?: ContextUploadMode;
}

export function ContextUploadSection({ mode = 'general' }: ContextUploadSectionProps) {
  const session = useLabSessionStore((s) => s.session);
  const setAdditionalContext = useLabSessionStore((s) => s.setAdditionalContext);

  const isRequiredUploadMode = mode === 'assignment' || mode === 'curriculum';
  const [isExpanded, setIsExpanded] = useState(isRequiredUploadMode);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasContext = !!(session?.additionalContext);
  const fileName = session?.additionalContextFileName ?? '';
  const uploadCopy: Record<ContextUploadMode, {
    panelTitle: string;
    collapsedLabel: string;
    helperText: string;
    activeText: string;
    removeTitle: string;
  }> = {
    general: {
      panelTitle: 'Add context document',
      collapsedLabel: 'Add context document (optional)',
      helperText:
        'Upload a curriculum excerpt, lecture notes, or any other document. The content will be shared with the AI as additional context.',
      activeText: 'Context document active - included in all AI requests',
      removeTitle: 'Remove context document',
    },
    assignment: {
      panelTitle: 'Upload existing assignment',
      collapsedLabel: 'Upload existing assignment',
      helperText:
        'Upload the assignment brief, instructions, or prompt students receive. The extracted text will be shared with the AI as the source assignment.',
      activeText: 'Assignment document active - included in all AI requests',
      removeTitle: 'Remove assignment document',
    },
    curriculum: {
      panelTitle: 'Upload existing curriculum',
      collapsedLabel: 'Upload existing curriculum',
      helperText:
        'Upload the syllabus, curriculum map, unit plan, program outline, or module sequence. The extracted text will be shared with the AI as the source curriculum.',
      activeText: 'Curriculum document active - included in all AI requests',
      removeTitle: 'Remove curriculum document',
    },
  };
  const copy = uploadCopy[mode];

  const processFile = useCallback(
    async (file: File) => {
      setUploadState('loading');
      setErrorMessage('');

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/parse-file', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? 'Failed to parse file');
        }

        setAdditionalContext(data.text, file.name);
        setUploadState('done');
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'Upload failed');
        setUploadState('error');
      }
    },
    [setAdditionalContext]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so the same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = () => {
    setAdditionalContext(null, null);
    setUploadState('idle');
    setErrorMessage('');
    setIsExpanded(isRequiredUploadMode);
  };

  if (hasContext) {
    return (
      <div className="mx-6 mt-4 rounded-lg border border-guard-accent/30 bg-guard-accent/5 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-guard-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs text-guard-blue-700 font-medium truncate flex-1" title={fileName}>
            {fileName}
          </span>
          <button
            onClick={handleRemove}
            className="shrink-0 text-guard-blue-400 hover:text-red-500 transition-colors"
            title={copy.removeTitle}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-guard-blue-500 mt-1 pl-6">{copy.activeText}</p>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="mx-6 mt-4">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-1.5 text-xs text-guard-blue-400 hover:text-guard-accent transition-colors group"
        >
          <svg className="w-3.5 h-3.5 group-hover:text-guard-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          {copy.collapsedLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-6 mt-4 rounded-lg border border-guard-blue-200 bg-guard-blue-50/50">
      <div className="flex items-center justify-between px-3 py-2 border-b border-guard-blue-100">
        <span className="text-xs font-medium text-guard-blue-700">{copy.panelTitle}</span>
        {!isRequiredUploadMode && (
          <button
            onClick={() => { setIsExpanded(false); setUploadState('idle'); setErrorMessage(''); }}
            className="text-guard-blue-400 hover:text-guard-blue-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-guard-blue-500 mb-2.5">
          {copy.helperText}
        </p>

        {uploadState === 'loading' ? (
          <div className="flex items-center gap-2 py-3 justify-center">
            <div className="w-4 h-4 border-2 border-guard-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-guard-blue-500">Extracting text...</span>
          </div>
        ) : (
          <div
            className={`relative border-2 border-dashed rounded-md py-4 px-3 text-center transition-colors cursor-pointer ${
              isDragging
                ? 'border-guard-accent bg-guard-accent/5'
                : 'border-guard-blue-200 hover:border-guard-accent/50 hover:bg-guard-blue-50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.md"
              className="sr-only"
              onChange={handleFileChange}
            />
            <svg className="w-6 h-6 text-guard-blue-300 mx-auto mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-xs text-guard-blue-500">
              <span className="font-medium text-guard-accent">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-guard-blue-400 mt-0.5">PDF, DOCX, TXT, MD — up to 20MB</p>
          </div>
        )}

        {uploadState === 'error' && (
          <p className="mt-2 text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
