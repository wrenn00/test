"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ScrollArea from "../../components/ScrollArea";
import { BackIcon, PlusIcon } from "../../home/icons";

const KINDS = ["유산소", "근력", "스트레칭", "기타"];
const NAME_MAX = 20;

export default function CustomPlanScreen() {
  const router = useRouter();
  const [name, setName] = useState("아침 산책");
  const [kind, setKind] = useState(KINDS[0]);
  const [minutes, setMinutes] = useState(30);

  return (
    <div className="relative h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center">
          <BackIcon />
        </button>
        <span className="text-[15px] font-bold">직접 만들기</span>
        <span className="w-11 h-11" aria-hidden />
      </div>

      <ScrollArea className="flex-1 px-5 pb-[130px] flex flex-col gap-7">
        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold">운동 이름</span>
            <span className={`text-[11px] ${name.length > NAME_MAX * 0.75 ? "text-label-subtle font-bold" : "text-label-disabled"}`}>
              {name.length} / {NAME_MAX}
            </span>
          </div>
          <input
            value={name}
            maxLength={NAME_MAX}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[52px] rounded-[14px] border-[1.5px] border-label px-4 text-[14px] font-bold outline-none"
          />
        </section>

        <section className="flex flex-col gap-2.5">
          <span className="text-[14px] font-bold">분류</span>
          <div className="flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={`px-3.5 py-2.5 rounded-[10px] text-[14px] ${
                  kind === k ? "bg-label text-white font-bold" : "bg-fill-subtle text-label-subtle font-medium"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold">기본 시간</span>
            <span className="text-[11px] text-label-disabled">나중에 바꿀 수 있어요</span>
          </div>
          <div className="flex items-center justify-between px-[18px] py-3.5 rounded-2xl bg-fill-subtle">
            <button type="button" onClick={() => setMinutes((m) => Math.max(5, m - 5))} className="w-11 h-11 rounded-full bg-bg grid place-items-center" aria-label="감소">
              <svg width="16" height="2" viewBox="0 0 16 2" aria-hidden><rect width="16" height="2" rx="1" fill="#191f28" /></svg>
            </button>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-extrabold leading-none">{minutes}</span>
              <span className="text-[14px] font-medium text-label-subtle">분</span>
            </div>
            <button type="button" onClick={() => setMinutes((m) => Math.min(300, m + 5))} className="w-11 h-11 rounded-full bg-bg grid place-items-center" aria-label="증가">
              <PlusIcon />
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-2.5">
          <span className="text-[14px] font-bold">목록에서 이렇게 보여요</span>
          <div className="flex items-center gap-5 px-[18px] py-3.5 rounded-[18px] border border-line-normal">
            <span className="w-10 h-10 rounded-[10px] bg-fill-subtle shrink-0" />
            <span className="flex-1 min-w-0">
              <span className="block text-[14px] font-bold truncate">{name || "운동 이름"}</span>
              <span className="block text-[11px] text-label-disabled">기본 {minutes}분</span>
            </span>
            <span className="w-[26px] h-[26px] rounded-full border border-line-strong shrink-0" />
          </div>
        </section>
      </ScrollArea>

      <div className="absolute bottom-0 inset-x-0 bg-white/70 backdrop-blur-xl border-t border-white/60 px-5 pt-4 pb-9">
        <button
          type="button"
          disabled={!name.trim()}
          onClick={() => router.push("/plan")}
          className="w-full py-4 rounded-2xl bg-label text-white text-[15px] font-bold disabled:opacity-35"
        >
          만들고 계획에 추가
        </button>
      </div>
    </div>
  );
}
