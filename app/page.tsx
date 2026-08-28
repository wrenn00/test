"use client";

import { useMemo, useState } from "react";

type DayState = "empty" | "noplan" | "mission" | "planned" | "done";

const STATES: { key: DayState; label: string }[] = [
  { key: "empty", label: "기록 0" },
  { key: "noplan", label: "계획 없음" },
  { key: "mission", label: "미션" },
  { key: "planned", label: "계획됨" },
  { key: "done", label: "완료" },
];

const TODAY = 27;
const BASE_PHOTOS = [4, 5, 6, 8, 10, 11, 12, 13, 14, 17, 18];
const STACKED = [6, 11];

type Plan = { name: string; sub: string; done: boolean; mission?: boolean };

const PLANS: Plan[] = [
  { name: "가볍게 15분 걷기", sub: "15분", done: false, mission: true },
  { name: "근력", sub: "상체 위주 30분", done: false },
  { name: "스트레칭", sub: "자기 전 10분", done: false },
];

export default function Page() {
  const [state, setState] = useState<DayState>("planned");
  const [collapsed, setCollapsed] = useState(false);
  const [popup, setPopup] = useState(false);

  const photos = useMemo(
    () => (state === "empty" ? [] : state === "done" ? [...BASE_PHOTOS, TODAY] : BASE_PHOTOS),
    [state]
  );

  const plans = useMemo<Plan[]>(() => {
    if (state === "planned") return PLANS;
    if (state === "done") return PLANS.map((p, i) => (i === 0 ? { ...p, done: true } : p));
    return [];
  }, [state]);

  const doneCount = plans.filter((p) => p.done).length;

  return (
    <main className="min-h-screen flex flex-col items-center gap-6 py-10 px-4">
      <Switcher
        state={state}
        setState={setState}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        popup={popup}
        setPopup={setPopup}
      />

      <div className="relative w-[375px] bg-bg rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <div className="pb-[98px]">
          <Header />
          <div className="px-5 pt-6 flex flex-col gap-6">
            <Summary count={photos.length} />
            <Calendar photos={photos} state={state} />
            {state === "empty" && <Guide />}
            {state === "mission" ? (
              <MissionCard />
            ) : (
              <TodayCard
                state={state}
                plans={plans}
                doneCount={doneCount}
                collapsed={collapsed}
                onToggle={() => setCollapsed((v) => !v)}
              />
            )}
          </div>
        </div>
        <BottomNav />
        {popup && <MissionPopup onClose={() => setPopup(false)} />}
      </div>

      <p className="text-[12px] text-[#8a9099] pb-6">
        375 × 812 기준 · 홈 화면 상태별 와이어프레임
      </p>
    </main>
  );
}

