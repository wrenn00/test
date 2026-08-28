"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MISSION, PHOTO_DAYS, TODAY, type DayState, type Plan } from "./types";
import ScrollArea from "../components/ScrollArea";
import PlanSheet, { type PlanDraft } from "../components/PlanSheet";
import { store, useStore } from "../store";
import { BellIcon, CheckIcon, ChevronDown, ChevronUp, PlusIcon } from "./icons";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function HomeScreen({ initial }: { initial: DayState }) {
  const router = useRouter();
  const [state, setState] = useState<DayState>(initial);
  const [popup, setPopup] = useState(initial === "mission");
  const [collapsed, setCollapsed] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);
  const { plans: storePlans, recorded } = useStore();
  const [sheet, setSheet] = useState<{ mode: "add" } | { mode: "edit"; plan: Plan } | null>(null);

  const isDone = state === "done" || recorded;
  const photos = isDone ? [...PHOTO_DAYS, TODAY] : PHOTO_DAYS;
  const plans: Plan[] = state === "planned" || state === "done" || recorded ? storePlans : [];

  return (
    <div className="relative h-full flex flex-col bg-bg">
      <ScrollArea className="flex-1 pb-8">
        <div className="px-5 pt-14 h-[94px] flex items-center justify-between">
          <span className="text-[22px] font-extrabold tracking-tight">LOGO</span>
          <button type="button" onClick={() => router.push("/notifications")} aria-label="알림">
            <BellIcon />
          </button>
        </div>

        <div className="px-5 pt-6 pb-8 flex flex-col gap-6">
          <Summary count={photos.length} onMonth={() => setMonthOpen(true)} />
          <Calendar photos={photos} router={router} />
          {state === "mission" ? (
            <MissionCard onAccept={() => setState("planned")} onReject={() => setState("noplan")} />
          ) : (
            <TodayCard
              state={state}
              plans={plans}
              collapsed={collapsed}
              onToggle={() => setCollapsed((v) => !v)}
              onEdit={(p) => setSheet({ mode: "edit", plan: p })}
              onToggleDone={(p) =>
                p.done
                  ? router.push(`/day?d=${TODAY}`)
                  : router.push(`/record?d=${TODAY}&plan=${encodeURIComponent(p.name)}`)
              }
              onAddPlan={() => setSheet({ mode: "add" })}
            />
          )}
        </div>
      </ScrollArea>


      {monthOpen && <MonthSheet onClose={() => setMonthOpen(false)} />}

      {sheet && (
        <PlanSheet
          dateLabel="8월 27일"
          initial={
            sheet.mode === "edit"
              ? { name: sheet.plan.name, minutes: parseInt(sheet.plan.sub, 10) || 30, memo: "" }
              : undefined
          }
          onClose={() => setSheet(null)}
          onRecordNow={
            sheet.mode === "add"
              ? (d: PlanDraft) => {
                  store.addPlan({ name: d.name, sub: `${d.minutes}분`, done: false });
                  setSheet(null);
                  router.push(`/record?d=${TODAY}&plan=${encodeURIComponent(d.name)}`);
                }
              : undefined
          }
          onDelete={
            sheet.mode === "edit"
              ? () => {
                  store.removePlan(sheet.plan.name);
                  setSheet(null);
                }
              : undefined
          }
          onSubmit={(d: PlanDraft) => {
            const sub = d.memo ? `${d.memo} ${d.minutes}분` : `${d.minutes}분`;
            if (sheet.mode === "edit") {
              store.updatePlan(sheet.plan.name, { name: d.name, sub });
            } else {
              store.addPlan({ name: d.name, sub, done: false });
              if (state === "noplan") setState("planned");
            }
            setSheet(null);
          }}
        />
      )}

      {popup && <MissionPopup onClose={() => setPopup(false)} />}
    </div>
  );
}

function Summary({ count, onMonth }: { count: number; onMonth: () => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <button type="button" onClick={onMonth} className="flex items-center gap-1 text-[13px] font-medium text-label-subtle">
        2026년 8월
        <ChevronDown />
      </button>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[32px] font-extrabold leading-none">{count}</span>
        <span className="text-[15px] font-medium text-label-subtle">일 기록 / 이번 달</span>
      </div>
    </div>
  );
}

