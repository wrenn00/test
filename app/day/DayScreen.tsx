"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { labelOf, photosOf } from "../home/types";
import { BackIcon } from "../home/icons";
import ScrollArea from "../components/ScrollArea";
import { useDragX } from "../components/useDragX";

export default function DayScreen({ day }: { day: number }) {
  const router = useRouter();
  const total = photosOf(day);
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.push("/home?s=done")} className="w-11 h-11 -ml-3 grid place-items-center">
          <BackIcon />
        </button>
        <span className="text-[15px] font-bold">{labelOf(day)}</span>
        <button type="button" className="w-11 h-11 -mr-3 grid place-items-center" aria-label="더보기">
          <span className="flex flex-col gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-label" />
            ))}
          </span>
        </button>
      </div>

      <ScrollArea className="flex-1 pb-6">
        <div className="px-5 flex items-center justify-between text-[12px] font-bold text-label-subtle">
          <button type="button" onClick={() => router.push(`/day?d=${Math.max(1, day - 1)}`)}>
            ‹ 8월 {day - 1}일
          </button>
          <button type="button" onClick={() => router.push(`/day?d=${Math.min(31, day + 1)}`)}>
            8월 {day + 1}일 ›
          </button>
        </div>

        <Carousel day={day} total={total} index={index} setIndex={setIndex} onOpen={() => router.push(`/photo?d=${day}&i=${index}`)} />

        <div className="px-5 flex flex-col gap-6">
          <div className="rounded-[20px] border border-line-normal">
            <div className="px-5 pt-[18px] pb-1.5 flex items-center justify-between">
              <span className="text-[15px] font-bold">기록</span>
              <span className="text-[11px] text-label-disabled">오후 7:20</span>
            </div>
            <div className="px-5 pb-[18px]">
              {[["운동", "유산소"], ["시간", "32분"], ["느낌", "적당했어요"]].map(([k, v], i) => (
                <div key={k}>
                  {i > 0 && <div className="h-px bg-line-subtle" />}
                  <div className="flex items-center justify-between py-3">
                    <span className="text-[14px] font-medium text-label-subtle">{k}</span>
                    <span className="text-[14px] font-bold">{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] bg-fill-subtle px-5 py-[18px] flex flex-col gap-2.5">
            <span className="text-[11px] font-bold text-label-disabled">메모</span>
            <span className="text-[14px] leading-relaxed">한강 따라 걸었다. 바람이 선선해서 생각보다 오래 걸음.</span>
          </div>

          <button type="button" className="w-full py-4 rounded-[14px] border border-line-strong text-[14px] font-bold">
            사진 추가
          </button>
        </div>
      </ScrollArea>
    </div>
  );
}

function Carousel({
  day,
  total,
  index,
  setIndex,
  onOpen,
}: {
  day: number;
  total: number;
  index: number;
  setIndex: (i: number) => void;
  onOpen: () => void;
}) {
  const { dx, dragging, handlers, didMove } = useDragX({
    onPrev: () => setIndex(Math.max(0, index - 1)),
    onNext: () => setIndex(Math.min(total - 1, index + 1)),
  });

  return (
    <div className="relative w-[375px] h-[300px] my-6 overflow-hidden select-none">
      <div
        {...handlers}
        onClick={() => {
          if (!didMove()) onOpen();
        }}
        className={`absolute inset-0 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{
          transform: `translateX(${dx * 0.6}px)`,
          transition: dragging ? "none" : "transform 240ms cubic-bezier(0.2,0,0,1)",
        }}
      >
        <div className="absolute left-[-190px] top-[26px] w-[240px] h-[248px] rounded-[20px] bg-fill-subtle opacity-50" />
        <div className="absolute left-[325px] top-[26px] w-[240px] h-[248px] rounded-[20px] bg-fill-subtle opacity-50" />
        <div className="absolute left-16 top-1.5 w-[247px] h-[288px] rounded-[20px] bg-fill-subtle">
          <span className="absolute right-3 top-3 px-2.5 py-1 rounded-full bg-label text-white text-[11px] font-bold">
            {index + 1} / {total}
          </span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${i + 1}번째 사진`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-[18px] bg-label" : "w-1.5 bg-line-strong"}`}
          />
        ))}
      </div>
      <span className="sr-only">{day}일 사진</span>
    </div>
  );
}
