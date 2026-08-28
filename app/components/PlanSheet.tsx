"use client";

import { useState } from "react";
import { PlusIcon } from "../home/icons";
import DurationField from "./DurationField";

const RECENT = ["한강 러닝", "자기 전 스트레칭", "홈트 20분"];
const CATALOG: { group: string; items: { name: string; min: number }[] }[] = [
  { group: "유산소", items: [
    { name: "걷기", min: 30 },
    { name: "달리기", min: 30 },
    { name: "자전거", min: 40 },
  ]},
  { group: "근력", items: [
    { name: "상체", min: 30 },
    { name: "하체", min: 30 },
  ]},
  { group: "스트레칭", items: [{ name: "전신 스트레칭", min: 10 }] },
];
const MEMO_MAX = 30;

export type PlanDraft = { name: string; minutes: number; memo: string };

export default function PlanSheet({
  dateLabel,
  initial,
  onClose,
  onSubmit,
  onDelete,
}: {
  dateLabel: string;
  initial?: PlanDraft;
  onClose: () => void;
  onSubmit: (p: PlanDraft) => void;
  onDelete?: () => void;
}) {
  const [picked, setPicked] = useState<PlanDraft | null>(initial ?? null);
  const [custom, setCustom] = useState(false);

  return (
    <div className="absolute inset-0 z-30">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-label/45" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-bg pt-2.5 pb-9 max-h-[86%] flex flex-col">
        <div className="flex justify-center pb-3 shrink-0">
          <span className="w-10 h-1 rounded-full bg-line-strong" />
        </div>

        {picked ? (
          <Configure
            draft={picked}
            dateLabel={dateLabel}
            editing={Boolean(initial)}
            onBack={() => (initial ? onClose() : setPicked(null))}
            onChange={setPicked}
            onSubmit={() => onSubmit(picked)}
            onDelete={onDelete}
          />
        ) : (
          <Pick
            dateLabel={dateLabel}
            custom={custom}
            setCustom={setCustom}
            onPick={(name, min) => setPicked({ name, minutes: min, memo: "" })}
          />
        )}
      </div>
    </div>
  );
}

function Pick({
  dateLabel,
  custom,
  setCustom,
  onPick,
}: {
  dateLabel: string;
  custom: boolean;
  setCustom: (v: boolean) => void;
  onPick: (name: string, min: number) => void;
}) {
  const [name, setName] = useState("");
  return (
    <>
      <div className="px-5 pb-3 shrink-0">
        <div className="text-[19px] font-extrabold">무슨 운동을 할까요</div>
        <div className="text-[11px] text-label-disabled mt-0.5">{dateLabel} 계획에 담아요</div>
      </div>

      <div className="no-scrollbar flex-1 px-5 pb-2 flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {RECENT.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onPick(r, 30)}
              className="px-3.5 py-2.5 rounded-[10px] bg-fill-subtle text-[14px] font-medium text-label-subtle"
            >
              {r}
            </button>
          ))}
        </div>

        {CATALOG.map((g) => (
          <section key={g.group} className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-label-subtle">{g.group}</span>
            <div className="rounded-[18px] border border-line-normal px-[18px]">
              {g.items.map((it, i) => (
                <div key={it.name}>
                  {i > 0 && <div className="h-px bg-line-subtle" />}
                  <button type="button" onClick={() => onPick(it.name, it.min)} className="w-full flex items-center gap-5 py-3.5 text-left">
                    <span className="w-10 h-10 rounded-[10px] bg-fill-subtle shrink-0" />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[14px] font-bold truncate">{it.name}</span>
                      <span className="block text-[11px] text-label-disabled">기본 {it.min}분</span>
                    </span>
                    <span className="text-label-disabled text-[18px]">›</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}

        {custom ? (
          <div className="flex items-center gap-3 px-4 h-[52px] rounded-[14px] border-[1.5px] border-label">
            <input
              autoFocus
              value={name}
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              placeholder="운동 이름"
              className="flex-1 bg-transparent text-[14px] font-bold outline-none placeholder:font-medium placeholder:text-label-disabled"
            />
            <button
              type="button"
              disabled={!name.trim()}
              onClick={() => onPick(name.trim(), 30)}
              className="text-[13px] font-bold text-label disabled:text-label-disabled"
            >
              다음
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCustom(true)}
            className="flex items-center gap-5 px-[18px] py-3.5 rounded-[18px] border-2 border-dashed border-line-strong"
          >
            <span className="w-10 h-10 grid place-items-center shrink-0">
              <PlusIcon />
            </span>
            <span className="text-[14px] font-bold text-label-subtle">직접 입력</span>
          </button>
        )}
      </div>
    </>
  );
}

function Configure({
  draft,
  dateLabel,
  editing,
  onBack,
  onChange,
  onSubmit,
  onDelete,
}: {
  draft: PlanDraft;
  dateLabel: string;
  editing: boolean;
  onBack: () => void;
  onChange: (p: PlanDraft) => void;
  onSubmit: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="px-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={onBack} className="w-8 h-8 -ml-2 grid place-items-center" aria-label="뒤로">
            <svg width="9" height="16" viewBox="0 0 9 16" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 1 1 8l7 7" />
            </svg>
          </button>
          <div>
            <div className="text-[19px] font-extrabold">{draft.name}</div>
            <div className="text-[11px] text-label-disabled">{dateLabel}</div>
          </div>
        </div>
        {editing && onDelete && (
          <button type="button" onClick={onDelete} className="px-3 py-2 rounded-full bg-fill-subtle text-[11px] font-bold text-label-subtle">
            계획 삭제
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-[14px] font-bold">얼마나 할까요</span>
        <DurationField value={draft.minutes} onChange={(v) => onChange({ ...draft, minutes: v })} />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-bold">한 줄 메모</span>
          <span className="text-[11px] text-label-disabled">선택</span>
        </div>
        <div className="flex items-center gap-3 px-4 h-[52px] rounded-[14px] bg-fill-subtle">
          <input
            value={draft.memo}
            maxLength={MEMO_MAX}
            onChange={(e) => onChange({ ...draft, memo: e.target.value })}
            placeholder="예) 한강 러닝"
            className="flex-1 bg-transparent text-[14px] font-bold outline-none placeholder:font-medium placeholder:text-label-disabled"
          />
          <span className={`text-[11px] shrink-0 ${draft.memo.length > MEMO_MAX * 0.66 ? "text-label-subtle font-bold" : "text-label-disabled"}`}>
            {draft.memo.length} / {MEMO_MAX}
          </span>
        </div>
      </div>

      <button type="button" onClick={onSubmit} className="w-full py-4 rounded-2xl bg-label text-white text-[15px] font-bold">
        {editing ? "저장" : "계획에 추가"}
      </button>
    </div>
  );
}
