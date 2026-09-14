import { useNavigate } from "@tanstack/react-router";
import { Mic, Square, X } from "lucide-react";
import * as React from "react";

import { useLang } from "@/lib/i18n";
import { useSathi } from "@/lib/sathi-session";
import { useSpeech } from "@/lib/speech";
import { matchVoiceCommand, type VoiceRoute } from "@/lib/voice-nav";

const opening: Record<string, Partial<Record<VoiceRoute, string>>> = {
  en: {
    "/": "Opening your home screen.",
    "/sathi": "I am listening.",
    "/crop": "Opening Crop Doctor.",
    "/weather": "Here is the weather.",
    "/market": "Here are today's market prices.",
    "/kavach": "Opening Cyber Kavach.",
    "/schemes": "Opening government schemes.",
    "/timeline": "Opening your history.",
    "/me": "Opening your profile.",
  },
  te: {
    "/": "హోమ్ స్క్రీన్ తెరుస్తున్నాను.",
    "/sathi": "నేను వింటున్నాను.",
    "/crop": "పంట డాక్టర్ తెరుస్తున్నాను.",
    "/weather": "వాతావరణ సమాచారం ఇదే.",
    "/market": "ఈ రోజు మార్కెట్ ధరలు ఇవే.",
    "/kavach": "సైబర్ కవచ్ తెరుస్తున్నాను.",
    "/schemes": "ప్రభుత్వ పథకాలు తెరుస్తున్నాను.",
    "/timeline": "మీ చరిత్ర తెరుస్తున్నాను.",
    "/me": "మీ వివరాలు తెరుస్తున్నాను.",
  },
  hi: {
    "/": "होम स्क्रीन खोल रहा हूँ।",
    "/sathi": "मैं सुन रहा हूँ।",
    "/crop": "फसल डॉक्टर खोल रहा हूँ।",
    "/weather": "मौसम की जानकारी यह है।",
    "/market": "आज के बाज़ार भाव ये हैं।",
    "/kavach": "साइबर कवच खोल रहा हूँ।",
    "/schemes": "सरकारी योजनाएँ खोल रहा हूँ।",
    "/timeline": "आपका इतिहास खोल रहा हूँ।",
    "/me": "आपकी जानकारी खोल रहा हूँ।",
  },
};

export function AiOrb() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const { listening, speaking, startListening, stopListening, stop, speak, micSupported } =
    useSpeech();
  const { ask, busy } = useSathi();
  const [bubble, setBubble] = React.useState<string | null>(null);
  const [heard, setHeard] = React.useState<string | null>(null);

  const handlePhrase = React.useCallback(
    async (phrase: string) => {
      setHeard(phrase);
      const route = matchVoiceCommand(phrase);
      if (route) {
        const line = opening[lang]?.[route] ?? opening["en"]![route]!;
        setBubble(line);
        speak(line);
        navigate({ to: route });
        window.setTimeout(() => setBubble(null), 3500);
        return;
      }
      setBubble(t("thinking"));
      const answer = await ask(phrase);
      setBubble(answer ?? t("errorGeneric"));
    },
    [ask, lang, navigate, speak, t],
  );

  const onMic = () => {
    if (listening) {
      stopListening();
      return;
    }
    if (!micSupported) {
      setBubble(t("micDenied"));
      return;
    }
    setHeard(null);
    setBubble(t("listening"));
    startListening((phrase) => void handlePhrase(phrase));
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex flex-col items-end gap-2 px-4">
      {bubble ? (
        <div className="glass pointer-events-auto max-w-[19rem] rounded-3xl rounded-br-md px-4 py-3 text-sm">
          {heard ? <p className="mb-1 text-xs text-primary">“{heard}”</p> : null}
          <p className="leading-snug">{bubble}</p>
          <div className="mt-2 flex gap-2">
            {speaking ? (
              <button
                onClick={stop}
                className="flex items-center gap-1 rounded-full bg-destructive/90 px-3 py-1 text-xs font-semibold text-destructive-foreground"
              >
                <Square className="size-3" /> {t("stopSpeaking")}
              </button>
            ) : null}
            <button
              onClick={() => setBubble(null)}
              className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      ) : null}

      <button
        onClick={onMic}
        aria-label={t("speak")}
        className={`pointer-events-auto relative grid size-16 place-items-center rounded-full gold-gradient text-primary-foreground shadow-2xl transition active:scale-95 ${
          listening || speaking || busy ? "animate-pulse-glow" : ""
        }`}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-primary-foreground/25 animate-spin-slow"
        />
        {listening ? (
          <span className="flex items-end gap-[3px]" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="animate-wave w-[3px] rounded-full bg-primary-foreground"
                style={{ height: 10 + (i % 3) * 8, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </span>
        ) : (
          <Mic className="size-7" />
        )}
      </button>
    </div>
  );
}