function Switcher({
  state,
  setState,
  collapsed,
  setCollapsed,
  popup,
  setPopup,
}: {
  state: DayState;
  setState: (s: DayState) => void;
  collapsed: boolean;
  setCollapsed: (v: (p: boolean) => boolean) => void;
  popup: boolean;
  setPopup: (v: boolean) => void;
}) {
  return (
    <div className="w-full max-w-[560px] flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {STATES.map((s) => (
          <button
            key={s.key}
            onClick={() => setState(s.key)}
            className={`px-3.5 py-2 rounded-[10px] text-[13px] font-bold transition ${
              state === s.key
                ? "bg-label text-white"
                : "bg-white text-[#6e7681] hover:bg-[#f4f5f7]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCollapsed((v) => !v)}
          disabled={state === "mission" || state === "empty"}
          className="px-3.5 py-2 rounded-[10px] text-[13px] font-bold bg-white text-[#6e7681] disabled:opacity-40"
        >
          {collapsed ? "카드 펼치기" : "카드 접기"}
        </button>
        <button
          onClick={() => setPopup(!popup)}
          className="px-3.5 py-2 rounded-[10px] text-[13px] font-bold bg-white text-[#6e7681]"
        >
          미션 팝업 {popup ? "닫기" : "열기"}
        </button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="px-5 pt-14 flex items-center justify-between h-[40px]">
      <span className="text-[22px] font-extrabold tracking-tight">LOGO</span>
      <BellIcon />
    </div>
  );
}

function Summary({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <button className="flex items-center gap-1 text-[13px] text-label-subtle font-medium">
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

function Calendar({ photos, state }: { photos: number[]; state: DayState }) {
  const days: (number | null)[] = [
    ...Array(5).fill(null),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ];
  while (days.length % 7 !== 0) days.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        {["월", "화", "수", "목", "금", "토", "일"].map((d) => (
          <div key={d} className="w-[43px] text-center text-[11px] font-bold text-label-disabled">
            {d}
          </div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="flex justify-between">
          {week.map((d, di) => {
            if (!d) return <div key={di} className="w-[43px] h-[60px]" />;
            const hasPhoto = photos.includes(d);
            const isToday = d === TODAY;
            const stacked = STACKED.includes(d) && hasPhoto;
            return (
              <div key={di} className="relative w-[43px] h-[60px]">
                {stacked && (
                  <div className="absolute left-2 -top-1 w-[35px] h-[52px] rounded-[8px] bg-fill-subtle border-[1.5px] border-white" />
                )}
                {hasPhoto && (
                  <div className="absolute inset-0 rounded-[8px] bg-fill-normal" />
                )}
                {isToday && (
                  <div
                    className={`absolute inset-0 rounded-[8px] border-2 border-label ${
                      hasPhoto ? "" : "border-dashed"
                    }`}
                  />
                )}
                <span
                  className={`absolute left-1.5 top-1.5 text-[11px] ${
                    isToday || hasPhoto ? "font-bold" : ""
                  } ${
                    hasPhoto || isToday
                      ? "text-label"
                      : d > TODAY || state === "empty"
                      ? "text-label-disabled"
                      : "text-label-subtle"
                  }`}
                >
                  {d}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Guide() {
  return (
    <div className="flex items-center gap-3.5 px-[18px] py-4 rounded-2xl bg-fill-subtle">
      <CameraIcon />
      <div className="flex flex-col gap-0.5">
        <span className="text-[14px] font-bold">운동한 날을 사진으로 남겨보세요</span>
        <span className="text-[11px] text-label-disabled">기록한 사진이 이 달력에 쌓여요</span>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[20px] border border-line-normal bg-bg overflow-hidden">{children}</div>
  );
}

function TodayCard({
  state,
  plans,
  doneCount,
  collapsed,
  onToggle,
}: {
  state: DayState;
  plans: Plan[];
  doneCount: number;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const showList = plans.length > 0 && !collapsed;
  return (
    <Card>
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 pt-[18px] pb-3">
        <span className="text-[15px] font-bold">오늘의 운동</span>
        <span className="flex items-center gap-3">
          {plans.length > 0 && (
            <span className="text-[12px] font-bold text-label-subtle">
              {doneCount} / {plans.length}
            </span>
          )}
          <Chevron up={!collapsed} />
        </span>
      </button>

      {state === "empty" && !collapsed && (
        <div className="flex flex-col items-center gap-1.5 pb-1.5">
          <span className="text-[14px] font-bold text-label-subtle">아직 기록이 없어요</span>
          <span className="text-[11px] text-label-disabled">오늘 첫 운동을 남겨보세요</span>
        </div>
      )}
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
                  <div className="w-10 h-10 rounded-[10px] bg-fill-normal shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[14px] font-bold truncate ${p.done ? "line-through text-label-subtle" : ""}`}>
                      {p.name}
                    </div>
                    <div className="text-[11px] text-label-disabled truncate">{p.sub}</div>
                  </div>
                  {p.mission && (
                    <span className="px-2 py-1 rounded-md bg-fill-subtle text-[11px] font-bold text-label-subtle">
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
          <div className="flex items-center gap-5 py-3">
            <div className="w-10 h-10 rounded-[10px] border-2 border-dashed border-line-strong grid place-items-center shrink-0">
              <PlusIcon />
            </div>
            <span className="text-[14px] font-bold text-label-subtle">운동 계획 추가</span>
          </div>
        </div>
      )}

      <div className="px-5 pt-1.5 pb-5">
        <button className="w-full py-4 rounded-[14px] bg-label text-white text-[14px] font-bold">
          운동 기록하기
        </button>
      </div>
    </Card>
  );
}

