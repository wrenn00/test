"use client";

import { useRouter } from "next/navigation";
import { ChatIcon, HomeIcon, PersonIcon } from "../home/icons";

const TABS = [
  { key: "home", label: "홈", href: "/home" },
  { key: "chat", label: "채팅", href: "/chat" },
  { key: "my", label: "마이", href: "/my" },
] as const;

export default function TabBar({ active }: { active: "home" | "chat" | "my" }) {
  const router = useRouter();
  return (
    <nav className="absolute bottom-0 inset-x-0 h-[98px] flex bg-white/70 backdrop-blur-xl border-t border-white/60">
      {TABS.map((t) => {
        const on = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => router.push(t.href)}
            className="flex-1 flex flex-col items-center pt-3 gap-1.5"
          >
            {t.key === "home" ? <HomeIcon active={on} /> : t.key === "chat" ? <ChatIcon active={on} /> : <PersonIcon active={on} />}
            <span className={`text-[11px] font-bold ${on ? "text-label" : "text-label-disabled"}`}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
