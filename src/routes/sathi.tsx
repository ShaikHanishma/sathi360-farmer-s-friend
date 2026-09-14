import { createFileRoute } from "@tanstack/react-router";
import { Mic, Send, Square, Trash2 } from "lucide-react";
import * as React from "react";

import { GlassCard, SectionTitle } from "@/components/ui-bits";
import { useLang } from "@/lib/i18n";
import { useSathi } from "@/lib/sathi-session";
import { useSpeech } from "@/lib/speech";

export const Route = createFileRoute("/sathi")({
  head: () => ({
    meta: [
      { title: "Sathi360 Voice Companion | Raithu Kavach" },
      {
        name: "description",
        content:
          "Ask Sathi360 anything about your crops, pests, weather or schemes by voice in Telugu, Hindi or English.",
      },
      { property: "og:title", content: "Sathi360 Voice Companion" },
      {
        property: "og:description",
        content: "Voice-first farming advice for Indian farmers in Telugu, Hindi and English.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SathiPage,
});

function SathiPage() {
  const { t } = useLang();
  const { turns, busy, error, ask, clear } = useSathi();
  const { listening, speaking, startListening, stopListening, stop, micSupported } = useSpeech();
  const [input, setInput] = React.useState("");
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns, busy]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    await ask(text);
  };

  return (
    <div>
      <SectionTitle
        title={t("sathiTitle")}
        subtitle={t("sathiHint")}
        icon={<Mic className="size-5" />}
      />

      <div className="space-y-3">
        <GlassCard className="text-sm leading-relaxed">{t("sathiWelcome")}</GlassCard>

        {turns.map((turn, i) => (
          <div
            key={i}
            className={`max-w-[88%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${
              turn.role === "user"
                ? "gold-gradient ml-auto rounded-br-md text-primary-foreground"
                : "glass rounded-bl-md"
            }`}
          >
            {turn.content}
          </div>
        ))}

        {busy ? (
          <div className="glass flex max-w-[60%] items-center gap-2 rounded-3xl rounded-bl-md px-4 py-3 text-sm">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="animate-wave h-4 w-1.5 rounded-full bg-primary"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
            {t("thinking")}
          </div>
        ) : null}

        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <div ref={endRef} />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={() => (listening ? stopListening() : startListening((p) => void ask(p)))}
          disabled={!micSupported}
          className={`grid size-14 shrink-0 place-items-center rounded-2xl gold-gradient text-primary-foreground shadow-lg disabled:opacity-50 ${
            listening ? "animate-pulse-glow" : ""
          }`}
          aria-label={t("speak")}
        >
          <Mic className="size-6" />
        </button>
        {speaking ? (
          <button
            onClick={stop}
            className="flex min-h-14 items-center gap-2 rounded-2xl bg-destructive px-4 text-sm font-semibold text-destructive-foreground"
          >
            <Square className="size-4" /> {t("stopSpeaking")}
          </button>
        ) : null}
        <form onSubmit={submit} className="flex flex-1 items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("typeHere")}
            className="min-h-14 w-full rounded-2xl bg-input/70 px-4 text-base outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"
            aria-label={t("send")}
          >
            <Send className="size-5" />
          </button>
        </form>
      </div>

      {turns.length ? (
        <button
          onClick={clear}
          className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Trash2 className="size-3.5" /> {t("cancel")}
        </button>
      ) : null}
      <p className="mt-2 text-center text-xs text-muted-foreground">{t("speak")}</p>
    </div>
  );
}
