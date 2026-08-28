"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { labelOf, photosOf, PHOTO_DAYS, TODAY } from "../home/types";
import { BackIcon, CameraIcon, PlusIcon } from "../home/icons";
import ScrollArea from "../components/ScrollArea";
import { useDragX } from "../components/useDragX";
import { ActionSheet, ConfirmDialog } from "../components/ActionSheet";

export default function DayScreen({ day }: { day: number }) {
  const router = useRouter();
  const kind: "record" | "empty" | "future" =
    day > TODAY ? "future" : PHOTO_DAYS.includes(day) ? "record" : "empty";
  const total = photosOf(day);
  const [index, setIndex] = useState(0);
  const [sheet, setSheet] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [plans, setPlans] = useState<string[][]>([["유산소", "한강 러닝 40분"], ["스트레칭", "자기 전 10분"]]);

  return (
    <div className="relative h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.push("/home?s=done")} className="w-11 h-11 -ml-3 grid place-items-center">
          <BackIcon />
        </button>
        <span className="text-[15px] font-bold">{labelOf(day)}</span>
        {kind === "record" ? (
          <button type="button" onClick={() => setSheet(true)} className="w-11 h-11 -mr-3 grid place-items-center" aria-label="더보기">
            <span className="flex flex-col gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-label" />
              ))}
            </span>
          </button>
        ) : (
          <span className="w-11 h-11" aria-hidden />
        )}
      </div>

      <ScrollArea className="flex-1 pb-6">
        {kind === "record" && (
          <>
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

              <button
                type="button"
                onClick={() => router.push(`/camera?d=${day}`)}
                className="w-full py-4 rounded-[14px] border border-line-strong text-[14px] font-bold"
              >
                사진 추가
              </button>
            </div>
          </>
        )}

        {kind === "empty" && (
          <div className="px-5 pt-6 flex flex-col gap-6">
            <div className="h-[280px] rounded-[20px] border-2 border-dashed border-line-strong flex flex-col items-center justify-center gap-3.5">
              <CameraIcon />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[15px] font-bold text-label-subtle">이 날은 기록이 없어요</span>
                <span className="text-[11px] text-label-disabled">지금 남겨도 이 날짜로 저장돼요</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-fill-subtle">
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] text-label-disabled">이 주에는</span>
                <span className="text-[14px] font-bold">3번 운동했어요</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 1, 0, 1, 0, 0, 0].map((on, i) => (
                  <span key={i} className={`w-2.5 h-2.5 rounded-[3px] ${on ? "bg-label" : "bg-line-normal"}`} />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push(`/camera?d=${day}`)}
              className="w-full py-4 rounded-[14px] bg-label text-white text-[15px] font-bold"
            >
              이 날 기록 추가하기
            </button>
          </div>
        )}

        {kind === "future" && (
          <div className="px-5 pt-6 flex flex-col gap-6">
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-fill-subtle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4e5968" strokeWidth="1.6" aria-hidden>
                <circle cx="8" cy="8" r="7" />
                <path d="M8 4v4.5l3 1.5" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] text-label-subtle">아직 오지 않은 날이에요. 계획만 세울 수 있어요</span>
            </div>

            <div className="rounded-[20px] border border-line-normal">
              <div className="px-5 pt-[18px] pb-1.5 flex items-center justify-between">
                <span className="text-[15px] font-bold">이 날의 계획</span>
                <span className="text-[11px] font-bold text-label-subtle">{plans.length}개</span>
              </div>
              <div className="px-5 pb-[18px]">
                {plans.map(([n, sub], i) => (
                  <div key={n}>
                    {i > 0 && <div className="h-px bg-line-subtle" />}
                    <div className="flex items-center gap-5 py-3">
                      <span className="w-10 h-10 rounded-[10px] bg-fill-subtle shrink-0" />
                      <span className="flex-1 min-w-0">
                        <span className="block text-[14px] font-bold truncate">{n}</span>
                        <span className="block text-[11px] text-label-disabled truncate">{sub}</span>
                      </span>
                      <button type="button" onClick={() => setPlans((v) => v.filter((x) => x[0] !== n))} className="w-6 h-6 grid place-items-center" aria-label="계획 삭제">
                        <svg width="12" height="12" viewBox="0 0 12 12" stroke="#aeb4bc" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                          <path d="M1 1l10 10M11 1L1 11" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
                <div className="h-px bg-line-subtle" />
                <button type="button" onClick={() => router.push(`/plan?d=${day}`)} className="w-full flex items-center gap-5 py-3">
                  <span className="w-10 h-10 rounded-[10px] border-2 border-dashed border-line-strong grid place-items-center shrink-0">
                    <PlusIcon />
                  </span>
                  <span className="text-[14px] font-bold text-label-subtle">운동 계획 추가</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-fill-subtle">
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-bold">이 날 알림 받기</span>
                <span className="text-[11px] text-label-disabled">오전 8시에 알려드려요</span>
              </div>
              <span className="w-12 h-7 rounded-full bg-label relative">
                <span className="absolute right-[3px] top-[3px] w-[22px] h-[22px] rounded-full bg-white" />
              </span>
            </div>
          </div>
        )}

      </ScrollArea>

      {sheet && (
        <ActionSheet
          onClose={() => setSheet(false)}
          items={[
            { title: "사진 저장", desc: "이 날 사진을 기기에 저장", onClick: () => setSheet(false) },
            {
              title: "기록 수정",
              desc: "운동, 시간, 느낌, 메모 고치기",
              onClick: () => {
                setSheet(false);
                router.push(`/record?d=${day}&edit=1`);
              },
            },
            {
              title: "기록 삭제",
              desc: "사진과 내역 전부 지움",
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
          title="이 기록을 삭제할까요?"
          body={
            <>
              사진 {total}장과 운동 내역이 함께 지워져요.
              <br />
              삭제하면 되돌릴 수 없어요.
            </>
          }
          onCancel={() => setConfirm(false)}
          onConfirm={() => router.push("/home?s=done")}
        />
      )}
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
    <div className="relative w-[375px] h-[330px] mt-6 mb-6 overflow-hidden select-none">
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
          <span className="absolute right-3 bottom-3 w-[34px] h-[34px] rounded-full bg-label/85 grid place-items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 0H0v5M0 0l6 6M11 16h5v-5M16 16l-6-6" />
            </svg>
          </span>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 flex items-center gap-1.5">
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
