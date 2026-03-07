import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { LabCard } from "@/components/landing/LabCard";
import { labMetas } from "@/content/labs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-6">
        <HeroSection />
        <section className="pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labMetas.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        </section>

        {/* Model primer */}
        <section className="border-t border-guard-border pt-12 pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-guard-blue-900 mb-1">
              Which AI is powering these labs?
            </h2>
            <p className="text-sm text-guard-blue-500 mb-6">
              A quick guide to the AI model used here and how to change it.
            </p>

            {/* Default model */}
            <div className="bg-guard-surface border border-guard-border rounded-xl p-5 mb-4">
              <p className="text-sm font-semibold text-guard-blue-800 mb-1">
                Default model — no account needed
              </p>
              <p className="text-sm text-guard-blue-600 leading-relaxed">
                Out of the box, GUARD currently uses{" "}
                <strong>Trinity Large Preview</strong> by Arcee AI — a free
                model that requires no sign-up or API key. It is a capable
                general-purpose AI suitable for all labs.
              </p>
            </div>

            {/* Why BYOK */}
            <div className="bg-guard-surface border border-guard-border rounded-xl p-5 mb-4">
              <p className="text-sm font-semibold text-guard-blue-800 mb-1">
                Why don&apos;t you just use ChatGPT?
              </p>
              <p className="text-sm text-guard-blue-600 leading-relaxed mb-2">
                Every time you send a prompt to an AI model like ChatGPT or
                Claude, the company behind it charges a small fee — often just a
                fraction of a cent. That sounds negligible, but with hundreds or
                thousands of users each running multiple lab iterations, those
                fractions add up to substantial costs very quickly.
              </p>
              <p className="text-sm text-guard-blue-600 leading-relaxed">
                PATHFINDER is an{" "}
                <strong>Erasmus+ funded educational project</strong>, and our
                budget simply cannot cover frontier AI models for every user. By
                bringing your own API key, you can unlock a wide variety of
                models while only paying for what you use — typically a few
                cents per lab session — while keeping the platform free and
                accessible for everyone.
              </p>
            </div>

            {/* How to change */}
            <div className="bg-guard-surface border border-guard-border rounded-xl p-5 mb-4">
              <p className="text-sm font-semibold text-guard-blue-800 mb-1">
                How do I get started with a premium model?
              </p>
              <p className="text-sm text-guard-blue-600 leading-relaxed mb-3">
                GUARD connects to AI models through a service called{" "}
                <strong>OpenRouter</strong> — think of it as a single gateway
                that lets you access many different AI systems from one place.
                Here is what to do:
              </p>
              <ol className="text-sm text-guard-blue-600 list-decimal list-inside space-y-1 mb-3">
                <li>
                  Create a free account at{" "}
                  <a
                    href="https://openrouter.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-guard-blue-800"
                  >
                    openrouter.ai
                  </a>
                  .
                </li>
                <li>
                  Add a small amount of credit to your account (a few dollars is
                  more than enough for many sessions).
                </li>
                <li>Generate an API key in your OpenRouter dashboard.</li>
                <li>
                  Paste the key into the{" "}
                  <Link
                    href="/settings"
                    className="underline hover:text-guard-blue-800"
                  >
                    Settings
                  </Link>{" "}
                  page and choose a model.
                </li>
              </ol>
              <p className="text-xs text-guard-blue-400">
                Your API key is stored only in your browser and is never sent to
                our servers. Usage fees are billed directly to your OpenRouter
                account — GUARD never handles your payment information.
              </p>
            </div>

            {/* Available models */}
            <div className="bg-guard-surface border border-guard-border rounded-xl p-5">
              <p className="text-sm font-semibold text-guard-blue-800 mb-3">
                Models available with an OpenRouter key
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    provider: "Arcee AI",
                    model: "Trinity Large Preview",
                    note: "Free",
                  },
                  {
                    provider: "Mistral AI",
                    model: "Mistral Small 3.2 24B",
                    note: "Paid",
                  },
                  { provider: "MiniMax", model: "MiniMax M2.5", note: "Paid" },
                  { provider: "OpenAI", model: "GPT-5.4", note: "Paid" },
                  {
                    provider: "Anthropic",
                    model: "Claude Opus 4.6",
                    note: "Paid",
                  },
                  {
                    provider: "Anthropic",
                    model: "Claude Sonnet 4.6",
                    note: "Paid",
                  },
                  {
                    provider: "Google",
                    model: "Gemini 2.5 Flash",
                    note: "Paid",
                  },
                  { provider: "Meta", model: "Llama 4 Maverick", note: "Paid" },
                ].map(({ provider, model, note }) => (
                  <div
                    key={model}
                    className="flex items-center justify-between rounded-lg bg-guard-bg px-3 py-2"
                  >
                    <div>
                      <span className="text-sm text-guard-blue-800 font-medium">
                        {model}
                      </span>
                      <span className="text-xs text-guard-blue-400 ml-1.5">
                        by {provider}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        note === "Free"
                          ? "bg-guard-success/10 text-guard-success"
                          : "bg-guard-blue-50 text-guard-blue-400"
                      }`}
                    >
                      {note}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-guard-blue-400 mt-3">
                You can also enter any other model available on OpenRouter — the
                full catalogue is at{" "}
                <a
                  href="https://openrouter.ai/models"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-guard-blue-600"
                >
                  openrouter.ai/models
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
