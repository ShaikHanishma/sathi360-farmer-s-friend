import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Leaf, MessageCircle, ShieldCheck, User, WifiOff } from "lucide-react";
import * as React from "react";

import { AiOrb } from "@/components/AiOrb";
import { Splash, splashSeenThisSession } from "@/components/Splash";
import { useOnline } from "@/lib/history";
import { hasStoredLang, useLang } from "@/lib/i18n";

const offlineText: Record<string, string> = {
  en: "Offline mode — saved chats and crop history still work",
  te: "ఆఫ్‌లైన్ మోడ్ — సేవ్ చేసిన సంభాషణలు, పంట చరిత్ర పనిచేస్తాయి",
  hi: "ऑफ़लाइन मोड — सहेजी बातचीत और फसल इतिहास चलते रहेंगे",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t, ready, lang } = useLang();
  const online = useOnline();
  const [showSplash, setShowSplash] = React.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  React.useEffect(() => {
    if (!ready) return;
    setShowSplash(!splashSeenThisSession() || !hasStoredLang());
  }, [ready]);

  const tabs = [
    { to: "/", label: t("navSathi") === "Sathi" ? "Home" : t("navSathi"), icon: Home },
    { to: "/sathi", label: t("sathiTitle"), icon: MessageCircle },
    { to: "/crop", label: t("navCrop"), icon: Leaf },
    { to: "/kavach", label: t("navKavach"), icon: ShieldCheck },
    { to: "/me", label: t("navMe"), icon: User },
  ] as const;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28">
      {!online ? (
        <div className="sticky top-0 z-30 flex items-center justify-center gap-2 bg-destructive/90 px-3 py-2 text-center text-xs font-semibold text-destructive-foreground">
          <WifiOff className="size-4 shrink-0" />
          {offlineText[lang] ?? offlineText["en"]}
        </div>
      ) : null}

      <main className="px-4 pt-5">{children}</main>

      <nav className="glass fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-md items-stretch justify-between rounded-t-3xl px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const active = pathname === tab.to;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`ripple flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.7rem] font-semibold transition ${
                active ? "bg-primary/15 text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`size-6 ${active ? "scale-110" : ""} transition`} />
              <span className="truncate">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <AiOrb />
      {showSplash ? <Splash onDone={() => setShowSplash(false)} /> : null}
    </div>
  );
}
