import * as React from "react";

import { LANGS, useLang, type Lang } from "@/lib/i18n";
import { useSpeech } from "@/lib/speech";
import { Particles } from "@/components/ui-bits";

const greetings: Record<Lang, string> = {
  en: "Welcome to Raithu Kavach Sathi360 AI. I am your farming and cyber safety helper. Choose your language.",
  te: "రైతు కవచ సాథి 360 AI కి స్వాగతం. నేను మీ వ్యవసాయ మరియు సైబర్ భద్రత సహాయకురాలిని. మీ భాషను ఎంచుకోండి.",
  hi: "रैतु कवच साथी 360 AI में आपका स्वागत है। मैं आपकी खेती और साइबर सुरक्षा सहायक हूँ। अपनी भाषा चुनें।",
};

const SESSION_KEY = "rk_splash_seen";

export function Splash({ onDone }: { onDone: () => void }) {
  const { setLang, t } = useLang();
  const { speak } = useSpeech();
  const [stage, setStage] = React.useState<"cinematic" | "language">("cinematic");
  const greetedRef = React.useRef(false);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setStage("language"), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  const greet = React.useCallback(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    speak(greetings.en, { locale: "en-IN" });
    window.setTimeout(() => speak(greetings.te, { locale: "te-IN" }), 4200);
  }, [speak]);

  React.useEffect(() => {
    if (stage !== "language") return;
    greet();
  }, [stage, greet]);

  const choose = (lang: Lang) => {
    setLang(lang);
    window.sessionStorage.setItem(SESSION_KEY, "1");
    const locale = LANGS.find((l) => l.code === lang)?.speech ?? "en-IN";
    speak(greetings[lang], { locale });
    onDone();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-background"
      onPointerDown={greet}
    >
      <Particles count={18} />
      <div
        aria-hidden
        className="animate-sunrise absolute -bottom-24 size-[36rem] rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, oklch(0.85 0.16 86 / 65%), oklch(0.62 0.13 148 / 25%) 55%, transparent 72%)",
        }}
      />
      <div className="relative z-10 w-full max-w-sm px-6 text-center">
        <div className="animate-bloom mx-auto grid size-28 place-items-center rounded-[2rem] gold-gradient shadow-2xl">
          <svg viewBox="0 0 24 24" className="size-16 text-primary-foreground" fill="currentColor">
            <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Z" opacity="0.35" />
            <path d="M12 6c-2 2.2-3 4.2-3 6a3 3 0 0 0 6 0c0-1.8-1-3.8-3-6Z" />
          </svg>
        </div>
        <h1 className="animate-bloom font-display mt-6 text-4xl leading-tight [animation-delay:200ms]">
          {t("appName")}
        </h1>
        <p className="animate-bloom text-primary [animation-delay:320ms] text-lg font-semibold tracking-wide">
          {t("appSub")}
        </p>
        <p className="animate-bloom mt-2 text-sm text-muted-foreground [animation-delay:420ms]">
          {t("tagline")}
        </p>

        {stage === "language" ? (
          <div className="animate-bloom mt-9">
            <p className="mb-3 text-base font-semibold">Choose your language</p>
            <div className="flex flex-col gap-3">
              {LANGS.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => choose(lang.code)}
                  className="glass ripple flex min-h-14 items-center justify-between rounded-2xl px-5 text-left transition active:scale-[0.98]"
                >
                  <span className="text-xl font-semibold">{lang.native}</span>
                  <span className="text-sm text-muted-foreground">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 flex justify-center gap-1.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="animate-wave h-8 w-1.5 rounded-full bg-primary"
                style={{ animationDelay: `${i * 110}ms` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function splashSeenThisSession() {
  if (typeof window === "undefined") return true;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}