function Calendar({ photos, router }: { photos: number[]; router: ReturnType<typeof useRouter> }) {
  const cells: (number | null)[] = [...Array<null>(5).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        {WEEKDAYS.map((d) => (
          <div key={d} className="w-[43px] text-center text-[11px] font-bold text-label-disabled">
            {d}
          </div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="flex justify-between">
          {week.map((day, di) => {
            if (!day) return <div key={di} className="w-[43px] h-[60px]" />;
            const hasPhoto = photos.includes(day);
            const isToday = day === TODAY;
            const tone = hasPhoto || isToday ? "text-label" : day > TODAY ? "text-label-disabled" : "text-label-subtle";
            return (
              <button
                key={di}
                type="button"
                onClick={() => router.push(`/day?d=${day}`)}
                className="relative w-[43px] h-[60px]"
              >
                {hasPhoto && <div className="absolute inset-0 rounded-[8px] bg-fill-subtle" />}
                {isToday && (
                  <div className={`absolute inset-0 rounded-[8px] border-2 border-label ${hasPhoto ? "" : "border-dashed"}`} />
                )}
                <span className={`absolute left-1.5 top-1.5 text-[11px] ${hasPhoto || isToday ? "font-bold" : ""} ${tone}`}>
                  {day}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function TodayCard({
  state,
  plans,
  collapsed,
  onToggle,
  onEdit,
  onAddPlan,
  onToggleDone,
}: {
  state: DayState;
  plans: Plan[];
  collapsed: boolean;
  onToggle: () => void;
  onEdit: (p: Plan) => void;
  onAddPlan: () => void;
  onToggleDone: (p: Plan) => void;
}) {
  const doneCount = plans.filter((p) => p.done).length;
  const showList = plans.length > 0 && !collapsed;

  return (
    <div className="rounded-[20px] border border-line-normal bg-bg">
      <button type="button" onClick={onToggle} className="w-full px-5 pt-[18px] pb-3 flex items-center justify-between">
        <span className="text-[15px] font-bold">오늘의 운동</span>
        <span className="flex items-center gap-3">
          {plans.length > 0 && (
            <span className="text-[12px] font-bold text-label-subtle">
              {doneCount} / {plans.length}
            </span>
          )}
          <ChevronUp up={!collapsed} />
        </span>
      </button>

      {state === "noplan" && !collapsed && (
        <div className="flex flex-col items-center gap-1.5 pb-1.5">
          <span className="text-[14px] font-bold text-label-subtle">오늘 계획된 운동이 없어요</span>
          <span className="text-[11px] text-label-disabled">아래에서 계획을 세워보세요</span>
        </div>
      )}

      {!collapsed && (
        <div className="px-5 pb-1.5">
          {showList &&
            plans.map((p, i) => (
              <div key={p.name}>
                {i > 0 && <div className="h-px bg-line-subtle" />}
                <button type="button" onClick={() => onEdit(p)} className="w-full flex items-center gap-5 py-3 text-left">
                  <div className="w-10 h-10 rounded-[10px] bg-fill-subtle shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[14px] font-bold truncate ${p.done ? "line-through text-label-subtle" : ""}`}>
                      {p.name}
                    </div>
                    <div className="text-[11px] text-label-disabled truncate">{p.sub}</div>
                  </div>
                  {p.fromMission && (
                    <span className="px-2 py-1 rounded-md bg-fill-subtle text-[11px] font-bold text-label-subtle shrink-0">
                      미션
                    </span>
                  )}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={p.done ? "완료 취소" : "완료 표시"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleDone(p);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleDone(p);
                      }
                    }}
                    className={`w-7 h-7 -mr-0.5 rounded-full shrink-0 grid place-items-center cursor-pointer ${
                      p.done ? "bg-label" : "border border-line-strong"
                    }`}
                  >
                    {p.done && <CheckIcon />}
                  </span>
                </button>
              </div>
            ))}
          {showList && <div className="h-px bg-line-subtle" />}
          <button type="button" onClick={onAddPlan} className="w-full py-3 flex items-center gap-5">
            <span className="w-10 h-10 rounded-[10px] border-2 border-dashed border-line-strong grid place-items-center shrink-0">
              <PlusIcon />
            </span>
            <span className="text-[14px] font-bold text-label-subtle">운동 계획 추가</span>
          </button>
        </div>
      )}

      {plans.length === 0 && (
        <div className="px-5 pt-1.5 pb-5">
          <button type="button" onClick={onAddPlan} className="w-full py-4 rounded-[14px] bg-label text-white text-[14px] font-bold">
            운동 계획 추가
          </button>
        </div>
      )}
      {plans.length > 0 && <div className="pb-3" />}
    </div>
  );
}

function MissionCard({ onAccept, onReject }: { onAccept: () => void; onReject: () => void }) {
  return (
    <div className="rounded-[20px] border-[1.5px] border-label bg-bg">
      <div className="px-5 pt-[18px] pb-3 flex items-center justify-between">
        <span className="text-[15px] font-bold">오늘의 미션</span>
        <span className="px-2.5 py-1 rounded-full bg-label text-white text-[11px] font-bold tracking-wide">NEW</span>
      </div>
      <div className="px-5 pb-4 flex flex-col gap-2">
        <div className="text-[19px] font-extrabold">{MISSION.title}</div>
        <div className="flex gap-2">
          {MISSION.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg bg-fill-subtle text-[11px] font-bold text-label-subtle">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="h-px bg-line-subtle" />
      <div className="px-5 pt-4 pb-4 flex flex-col gap-1">
        <button type="button" onClick={onAccept} className="w-full py-4 rounded-[14px] bg-label text-white text-[15px] font-bold">
          이걸로 할게요
        </button>
        <button type="button" onClick={onReject} className="w-full pt-3 pb-1 text-[14px] font-bold text-label-disabled">
          오늘은 안 할래요
        </button>
      </div>
    </div>
  );
}

function MissionPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-20">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-label/50" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] rounded-3xl bg-bg px-6 pt-6 pb-5 flex flex-col items-center gap-6">
        <div className="relative w-[180px] h-[150px] rounded-2xl bg-fill-subtle">
          <svg className="absolute inset-0" width="180" height="150" aria-hidden>
            <line x1="0" y1="0" x2="180" y2="150" stroke="#e5e8eb" />
            <line x1="180" y1="0" x2="0" y2="150" stroke="#e5e8eb" />
          </svg>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-[15px] px-3.5 py-1.5 rounded-full bg-label text-white text-[11px] font-bold border-[3px] border-white whitespace-nowrap">
            오늘의 미션
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 pt-2.5">
          <span className="text-[19px] font-extrabold">{MISSION.title}</span>
          <span className="text-[13px] text-label-subtle">{MISSION.short}</span>
        </div>
        <button type="button" onClick={onClose} className="w-full py-4 rounded-[14px] bg-label text-white text-[15px] font-bold">
          확인했어요
        </button>
      </div>
    </div>
  );
}

function MonthSheet({ onClose }: { onClose: () => void }) {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="absolute inset-0 z-30">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-label/45" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-bg px-5 pt-2.5 pb-9">
        <div className="flex justify-center pb-3">
          <span className="w-10 h-1 rounded-full bg-line-strong" />
        </div>
        <div className="flex items-center justify-between pb-4">
          <button type="button" disabled className="w-11 h-11 grid place-items-center opacity-30" aria-label="이전 해">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 1 1 7l6 6" />
            </svg>
          </button>
          <span className="text-[16px] font-bold">2026년</span>
          <button type="button" disabled className="w-11 h-11 grid place-items-center opacity-30" aria-label="다음 해">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M1 1l6 6-6 6" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {months.map((m) => (
            <button
              key={m}
              type="button"
              onClick={onClose}
              className={`h-14 rounded-[14px] text-[14px] font-bold ${m === 8 ? "bg-label text-white" : "bg-fill-subtle"}`}
            >
              {m}월
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

