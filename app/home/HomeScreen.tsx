const TODAY = 27;
const PHOTO_DAYS = [4, 5, 6, 8, 10, 11, 12, 13, 14, 17, 18];
const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

export default function HomeScreen() {
  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="flex-1 overflow-y-auto">
        <Header />
        <div className="px-5 pt-6 pb-8 flex flex-col gap-6">
          <Summary count={PHOTO_DAYS.length} />
          <Calendar />
          <TodayCard />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function Header() {
  return (
    <div className="px-5 pt-14 h-[94px] flex items-center justify-between">
      <span className="text-[22px] font-extrabold tracking-tight">LOGO</span>
      <BellIcon />
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

function Calendar() {
  const cells: (number | null)[] = [
    ...Array<null>(5).fill(null),
    ...Array.from({ length: 31 }, (_, i) => i + 1),
  ];
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
          {week.map((day, di) => (
            <DayCell key={di} day={day} />
          ))}
        </div>
      ))}
    </div>
  );
}

function DayCell({ day }: { day: number | null }) {
  if (!day) return <div className="w-[43px] h-[60px]" />;
  const hasPhoto = PHOTO_DAYS.includes(day);
  const isToday = day === TODAY;
  const tone = hasPhoto || isToday ? "text-label" : day > TODAY ? "text-label-disabled" : "text-label-subtle";

  return (
    <div className="relative w-[43px] h-[60px]">
      {hasPhoto && <div className="absolute inset-0 rounded-[8px] bg-fill-subtle" />}
      {isToday && <div className="absolute inset-0 rounded-[8px] border-2 border-dashed border-label" />}
      <span className={`absolute left-1.5 top-1.5 text-[11px] ${hasPhoto || isToday ? "font-bold" : ""} ${tone}`}>
        {day}
      </span>
    </div>
  );
}

function TodayCard() {
  return (
    <div className="rounded-[20px] border border-line-normal bg-bg">
      <button type="button" className="w-full px-5 pt-[18px] pb-3 flex items-center justify-between">
        <span className="text-[15px] font-bold">오늘의 운동</span>
        <ChevronUp />
      </button>

      <div className="flex flex-col items-center gap-1.5 pb-1.5">
        <span className="text-[14px] font-bold text-label-subtle">오늘 계획된 운동이 없어요</span>
        <span className="text-[11px] text-label-disabled">아래에서 계획을 세워보세요</span>
      </div>

      <div className="px-5 pb-1.5">
        <button type="button" className="w-full py-3 flex items-center gap-5">
          <span className="w-10 h-10 rounded-[10px] border-2 border-dashed border-line-strong grid place-items-center shrink-0">
            <PlusIcon />
          </span>
          <span className="text-[14px] font-bold text-label-subtle">운동 계획 추가</span>
        </button>
      </div>

      <div className="px-5 pt-1.5 pb-5">
        <button type="button" className="w-full py-4 rounded-[14px] bg-label text-white text-[14px] font-bold">
          운동 기록하기
        </button>
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
          <span className={`text-[11px] font-bold ${tab.active ? "text-label" : "text-label-disabled"}`}>
            {tab.label}
          </span>
        </div>
      ))}
    </nav>
  );
}

const BellIcon = () => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor" aria-hidden>
    <path d="M12 2c5 0 8 4 8 9v6l2 4H2l2-4v-6c0-5 3-9 8-9Z" />
    <ellipse cx="12" cy="23.5" rx="3.5" ry="2.5" />
  </svg>
);
const ChevronDown = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1 1.5 6 6.5 11 1.5" />
  </svg>
);
const ChevronUp = () => (
  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" stroke="#4e5968" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M1 7.5 7 1.5 13 7.5" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" stroke="#4e5968" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M8 1v14M1 8h14" />
  </svg>
);
const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg width="24" height="23" viewBox="0 0 24 23" fill={active ? "#191f28" : "none"} stroke={active ? "none" : "#8b95a1"} strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M12 0 24 10v13h-9v-8H9v8H0V10Z" />
  </svg>
);
const ChatIcon = () => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" stroke="#8b95a1" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <rect x="1" y="1" width="22" height="17" rx="6" />
    <path d="M6 18v6l7-6" />
  </svg>
);
const PersonIcon = () => (
  <svg width="22" height="24" viewBox="0 0 22 24" fill="none" stroke="#8b95a1" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="6" r="5" />
    <path d="M1 23c0-6 4.5-9 10-9s10 3 10 9" />
  </svg>
);
