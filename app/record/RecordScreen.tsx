"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ScrollArea from "../components/ScrollArea";
import { CameraIcon, CloseIcon, PlusIcon } from "../home/icons";

const KINDS = ["유산소", "근력", "스트레칭", "직접 입력"];
const FEELINGS = ["가뿐했어요", "적당했어요", "힘들었어요"];
const MEMO_MAX = 200;

const RECENT_DAYS = [27, 26, 25, 24, 23];

function dayLabel(day: number) {
  const d = new Date(2026, 7, day);
  const w = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `8월 ${day}일 ${w}요일`;
}
function relative(day: number) {
  if (day === 27) return "오늘";
  if (day === 26) return "어제";
  if (day === 25) return "그제";
  return "";
}

export default function RecordScreen() {
  const router = useRouter();
  const [photos, setPhotos] = useState([1, 2]);
  const [kind, setKind] = useState(KINDS[0]);
  const [minutes, setMinutes] = useState(32);
  const [feeling, setFeeling] = useState(FEELINGS[1]);
  const [memo, setMemo] = useState("");
  const [day, setDay] = useState(27);
  const [picker, setPicker] = useState(false);

  return (
    <div className="relative h-full flex flex-col bg-bg overflow-hidden">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center">
          <CloseIcon />
        </button>
        <span className="text-[15px] font-bold">운동 기록</span>
        <span className="w-11 h-11" aria-hidden />
      </div>

      <ScrollArea className="flex-1 px-5 pb-[130px] flex flex-col gap-7">
        <button
          type="button"
          onClick={() => setPicker(true)}
          className="w-full flex items-center justify-between px-[18px] py-4 rounded-2xl bg-fill-subtle text-left"
        >
          <span className="flex flex-col gap-0.5">
            <span className="text-[11px] text-label-disabled">기록할 날짜</span>
            <span className="text-[14px] font-bold">{dayLabel(day)}</span>
          </span>
          <span className="text-label-disabled text-[18px]">›</span>
        </button>

        <Section title="사진" meta={`선택  ${photos.length} / 5`}>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setPhotos((p) => (p.length < 5 ? [...p, p.length + 1] : p))}
              className="w-[100px] h-[124px] rounded-2xl border-2 border-dashed border-line-strong flex flex-col items-center justify-center gap-2 shrink-0"
            >
              <CameraIcon />
              <span className="text-[11px] font-bold text-label-subtle">추가</span>
            </button>
            {photos.map((id) => (
              <div key={id} className="relative w-[100px] h-[124px] rounded-2xl bg-fill-subtle shrink-0">
                <button
                  type="button"
                  onClick={() => setPhotos((p) => p.filter((x) => x !== id))}
                  className="absolute -top-2 -right-2 w-[26px] h-[26px] rounded-full bg-label grid place-items-center"
                  aria-label="사진 삭제"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M1 1l8 8M9 1L1 9" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </Section>

        <Section title="무슨 운동인가요">
          <div className="flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <Chip key={k} label={k} active={kind === k} onClick={() => setKind(k)} />
            ))}
          </div>
        </Section>

        <Section title="얼마나 했나요">
          <div className="flex items-center justify-between px-[18px] py-3.5 rounded-2xl bg-fill-subtle">
            <Stepper onClick={() => setMinutes((m) => Math.max(5, m - 5))} minus />
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-extrabold leading-none">{minutes}</span>
              <span className="text-[14px] font-medium text-label-subtle">분</span>
            </div>
            <Stepper onClick={() => setMinutes((m) => Math.min(300, m + 5))} />
          </div>
        </Section>

        <Section title="오늘 어땠나요" meta="선택">
          <div className="flex gap-2">
            {FEELINGS.map((f) => (
              <Chip key={f} label={f} active={feeling === f} onClick={() => setFeeling(f)} grow />
            ))}
          </div>
        </Section>

        <Section title="메모" meta="선택">
          <div className="relative">
            <textarea
              value={memo}
              maxLength={MEMO_MAX}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="오늘 몸이 어땠는지 적어보세요"
              className="w-full h-[96px] rounded-2xl bg-fill-subtle px-4 pt-4 pb-8 text-[14px] resize-none outline-none placeholder:text-label-disabled"
            />
            <span
              className={`absolute right-4 bottom-4 text-[11px] ${
                memo.length > MEMO_MAX * 0.75 ? "text-label-subtle font-bold" : "text-label-disabled"
              }`}
            >
              {memo.length} / {MEMO_MAX}
            </span>
          </div>
        </Section>
      </ScrollArea>

      <div className="absolute bottom-0 inset-x-0 bg-white/70 backdrop-blur-xl border-t border-white/60 px-5 pt-4 pb-9">
        <button
          type="button"
          onClick={() => router.push("/home?s=done")}
          className="w-full py-4 rounded-2xl bg-label text-white text-[15px] font-bold"
        >
          기록하기
        </button>
      </div>

      {picker && (
        <DatePicker
          selected={day}
          onSelect={(d) => {
            setDay(d);
            setPicker(false);
          }}
          onClose={() => setPicker(false)}
        />
      )}
    </div>
  );
}

function DatePicker({
  selected,
  onSelect,
  onClose,
}: {
  selected: number;
  onSelect: (d: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-label/45" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-bg px-5 pt-2.5 pb-9">
        <div className="flex justify-center pb-3">
          <span className="w-10 h-1 rounded-full bg-line-strong" />
        </div>
        <div className="pb-2">
          <span className="text-[15px] font-bold">언제 한 운동인가요</span>
        </div>
        {RECENT_DAYS.map((d, i) => (
          <div key={d}>
            {i > 0 && <div className="h-px bg-line-subtle" />}
            <button
              type="button"
              onClick={() => onSelect(d)}
              className="w-full flex items-center justify-between py-3.5"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-[14px] font-bold">{dayLabel(d)}</span>
                {relative(d) && (
                  <span className="px-2 py-0.5 rounded-md bg-fill-subtle text-[11px] font-bold text-label-subtle">
                    {relative(d)}
                  </span>
                )}
              </span>
              {selected === d && (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" stroke="#191f28" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M1 5.5 5 9.5 13 1.5" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-bold">{title}</span>
        {meta && <span className="text-[11px] text-label-disabled">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

function Chip({ label, active, onClick, grow }: { label: string; active: boolean; onClick: () => void; grow?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${grow ? "flex-1" : ""} px-3.5 py-2.5 rounded-[10px] text-[14px] ${
        active ? "bg-label text-white font-bold" : "bg-fill-subtle text-label-subtle font-medium"
      }`}
    >
      {label}
    </button>
  );
}

function Stepper({ onClick, minus }: { onClick: () => void; minus?: boolean }) {
  return (
    <button type="button" onClick={onClick} className="w-11 h-11 rounded-full bg-bg grid place-items-center" aria-label={minus ? "감소" : "증가"}>
      {minus ? <svg width="16" height="2" viewBox="0 0 16 2" aria-hidden><rect width="16" height="2" rx="1" fill="#191f28" /></svg> : <PlusIcon />}
    </button>
  );
}