function MissionCard() {
  return (
    <div className="rounded-[20px] border-[1.5px] border-label bg-bg overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-[18px] pb-3">
        <span className="text-[15px] font-bold">오늘의 미션</span>
        <span className="px-2.5 py-1 rounded-full bg-label text-white text-[11px] font-bold tracking-wide">
          NEW
        </span>
      </div>
      <div className="px-5 pb-4 flex flex-col gap-2">
        <div className="text-[19px] font-extrabold">가볍게 15분 걷기</div>
        <div className="flex gap-2">
          {["15분", "가볍게", "야외"].map((t) => (
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
          최근 이틀 기록이 없어요.
          <br />
          다시 시작하기 좋은 양이에요.
        </span>
      </div>
      <div className="h-px bg-line-subtle" />
      <div className="px-5 py-4 flex gap-2.5">
        <button className="flex-1 py-3.5 rounded-[14px] border border-line-strong text-[14px] font-bold">
          오늘은 안 할래요
        </button>
        <button className="flex-1 py-3.5 rounded-[14px] bg-label text-white text-[14px] font-bold">
          이걸로 할게요
        </button>
      </div>
    </div>
  );
}

function MissionPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-20">
      <div className="absolute inset-0 bg-label/50" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[303px] rounded-3xl bg-bg px-6 pt-6 pb-5 flex flex-col items-center gap-6">
        <button onClick={onClose} className="absolute right-2 top-2 w-11 h-11 grid place-items-center">
          <CloseIcon />
        </button>
        <div className="relative w-[180px] h-[150px] rounded-2xl bg-fill-subtle">
          <svg className="absolute inset-0" width="180" height="150">
            <line x1="0" y1="0" x2="180" y2="150" stroke="#e3e6e9" />
            <line x1="180" y1="0" x2="0" y2="150" stroke="#e3e6e9" />
          </svg>
          <span className="absolute left-1/2 -translate-x-1/2 -bottom-[15px] px-3.5 py-1.5 rounded-full bg-label text-white text-[11px] font-bold border-[3px] border-white whitespace-nowrap">
            오늘의 미션
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 pt-2.5">
          <span className="text-[19px] font-extrabold">가볍게 15분 걷기</span>
          <span className="text-[13px] text-label-subtle">최근 이틀 쉬었으니 가볍게 시작해요</span>
        </div>
        <div className="w-full flex flex-col gap-1">
          <button className="w-full py-4 rounded-[14px] bg-label text-white text-[15px] font-bold">
            이걸로 할게요
          </button>
          <button onClick={onClose} className="w-full pt-3.5 pb-2 text-[14px] font-bold text-label-disabled">
            오늘은 안 할래요
          </button>
        </div>
      </div>
    </div>
  );
}

function BottomNav() {
  const items = [
    { label: "홈", icon: <HomeIcon active />, active: true },
    { label: "채팅", icon: <ChatIcon />, active: false },
    { label: "마이", icon: <PersonIcon />, active: false },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[98px] bg-bg border-t border-line-subtle">
      <div className="flex">
        {items.map((it) => (
          <div key={it.label} className="flex-1 flex flex-col items-center pt-3 gap-1.5">
            {it.icon}
            <span className={`text-[11px] font-bold ${it.active ? "text-label" : "text-label-disabled"}`}>
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* icons */
const BellIcon = () => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor">
    <path d="M12 2c5 0 8 4 8 9v6l2 4H2l2-4v-6c0-5 3-9 8-9Z" />
    <ellipse cx="12" cy="23.5" rx="3.5" ry="2.5" />
  </svg>
);
const ChevronDown = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1.5 6 6.5 11 1.5" />
  </svg>
);
const Chevron = ({ up }: { up: boolean }) => (
  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="#6e7681" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={up ? "M1 7.5 7 1.5 13 7.5" : "M1 1.5 7 7.5 13 1.5"} />
  </svg>
);
const CheckIcon = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 5 4.5 8.5 11 1.5" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" stroke="#6e7681" strokeWidth="2" strokeLinecap="round">
    <path d="M8 1v14M1 8h14" />
  </svg>
);
const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" stroke="#aeb4bc" strokeWidth="2" strokeLinecap="round">
    <path d="M1 1l13 13M14 1L1 14" />
  </svg>
);
const CameraIcon = () => (
  <svg width="34" height="28" viewBox="0 0 34 28" fill="none" stroke="#6e7681" strokeWidth="1.8">
    <rect x="1" y="4" width="32" height="23" rx="6" />
    <circle cx="17" cy="15.5" r="6" />
    <rect x="11" y="1" width="12" height="4" rx="2" fill="#6e7681" stroke="none" />
  </svg>
);
const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg width="24" height="23" viewBox="0 0 24 23" fill={active ? "#1a1d23" : "none"} stroke={active ? "none" : "#aeb4bc"} strokeWidth="2" strokeLinejoin="round">
    <path d="M12 0 24 10v13h-9v-8H9v8H0V10Z" />
  </svg>
);
const ChatIcon = () => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" stroke="#aeb4bc" strokeWidth="2" strokeLinejoin="round">
    <rect x="1" y="1" width="22" height="17" rx="6" />
    <path d="M6 18l0 6 7-6" />
  </svg>
);
const PersonIcon = () => (
  <svg width="22" height="24" viewBox="0 0 22 24" fill="none" stroke="#aeb4bc" strokeWidth="2" strokeLinejoin="round">
    <circle cx="11" cy="6" r="5" />
    <path d="M1 23c0-6 4.5-9 10-9s10 3 10 9" />
  </svg>
);
