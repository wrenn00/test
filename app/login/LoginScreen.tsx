import Link from "next/link";

const PROVIDERS = [
  {
    key: "kakao",
    label: "카카오로 시작하기",
    className: "bg-kakao text-kakao-ink",
    logo: <KakaoLogo />,
  },
  {
    key: "apple",
    label: "Apple로 시작하기",
    className: "bg-black text-white",
    logo: <AppleLogo />,
  },
  {
    key: "google",
    label: "Google로 시작하기",
    className: "bg-white text-[#1f1f1f] border border-line-normal",
    logo: <GoogleLogo />,
  },
];

export default function LoginScreen() {
  return (
    <div className="relative h-full flex flex-col">
      <section className="px-6 pt-[175px] flex flex-col items-center">
        <div className="w-40 h-40 rounded-full bg-fill-subtle" aria-hidden />
        <h1 className="mt-5 text-[26px] font-extrabold tracking-tight">찌뿌두둥</h1>
        <p className="mt-2 text-[14px] text-label-subtle">작은 움직임도 운동이에요</p>
      </section>

      <section className="mt-auto px-6 pb-[72px] flex flex-col gap-2.5">
        {PROVIDERS.map((p) => (
          <Link
            key={p.key}
            href="/home"
            className={`h-[52px] w-full rounded-[12px] flex items-center px-4 ${p.className}`}
          >
            <span className="w-6 h-6 grid place-items-center shrink-0">{p.logo}</span>
            <span className="flex-1 text-center text-[15px] font-bold">{p.label}</span>
            <span className="w-6 h-6 shrink-0" aria-hidden />
          </Link>
        ))}
      </section>
    </div>
  );
}

function KakaoLogo() {
  return (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="#191600" aria-hidden>
      <path d="M10 0C4.48 0 0 3.52 0 7.86c0 2.79 1.85 5.24 4.63 6.62l-1.1 4.06c-.1.36.3.65.62.45l4.83-3.2c.33.03.67.05 1.02.05 5.52 0 10-3.52 10-7.86S15.52 0 10 0Z" />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="#fff" aria-hidden>
      <path d="M14.9 11.6c-.02-2.5 2.04-3.7 2.13-3.76-1.16-1.7-2.97-1.93-3.61-1.96-1.54-.16-3 .9-3.78.9-.78 0-1.98-.88-3.26-.86-1.68.03-3.23.98-4.09 2.48-1.74 3.02-.44 7.5 1.25 9.95.83 1.2 1.81 2.55 3.1 2.5 1.25-.05 1.72-.81 3.23-.81 1.5 0 1.93.81 3.25.78 1.34-.02 2.19-1.22 3.01-2.43.95-1.39 1.34-2.74 1.36-2.81-.03-.01-2.6-1-2.62-3.98ZM12.4 4.2c.69-.83 1.15-1.99 1.02-3.15-.99.04-2.19.66-2.9 1.49-.63.73-1.19 1.9-1.04 3.03 1.1.09 2.23-.56 2.92-1.37Z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <path fill="#4285F4" d="M19.6 10.23c0-.71-.06-1.39-.18-2.05H10v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.35Z" />
      <path fill="#34A853" d="M10 20c2.7 0 4.96-.9 6.61-2.42l-3.23-2.5c-.9.6-2.05.95-3.38.95-2.6 0-4.8-1.75-5.59-4.11H1.07v2.58A10 10 0 0 0 10 20Z" />
      <path fill="#FBBC05" d="M4.41 11.92a6 6 0 0 1 0-3.83V5.51H1.07a10 10 0 0 0 0 8.98l3.34-2.57Z" />
      <path fill="#EA4335" d="M10 3.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86C14.96.99 12.7 0 10 0A10 10 0 0 0 1.07 5.51l3.34 2.58C5.2 5.73 7.4 3.98 10 3.98Z" />
    </svg>
  );
}
