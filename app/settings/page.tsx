'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useChatStore } from '@/stores/chatStore';
import { DEFAULT_MODEL, BYOK_MODELS, DEFAULT_BYOK_MODEL } from '@/lib/constants';

const CUSTOM_SENTINEL = '__custom__';
const OR_KEY_RE = /^sk-or-v1-[a-f0-9]{64}$/;

type ModelEntry = { name: string; prompt: string; completion: string };
type ModelMap = Record<string, ModelEntry>;

function formatCost(entry: ModelEntry): string {
  const input = parseFloat(entry.prompt) * 1_000_000;
  const output = parseFloat(entry.completion) * 1_000_000;
  if (input === 0 && output === 0) return 'Free';
  return `$${input.toFixed(2)} / $${output.toFixed(2)} per 1M`;
}

function optionLabel(label: string, modelId: string, models: ModelMap | null, loading: boolean): string {
  if (loading || !models) return label;
  const m = models[modelId];
  if (!m) return label;
  return `${label}  ·  ${formatCost(m)}`;
}

export default function SettingsPage() {
  const byokKey = useChatStore((s) => s.byokKey);
  const model = useChatStore((s) => s.model);
  const setByokKey = useChatStore((s) => s.setByokKey);
  const setModel = useChatStore((s) => s.setModel);

  const [keyInput, setKeyInput] = useState(byokKey ?? '');
  const [keySaved, setKeySaved] = useState(false);

  const trimmedKey = keyInput.trim();
  const keyFormatValid = trimmedKey === '' || OR_KEY_RE.test(trimmedKey);
  const keyFormatError = trimmedKey !== '' && !keyFormatValid;

  // Pending model selection — not applied to the store until "Save Model" is clicked
  const isInitiallyCustom = byokKey !== null && !BYOK_MODELS.some((m) => m.id === model);
  const [isCustomMode, setIsCustomMode] = useState(() => isInitiallyCustom);
  const [pendingModelId, setPendingModelId] = useState(model);
  const [customInput, setCustomInput] = useState<string>(() => isInitiallyCustom ? model : '');
  const [modelSaved, setModelSaved] = useState(false);

  const [models, setModels] = useState<ModelMap | null>(null);
  const [pricingLoading, setPricingLoading] = useState(true);

  const dropdownValue = isCustomMode ? CUSTOM_SENTINEL : pendingModelId;

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/models');
        const json = await res.json();
        const map: ModelMap = {};
        for (const entry of (json.data ?? []) as Array<{
          id?: string;
          name?: string;
          pricing?: { prompt?: string; completion?: string };
        }>) {
          if (entry.id && entry.pricing) {
            map[entry.id] = {
              name: entry.name ?? entry.id,
              prompt: entry.pricing.prompt ?? '0',
              completion: entry.pricing.completion ?? '0',
            };
          }
        }
        setModels(map);
      } catch {
        setModels({});
      } finally {
        setPricingLoading(false);
      }
    }
    fetchPricing();
  }, []);

  // Derived save-ability
  const pendingEffectiveModel = isCustomMode ? customInput.trim() : pendingModelId;
  const customInCatalogue = isCustomMode && !pricingLoading && !!models?.[customInput.trim()];
  const hasChange = pendingEffectiveModel !== '' && pendingEffectiveModel !== model;
  const canSaveModel = hasChange && (!isCustomMode || customInCatalogue);

  const handleSaveKey = () => {
    const trimmed = keyInput.trim();
    const resetModel = trimmed ? DEFAULT_BYOK_MODEL : DEFAULT_MODEL;
    setByokKey(trimmed || null);
    setIsCustomMode(false);
    setPendingModelId(resetModel);
    setCustomInput('');
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleClearKey = () => {
    setKeyInput('');
    setByokKey(null);
    setIsCustomMode(false);
    setPendingModelId(DEFAULT_MODEL);
    setCustomInput('');
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleModelDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === CUSTOM_SENTINEL) {
      setIsCustomMode(true);
    } else {
      setIsCustomMode(false);
      setCustomInput('');
      setPendingModelId(val);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(e.target.value);
  };

  const handleSaveModel = () => {
    setModel(pendingEffectiveModel);
    setModelSaved(true);
    setTimeout(() => setModelSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-guard-blue-900 mb-2">
          Settings
        </h1>
        <p className="text-sm text-guard-blue-600 mb-8">
          Configure your API key and model preferences.
        </p>

        <Card>
          <h2 className="text-lg font-medium text-guard-blue-900 mb-1">
            OpenRouter API Key
          </h2>
          <p className="text-sm text-guard-blue-500 mb-4">
            Provide your own{' '}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-guard-blue-700"
            >
              OpenRouter API key
            </a>{' '}
            to choose from premium models instead of the default{' '}
            <strong>{DEFAULT_MODEL}</strong>. Your key is stored only in your
            browser&apos;s session storage and is never sent to our servers.
          </p>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="api-key"
                className="block text-sm font-medium text-guard-blue-700 mb-1.5"
              >
                API Key
              </label>
              <input
                id="api-key"
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="sk-or-v1-..."
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-guard-blue-900 placeholder:text-guard-blue-300 focus:outline-none focus:ring-2 focus:border-transparent ${keyFormatError ? 'border-red-400 focus:ring-red-300' : 'border-guard-border focus:ring-guard-accent'}`}
              />
              {keyFormatError && (
                <p className="mt-1 text-xs text-red-500">
                  Not a valid OpenRouter API key — expected format: <span className="font-mono">sk-or-v1-…</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleSaveKey} size="sm" disabled={keyFormatError}>
                Save Key
              </Button>
              {byokKey && (
                <Button onClick={handleClearKey} variant="ghost" size="sm">
                  Clear Key
                </Button>
              )}
              {keySaved && (
                <span className="text-sm text-guard-success">Saved!</span>
              )}
            </div>
          </div>

          {byokKey && (
            <div className="mt-5">
              <label
                htmlFor="model-select"
                className="block text-sm font-medium text-guard-blue-700 mb-1.5"
              >
                Model
              </label>

              <select
                id="model-select"
                value={dropdownValue}
                onChange={handleModelDropdownChange}
                className="w-full rounded-lg border border-guard-border bg-white px-3 py-2 text-sm text-guard-blue-900 focus:outline-none focus:ring-2 focus:ring-guard-accent focus:border-transparent"
              >
                {BYOK_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {optionLabel(m.label, m.id, models, pricingLoading)}
                  </option>
                ))}
                <option value={CUSTOM_SENTINEL}>
                  I want to choose my own OpenRouter model endpoint…
                </option>
              </select>

              {isCustomMode && (
                <div className="mt-2">
                  <input
                    id="custom-model-input"
                    type="text"
                    value={customInput}
                    onChange={handleCustomInputChange}
                    placeholder="e.g. mistralai/mistral-7b-instruct"
                    className="w-full rounded-lg border border-guard-border bg-white px-3 py-2 text-sm text-guard-blue-900 placeholder:text-guard-blue-300 focus:outline-none focus:ring-2 focus:ring-guard-accent focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-guard-blue-400">
                    Enter any model ID from{' '}
                    <a
                      href="https://openrouter.ai/models"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-guard-blue-600"
                    >
                      openrouter.ai/models
                    </a>
                  </p>
                  {(() => {
                    const trimmed = customInput.trim();
                    if (!trimmed || pricingLoading) return null;
                    const entry = models?.[trimmed];
                    if (!entry) return (
                      <p className="mt-2 text-xs text-guard-blue-400 italic">
                        Model not found in OpenRouter catalogue
                      </p>
                    );
                    return (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-guard-blue-800">{entry.name}</p>
                        <p className="text-xs text-guard-blue-500">{formatCost(entry)}</p>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="mt-3 flex items-center gap-3">
                <Button onClick={handleSaveModel} size="sm" disabled={!canSaveModel}>
                  Save Model
                </Button>
                {modelSaved && (
                  <span className="text-sm text-guard-success">Saved!</span>
                )}
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
