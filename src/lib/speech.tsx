import * as React from "react";

import { useLang } from "./i18n";

type SpeechCtx = {
  speak: (text: string, opts?: { locale?: string }) => void;
  stop: () => void;
  speaking: boolean;
  listening: boolean;
  supported: boolean;
  micSupported: boolean;
  startListening: (onResult: (text: string) => void) => void;
  stopListening: () => void;
  level: number;
};

const Ctx = React.createContext<SpeechCtx | null>(null);

type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: unknown) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): (new () => RecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => RecognitionLike;
    webkitSpeechRecognition?: new () => RecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function pickVoice(locale: string) {
  if (typeof window === "undefined") return undefined;
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  return (
    voices.find((v) => v.lang?.toLowerCase() === locale.toLowerCase()) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith(locale.slice(0, 2))) ??
    voices.find((v) => v.lang?.toLowerCase().startsWith("en-in")) ??
    undefined
  );
}

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const { speechLocale } = useLang();
  const [speaking, setSpeaking] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [level, setLevel] = React.useState(0);
  const recognitionRef = React.useRef<RecognitionLike | null>(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const micSupported = getRecognitionCtor() !== null;

  React.useEffect(() => {
    if (!supported) return;
    // Warm up the voice list so the first utterance already uses the right voice.
    window.speechSynthesis.getVoices();
  }, [supported]);

  const stop = React.useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = React.useCallback(
    (text: string, opts?: { locale?: string }) => {
      if (!text?.trim() || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const locale = opts?.locale ?? speechLocale;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;
      const voice = pickVoice(locale);
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [speechLocale],
  );

  const stopListening = React.useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
    setLevel(0);
  }, []);

  const startListening = React.useCallback(
    (onResult: (text: string) => void) => {
      const Ctor = getRecognitionCtor();
      if (!Ctor) return;
      stop();
      recognitionRef.current?.abort();

      const recognition = new Ctor();
      recognition.lang = speechLocale;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.onresult = (event: unknown) => {
        const e = event as {
          results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
        };
        let finalText = "";
        for (let i = 0; i < e.results.length; i++) {
          const result = e.results[i]!;
          const alt = result[0];
          if (result.isFinal && alt) finalText += alt.transcript;
        }
        setLevel(Math.random() * 0.6 + 0.4);
        if (finalText.trim()) {
          onResult(finalText.trim());
          setListening(false);
          setLevel(0);
        }
      };
      recognition.onerror = () => {
        setListening(false);
        setLevel(0);
      };
      recognition.onend = () => {
        setListening(false);
        setLevel(0);
      };
      recognitionRef.current = recognition;
      setListening(true);
      try {
        recognition.start();
      } catch {
        setListening(false);
      }
    },
    [speechLocale, stop],
  );

  const value = React.useMemo<SpeechCtx>(
    () => ({
      speak,
      stop,
      speaking,
      listening,
      supported,
      micSupported,
      startListening,
      stopListening,
      level,
    }),
    [speak, stop, speaking, listening, supported, micSupported, startListening, stopListening, level],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSpeech() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useSpeech must be used inside SpeechProvider");
  return ctx;
}
