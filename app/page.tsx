import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center py-10 px-4">
      <Link
        href="/onboarding"
        className="relative w-[375px] h-[812px] bg-bg rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col items-center justify-center gap-3.5 pb-16"
      >
        <span className="w-[88px] h-[88px] rounded-3xl bg-fill-subtle grid place-items-center">
          <svg width="88" height="88" aria-hidden>
            <line x1="0" y1="0" x2="88" y2="88" stroke="#e5e8eb" />
            <line x1="88" y1="0" x2="0" y2="88" stroke="#e5e8eb" />
          </svg>
        </span>
        <span className="text-[22px] font-extrabold tracking-tight">LOGO</span>
      </Link>
    </main>
  );
}
