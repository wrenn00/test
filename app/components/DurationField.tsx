"use client";

import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "../home/icons";

export default function DurationField({
  value,
  onChange,
  min = 5,
  max = 300,
  step = 5,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typing) inputRef.current?.select();
  }, [typing]);

  const commit = () => {
    const n = Number(draft.replace(/\D/g, ""));
    onChange(Math.min(max, Math.max(min, Number.isFinite(n) && n > 0 ? n : value)));
    setTyping(false);
  };

  return (
    <div className="flex items-center justify-between px-[18px] py-3.5 rounded-2xl bg-fill-subtle">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        className="w-11 h-11 rounded-full bg-bg grid place-items-center disabled:opacity-35"
        aria-label={`${step}분 줄이기`}
      >
        <svg width="16" height="2" viewBox="0 0 16 2" aria-hidden>
          <rect width="16" height="2" rx="1" fill="#191f28" />
        </svg>
      </button>

      {typing ? (
        <span className="flex items-baseline gap-1">
          <input
            ref={inputRef}
            autoFocus
            inputMode="numeric"
            value={draft}
            onChange={(e) => setDraft(e.target.value.replace(/\D/g, "").slice(0, 3))}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setTyping(false);
            }}
            className="w-[62px] bg-transparent text-[28px] font-extrabold leading-none text-center outline-none border-b-2 border-label"
          />
          <span className="text-[14px] font-medium text-label-subtle">분</span>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => {
            setDraft(String(value));
            setTyping(true);
          }}
          className="flex items-baseline gap-1 px-2 py-1"
          aria-label="시간 직접 입력"
        >
          <span className="text-[28px] font-extrabold leading-none">{value}</span>
          <span className="text-[14px] font-medium text-label-subtle">분</span>
        </button>
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
        className="w-11 h-11 rounded-full bg-bg grid place-items-center disabled:opacity-35"
        aria-label={`${step}분 늘리기`}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
