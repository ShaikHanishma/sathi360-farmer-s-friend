import * as React from "react";

export type TimelineKind = "scan" | "weather" | "cyber" | "chat" | "sos";

export type TimelineEvent = {
  id: string;
  kind: TimelineKind;
  at: number;
  title: string;
  detail: string;
  tone?: "good" | "warn" | "bad";
};

const KEY = "rk_timeline";

function read(): TimelineEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as TimelineEvent[]) : [];
  } catch {
    return [];
  }
}

export function logEvent(event: Omit<TimelineEvent, "id" | "at">) {
  if (typeof window === "undefined") return;
  const next = [
    { ...event, id: Math.random().toString(36).slice(2), at: Date.now() },
    ...read(),
  ].slice(0, 60);
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("rk-timeline"));
}

export function useTimeline() {
  const [events, setEvents] = React.useState<TimelineEvent[]>([]);

  React.useEffect(() => {
    const sync = () => setEvents(read());
    sync();
    window.addEventListener("rk-timeline", sync);
    return () => window.removeEventListener("rk-timeline", sync);
  }, []);

  return events;
}

/* ----------------------------- saved conversation ---------------------------- */

export type ChatTurn = { role: "user" | "assistant"; content: string };
const CHAT_KEY = "rk_chat";

export function loadChat(): ChatTurn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CHAT_KEY);
    return raw ? (JSON.parse(raw) as ChatTurn[]) : [];
  } catch {
    return [];
  }
}

export function saveChat(turns: ChatTurn[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CHAT_KEY, JSON.stringify(turns.slice(-40)));
}

export function useOnline() {
  const [online, setOnline] = React.useState(true);

  React.useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return online;
}
