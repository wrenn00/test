"use client";

import { useState } from "react";
import { TODAY } from "../home/types";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function DateSheet({
  selected,
  onSelect,
  onClose,
}: {
  selected: number;
  onSelect: (day: number) => void;
  onClose: () => void;
}) {
  const [month] = useState(8);

  const cells: (number | null)[] = [...Array<null>(5).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  return (
    <div className="absolute inset-0 z-30">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-label/45" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-bg px-5 pt-2.5 pb-9">
        <div className="flex justify-center pb-3">
          <span className="w-10 h-1 rounded-full bg-line-strong" />
        </div>

        <div className="flex items-center justify-between pb-1">
          <span className="text-[15px] font-bold">언제 한 운동인가요</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <button type="button" className="w-9 h-9 grid place-items-center" aria-label="이전 달">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 1 1 7l6 6" />
            </svg>
          </button>
          <span className="text-[15px] font-bold">2026년 {month}월</span>
          <button type="button" disabled className="w-9 h-9 grid place-items-center opacity-30" aria-label="다음 달">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M1 1l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="flex justify-between pb-1">
          {WEEKDAYS.map((d) => (
            <span key={d} className="w-[43px] text-center text-[11px] font-bold text-label-disabled">
              {d}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex justify-between">
              {week.map((d, di) => {
                if (!d) return <span key={di} className="w-[43px] h-[43px]" />;
                const future = d > TODAY;
                const on = d === selected;
                return (
                  <button
                    key={di}
                    type="button"
                    disabled={future}
                    onClick={() => onSelect(d)}
                    className={`w-[43px] h-[43px] rounded-full text-[14px] grid place-items-center ${
                      on ? "bg-label text-white font-bold" : future ? "text-label-disabled" : "font-medium"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <p className="pt-3 text-[11px] text-label-disabled">앞으로 올 날짜에는 기록할 수 없어요.</p>
      </div>
    </div>
  );
}
