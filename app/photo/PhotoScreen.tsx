"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { labelOf, photosOf } from "../home/types";

export default function PhotoScreen({ day, initial }: { day: number; initial: number }) {
  const router = useRouter();
  const total = photosOf(day);
  const [index, setIndex] = useState(Math.min(initial, total - 1));

  return (
    <div className="relative h-full bg-label flex flex-col">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between text-white">
        <button type="button" onClick={() => router.push(`/day?d=${day}`)} className="w-11 h-11 -ml-3 grid place-items-center" aria-label="닫기">
          <svg width="18" height="18" viewBox="0 0 18 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M1 1l16 16M17 1L1 17" />
          </svg>
        </button>
        <span className="text-[14px] font-bold">
          {index + 1} / {total}
        </span>
        <button type="button" className="w-11 h-11 -mr-3 grid place-items-center" aria-label="더보기">
          <span className="flex flex-col gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-white" />
            ))}
          </span>
        </button>
      </div>

      <div className="relative flex-1">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] bg-fill-subtle" />
        {total > 1 && (
          <>
            <Arrow dir="left" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))} />
            <Arrow dir="right" disabled={index === total - 1} onClick={() => setIndex((i) => Math.min(total - 1, i + 1))} />
          </>
        )}
      </div>

      <div className="px-5 pb-9 flex flex-col gap-4">
        <span className="text-[14px] font-bold text-white">{labelOf(day)}</span>
        <div className="flex gap-2">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${i + 1}번째 사진`}
              className={`w-14 h-14 rounded-[10px] bg-fill-subtle ${i === index ? "ring-[2.5px] ring-white" : "opacity-45"}`}
            />
          ))}
          <button
            type="button"
            className="w-14 h-14 rounded-[10px] border-2 border-dashed border-white/40 grid place-items-center"
            aria-label="사진 추가"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M8 1v14M1 8h14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Arrow({ dir, disabled, onClick }: { dir: "left" | "right"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "이전 사진" : "다음 사진"}
      className={`absolute top-1/2 -translate-y-1/2 ${dir === "left" ? "left-3" : "right-3"} w-11 h-11 grid place-items-center disabled:opacity-25`}
    >
      <svg width="16" height="26" viewBox="0 0 16 26" fill="none" stroke="#191f28" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={dir === "left" ? "M12 1 2 13l10 12" : "M4 1l10 12L4 25"} />
      </svg>
    </button>
  );
}
