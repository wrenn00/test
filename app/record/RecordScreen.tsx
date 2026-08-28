"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ScrollArea from "../components/ScrollArea";
import DurationField from "../components/DurationField";
import { BASE_PLANS, TODAY } from "../home/types";
import ScrollAreaX from "../components/ScrollAreaX";
import { CameraIcon, CloseIcon } from "../home/icons";

const KINDS = ["유산소", "근력", "스트레칭", "직접 입력"];

function planOptions(day: number) {
  if (day !== TODAY) return [];
  return BASE_PLANS.map((p) => ({ name: p.name, minutes: parseInt(p.sub, 10) || 30 }));
}
const FEELINGS = ["가뿐했어요", "적당했어요", "힘들었어요"];
const MEMO_MAX = 200;

const RECENT_DAYS = [27, 26, 25, 24, 23];

function recentWith(day: number) {
  return RECENT_DAYS.includes(day) ? RECENT_DAYS : [day, ...RECENT_DAYS].slice(0, 5);
}

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

export default function RecordScreen({ initialDay = 27, edit = false }: { initialDay?: number; edit?: boolean }) {
  const router = useRouter();
  const [photos, setPhotos] = useState([1, 2]);
  const [kind, setKind] = useState("");
  const [minutes, setMinutes] = useState(30);
  const [feeling, setFeeling] = useState(FEELINGS[1]);
  const [memo, setMemo] = useState("");
  const [day, setDay] = useState(initialDay);
  const [picker, setPicker] = useState(false);
  const plans = planOptions(day);

  return (
    <div className="relative h-full flex flex-col bg-bg overflow-hidden">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center">
          <CloseIcon />
        </button>
        <span className="text-[15px] font-bold">{edit ? "기록 수정" : "운동 기록"}</span>
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
          <ScrollAreaX className="-mx-5 px-5">
          <div className="flex gap-2.5 w-max pt-2 pr-1">
            <button
              type="button"
              disabled={photos.length >= 5}
              onClick={() => setPhotos((p) => (p.length < 5 ? [...p, Math.max(0, ...p) + 1] : p))}
              className="w-[100px] h-[124px] rounded-2xl border-2 border-dashed border-line-strong flex flex-col items-center justify-center gap-2 shrink-0 disabled:opacity-40"
            >
              <CameraIcon />
              <span className="text-[11px] font-bold text-label-subtle">
                {photos.length >= 5 ? "가득 참" : "추가"}
              </span>
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
          </ScrollAreaX>
        </Section>

        <Section title="무엇을 했나요">
          {plans.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {plans.map((p) => {
                  const on = kind === p.name;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setKind(p.name);
                        setMinutes(p.minutes);
                      }}
                      className={`flex items-center gap-4 px-4 py-3 rounded-[14px] text-left ${
                        on ? "bg-label" : "bg-fill-subtle"
                      }`}
                    >
                      <span className={`w-9 h-9 rounded-[10px] shrink-0 ${on ? "bg-white/20" : "bg-bg"}`} />
                      <span className="flex-1 min-w-0">
                        <span className={`block text-[14px] font-bold truncate ${on ? "text-white" : ""}`}>{p.name}</span>
                        <span className={`block text-[11px] ${on ? "text-white/70" : "text-label-disabled"}`}>계획 {p.minutes}분</span>
                      </span>
                      <span
                        className={`w-[22px] h-[22px] rounded-full shrink-0 grid place-items-center ${
                          on ? "bg-white" : "border border-line-strong"
                        }`}
                      >
                        {on && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#191f28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M1 4.5 4 7.5 10 1" />
                          </svg>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            {plans.length > 0 && <span className="text-[11px] font-bold text-label-subtle">다른 운동</span>}
            <div className="flex flex-wrap gap-2">
              {KINDS.map((k) => (
                <Chip key={k} label={k} active={kind === k} onClick={() => setKind(k)} />
              ))}
            </div>
          </div>
        </Section>

        <Section title="얼마나 했나요">
          <DurationField value={minutes} onChange={setMinutes} />
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
          disabled={!kind}
          onClick={() => router.push(edit ? `/day?d=${day}` : "/home?s=done")}
          className="w-full py-4 rounded-2xl bg-label text-white text-[15px] font-bold disabled:opacity-35"
        >
          {edit ? "수정 완료" : "기록하기"}
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
        {recentWith(selected).map((d, i) => (
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
    <section className="flex flex-col gap-3.5">
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

