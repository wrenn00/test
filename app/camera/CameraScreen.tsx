"use client";

import { useRouter } from "next/navigation";

export default function CameraScreen({ day, plan }: { day: number; plan?: string }) {
  const router = useRouter();
  const next = () =>
    router.push(`/record?d=${day}&shot=1${plan ? `&plan=${encodeURIComponent(plan)}` : ""}`);

  return (
    <div className="relative h-full bg-label flex flex-col">
      <div className="px-5 pt-14 h-[92px] flex items-center justify-between text-white">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center" aria-label="닫기">
          <svg width="18" height="18" viewBox="0 0 18 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M1 1l16 16M17 1L1 17" />
          </svg>
        </button>
        <span className="flex flex-col items-center gap-0.5">
          <span className="text-[14px] font-bold">{plan ?? "운동 기록"}</span>
          <span className="text-[11px] text-white/50">사진 한 장이면 충분해요</span>
        </span>
        <button type="button" className="w-11 h-11 -mr-3 grid place-items-center" aria-label="플래시">
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" aria-hidden>
            <path d="M9 1 1 12h6l-1 9 9-12H9z" />
          </svg>
        </button>
      </div>

      {/* 뷰파인더 */}
      <div className="relative flex-1">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[480px] bg-[#2b3038]" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[480px]">
          {[
            "left-6 top-6 border-l-2 border-t-2 rounded-tl-lg",
            "right-6 top-6 border-r-2 border-t-2 rounded-tr-lg",
            "left-6 bottom-6 border-l-2 border-b-2 rounded-bl-lg",
            "right-6 bottom-6 border-r-2 border-b-2 rounded-br-lg",
          ].map((c) => (
            <span key={c} className={`absolute w-8 h-8 border-white/40 ${c}`} />
          ))}
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="pb-10 px-8 flex items-center justify-between">
        <button type="button" onClick={next} className="w-12 h-12 rounded-[12px] bg-white/15 grid place-items-center" aria-label="앨범에서 고르기">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
            <rect x="1" y="1" width="20" height="18" rx="4" />
            <path d="M1 14l6-5 5 4 3-3 6 5" />
          </svg>
        </button>

        <button type="button" onClick={next} aria-label="촬영" className="w-[74px] h-[74px] rounded-full border-[3px] border-white grid place-items-center">
          <span className="w-[60px] h-[60px] rounded-full bg-white" />
        </button>

        <button type="button" className="w-12 h-12 rounded-full bg-white/15 grid place-items-center" aria-label="카메라 전환">
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 8a8 8 0 0 1 14-4M19 12a8 8 0 0 1-14 4" />
            <path d="M3 3v5h5M19 17v-5h-5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
