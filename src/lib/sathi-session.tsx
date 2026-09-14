import { useServerFn } from "@tanstack/react-start";
import * as React from "react";

import { loadChat, logEvent, saveChat, type ChatTurn } from "./history";
import { useLang } from "./i18n";
import { askSathi } from "./sathi.functions";
import { useSpeech } from "./speech";
import { getProfileSnapshot } from "./store";

type Ctx = {
  turns: ChatTurn[];
  busy: boolean;
  error: string | null;
  ask: (question: string) => Promise<string | null>;
  clear: () => void;
};

const SathiCtx = React.createContext<Ctx | null>(null);

export function SathiProvider({ children }: { children: React.ReactNode }) {
  const { lang, t } = useLang();
  const { speak } = useSpeech();
  const call = useServerFn(askSathi);
  const [turns, setTurns] = React.useState<ChatTurn[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setTurns(loadChat());
  }, []);

  const ask = React.useCallback(
    async (question: string) => {
      const text = question.trim();
      if (!text || busy) return null;
      setError(null);
      const history = [...turns, { role: "user" as const, content: text }];
      setTurns(history);
      setBusy(true);
      try {
        const profile = getProfileSnapshot();
        const result = await call({
          data: {
            lang,
            messages: history.slice(-12),
            profile: {
              name: profile.name,
              village: profile.village,
              land: profile.land,
              crops: profile.crops,
            },
          },
        });
        const next = [...history, { role: "assistant" as const, content: result.text }];
        setTurns(next);
        saveChat(next);
        speak(result.text);
        logEvent({
          kind: "chat",
          title: text.slice(0, 60),
          detail: result.text.slice(0, 140),
        });
        return result.text;
      } catch {
        setError(t("errorGeneric"));
        return null;
      } finally {
        setBusy(false);
      }
    },
    [busy, turns, call, lang, speak, t],
  );

  const clear = React.useCallback(() => {
    setTurns([]);
    saveChat([]);
  }, []);

  const value = React.useMemo<Ctx>(
    () => ({ turns, busy, error, ask, clear }),
    [turns, busy, error, ask, clear],
  );

  return <SathiCtx.Provider value={value}>{children}</SathiCtx.Provider>;
}

export function useSathi() {
  const ctx = React.useContext(SathiCtx);
  if (!ctx) throw new Error("useSathi must be used inside SathiProvider");
  return ctx;
}
