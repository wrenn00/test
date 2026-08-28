"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_PLANS, MISSION, PHOTO_DAYS, TODAY, type DayState, type Plan } from "./types";
import { BellIcon, ChatIcon, ChevronDown, ChevronUp, CheckIcon, CloseIcon, HomeIcon, PersonIcon, PlusIcon } from "./icons";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function HomeScreen({ initial }: { initial: DayState }) {
  const router = useRouter();
  const [state, setState] = useState<DayState>(initial);
  const [popup, setPopup] = useState(initial === "mission");
  const [collapsed, setCollapsed] = useState(false);

  const photos = state === "done" ? [...PHOTO_DAYS, TODAY] : PHOTO_DAYS;
  const plans: Plan[] =
    state === "planned"
      ? BASE_PLANS
      : state === "done"
      ? BASE_PLANS.map((p, i) => (i === 0 ? { ...p, done: true } : p))
      : [];

  return (
    <div className="relative h-full flex flex-col bg-bg">
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 pt-14 h-[94px] flex items-center justify-between">
          <span className="text-[22px] font-extrabold tracking-tight">LOGO</span>
          <BellIcon />
        </div>

        <div className="px-5 pt-6 pb-8 flex flex-col gap-6">
          <Summary count={photos.length} />
          <Calendar photos={photos} />
          {state === "mission" ? (
            <MissionCard onAccept={() => setState("planned")} onReject={() => setState("noplan")} />
          ) : (
            <TodayCard
              state={state}
              plans={plans}
              collapsed={collapsed}
              onToggle={() => setCollapsed((v) => !v)}
              onRecord={() => router.push("/record")}
            />
          )}
        </div>
      </div>

      <BottomNav />

      {popup && (
        <MissionPopup
          onAccept={() => {
            setState("planned");
            setPopup(false);
          }}
          onReject={() => {
            setState("noplan");
            setPopup(false);
          }}
          onClose={() => setPopup(false)}
        />
      )}
    </div>
  );
}

function Summary({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <button type="button" className="flex items-center gap-1 text-[13px] font-medium text-label-subtle">
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

function Calendar({ photos }: { photos: number[] }) {
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
              <div key={di} className="relative w-[43px] h-[60px]">
                {hasPhoto && <div className="absolute inset-0 rounded-[8px] bg-fill-subtle" />}
                {isToday && (
                  <div className={`absolute inset-0 rounded-[8px] border-2 border-label ${hasPhoto ? "" : "border-dashed"}`} />
                )}
                <span className={`absolute left-1.5 top-1.5 text-[11px] ${hasPhoto || isToday ? "font-bold" : ""} ${tone}`}>
                  {day}
                </span>
              </div>
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
  onRecord,
}: {
  state: DayState;
  plans: Plan[];
  collapsed: boolean;
  onToggle: () => void;
  onRecord: () => void;
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
                <div className="flex items-center gap-5 py-3">
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
                    className={`w-6 h-6 rounded-full shrink-0 grid place-items-center ${
                      p.done ? "bg-label" : "border border-line-strong"
                    }`}
                  >
                    {p.done && <CheckIcon />}
                  </span>
                </div>
              </div>
            ))}
          {showList && <div className="h-px bg-line-subtle" />}
          <button type="button" className="w-full py-3 flex items-center gap-5">
            <span className="w-10 h-10 rounded-[10px] border-2 border-dashed border-line-strong grid place-items-center shrink-0">
              <PlusIcon />
            </span>
            <span className="text-[14px] font-bold text-label-subtle">운동 계획 추가</span>
          </button>
        </div>
      )}

      <div className="px-5 pt-1.5 pb-5">
        <button type="button" onClick={onRecord} className="w-full py-4 rounded-[14px] bg-label text-white text-[14px] font-bold">
          운동 기록하기
        </button>
      </div>
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
      <div className="px-5 py-3.5 flex flex-col gap-1">
        <span className="text-[11px] font-bold text-label-disabled">왜 이 미션인가요</span>
        <span className="text-[11px] text-label-subtle leading-relaxed">
          {MISSION.reason[0]}
          <br />
          {MISSION.reason[1]}
        </span>
      </div>
      <div className="h-px bg-line-subtle" />
      <div className="px-5 py-4 flex gap-2.5">
        <button type="button" onClick={onReject} className="flex-1 py-3.5 rounded-[14px] border border-line-strong text-[14px] font-bold">
          오늘은 안 할래요
        </button>
        <button type="button" onClick={onAccept} className="flex-1 py-3.5 rounded-[14px] bg-label text-white text-[14px] font-bold">
          이걸로 할게요
        </button>
      </div>
    </div>
  );
}

function MissionPopup({
  onAccept,
  onReject,
  onClose,
}: {
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-20">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-label/50" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] rounded-3xl bg-bg px-6 pt-6 pb-5 flex flex-col items-center gap-6">
        <button type="button" onClick={onClose} className="absolute right-2 top-2 w-11 h-11 grid place-items-center">
          <CloseIcon />
        </button>
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
        <div className="w-full flex flex-col gap-1">
          <button type="button" onClick={onAccept} className="w-full py-4 rounded-[14px] bg-label text-white text-[15px] font-bold">
            이걸로 할게요
          </button>
          <button type="button" onClick={onReject} className="w-full pt-3.5 pb-2 text-[14px] font-bold text-label-disabled">
            오늘은 안 할래요
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav() {
  const tabs = [
    { label: "홈", icon: <HomeIcon active />, active: true },
    { label: "채팅", icon: <ChatIcon />, active: false },
    { label: "마이", icon: <PersonIcon />, active: false },
  ];
  return (
    <nav className="h-[98px] shrink-0 border-t border-line-subtle bg-bg flex">
      {tabs.map((tab) => (
        <div key={tab.label} className="flex-1 flex flex-col items-center pt-3 gap-1.5">
          {tab.icon}
          <span className={`text-[11px] font-bold ${tab.active ? "text-label" : "text-label-disabled"}`}>{tab.label}</span>
        </div>
      ))}
    </nav>
  );
}
