"use client";

import type { ReactNode } from "react";

export type SheetItem = { title: string; desc: string; onClick?: () => void };

export function ActionSheet({
  items,
  onClose,
  dark,
}: {
  items: SheetItem[];
  onClose: () => void;
  dark?: boolean;
}) {
  return (
    <div className="absolute inset-0 z-30">
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className={`absolute inset-0 ${dark ? "bg-black/55" : "bg-label/45"}`}
      />
      <div className="absolute inset-x-0 bottom-0 px-5 pb-9 flex flex-col gap-2.5">
        <div className="rounded-[18px] bg-bg overflow-hidden">
          {items.map((it, i) => (
            <div key={it.title}>
              {i > 0 && <div className="h-px bg-line-subtle" />}
              <button
                type="button"
                onClick={it.onClick}
                className="w-full px-5 py-4 text-left flex flex-col gap-0.5"
              >
                <span className="text-[15px] font-bold">{it.title}</span>
                <span className="text-[11px] text-label-disabled">{it.desc}</span>
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose} className="w-full py-4 rounded-[18px] bg-bg text-[15px] font-bold text-label-subtle">
          취소
        </button>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  title,
  body,
  confirmLabel = "삭제",
  thumb,
  onCancel,
  onConfirm,
  dark,
}: {
  title: string;
  body: ReactNode;
  confirmLabel?: string;
  thumb?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  dark?: boolean;
}) {
  return (
    <div className="absolute inset-0 z-40">
      <button
        type="button"
        aria-label="닫기"
        onClick={onCancel}
        className={`absolute inset-0 ${dark ? "bg-black/60" : "bg-label/45"}`}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[295px] rounded-[22px] bg-bg px-6 pt-6 pb-5 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          {thumb && <div className="w-[76px] h-[76px] rounded-[14px] bg-fill-subtle" />}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[17px] font-extrabold">{title}</span>
            <span className="text-[13px] text-label-subtle leading-relaxed">{body}</span>
          </div>
        </div>
        <div className="flex gap-2.5">
          <button type="button" onClick={onCancel} className="flex-1 py-3.5 rounded-[14px] bg-fill-subtle text-[14px] font-bold">
            취소
          </button>
          <button type="button" onClick={onConfirm} className="flex-1 py-3.5 rounded-[14px] bg-label text-white text-[14px] font-bold">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
