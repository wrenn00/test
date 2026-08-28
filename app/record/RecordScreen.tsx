"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CameraIcon, CloseIcon, PlusIcon } from "../home/icons";

const KINDS = ["유산소", "근력", "스트레칭", "직접 입력"];
const FEELINGS = ["가뿐했어요", "적당했어요", "힘들었어요"];
const MEMO_MAX = 200;

export default function RecordScreen() {
  const router = useRouter();
  const [photos, setPhotos] = useState([1, 2]);
  const [kind, setKind] = useState(KINDS[0]);
  const [minutes, setMinutes] = useState(32);
  const [feeling, setFeeling] = useState(FEELINGS[1]);
  const [memo, setMemo] = useState("");

  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center">
          <CloseIcon />
        </button>
        <span className="text-[15px] font-bold">운동 기록</span>
        <span className="w-11 h-11" aria-hidden />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-7">
        <div className="flex items-center justify-between px-[18px] py-4 rounded-2xl bg-fill-subtle">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-label-disabled">기록할 날짜</span>
            <span className="text-[14px] font-bold">8월 27일 목요일</span>
          </div>
          <span className="text-label-disabled text-[18px]">›</span>
        </div>

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
      </div>

      <div className="shrink-0 border-t border-line-subtle px-5 pt-4 pb-9">
        <button
          type="button"
          onClick={() => router.push("/home?s=done")}
          className="w-full py-4 rounded-2xl bg-label text-white text-[15px] font-bold"
        >
          기록하기
        </button>
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
