"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { labelOf, photosOf } from "../home/types";
import { useDragX } from "../components/useDragX";
import { ActionSheet, ConfirmDialog } from "../components/ActionSheet";

export default function PhotoScreen({ day, initial }: { day: number; initial: number }) {
  const router = useRouter();
  const total = photosOf(day);
  const [index, setIndex] = useState(Math.min(initial, total - 1));
  const [sheet, setSheet] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const { dx, dragging, handlers } = useDragX({
    onPrev: () => setIndex((i) => Math.max(0, i - 1)),
    onNext: () => setIndex((i) => Math.min(total - 1, i + 1)),
  });

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
        <button type="button" onClick={() => setSheet(true)} className="w-11 h-11 -mr-3 grid place-items-center" aria-label="더보기">
          <span className="flex flex-col gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-white" />
            ))}
          </span>
        </button>
      </div>

      <div className={`relative flex-1 select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`} {...handlers}>
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] bg-fill-subtle"
          style={{
            transform: `translateX(${dx * 0.6}px)`,
            transition: dragging ? "none" : "transform 240ms cubic-bezier(0.2,0,0,1)",
          }}
        />
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
            onClick={() => router.push(`/record?d=${day}&edit=1`)}
            className="w-14 h-14 rounded-[10px] border-2 border-dashed border-white/40 grid place-items-center"
            aria-label="사진 추가"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M8 1v14M1 8h14" />
            </svg>
          </button>
        </div>
      </div>

      {sheet && (
        <ActionSheet
          dark
          onClose={() => setSheet(false)}
          items={[
            { title: "사진 저장", desc: "이 사진 1장을 기기에 저장", onClick: () => setSheet(false) },
            { title: "대표 사진으로", desc: "달력에 이 사진이 보인다", onClick: () => setSheet(false) },
            {
              title: "사진 삭제",
              desc: "이 사진 1장만 지움. 기록은 남는다",
              onClick: () => {
                setSheet(false);
                setConfirm(true);
              },
            },
          ]}
        />
      )}

      {confirm && (
        <ConfirmDialog
          dark
          thumb
          title="이 사진을 삭제할까요?"
          body={
            <>
              남은 사진 {Math.max(0, total - 1)}장과 운동 내역은
              <br />
              그대로 있어요.
            </>
          }
          onCancel={() => setConfirm(false)}
          onConfirm={() => router.push(`/day?d=${day}`)}
        />
      )}
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
