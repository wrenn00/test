"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ScrollArea from "../components/ScrollArea";
import { CloseIcon, PlusIcon } from "../home/icons";
import { labelOf } from "../home/types";

const GROUPS: { title: string; items: { name: string; sub: string }[] }[] = [
  { title: "유산소", items: [
    { name: "걷기", sub: "기본 30분" },
    { name: "달리기", sub: "기본 30분" },
    { name: "자전거", sub: "기본 40분" },
  ]},
  { title: "근력", items: [
    { name: "상체", sub: "기본 30분" },
    { name: "하체", sub: "기본 30분" },
  ]},
  { title: "스트레칭", items: [{ name: "전신 스트레칭", sub: "기본 10분" }] },
];
const RECENT = ["한강 러닝", "자기 전 스트레칭", "홈트 20분"];

export default function PlanAddScreen({ day }: { day: number }) {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>(["걷기", "하체"]);

  const toggle = (name: string) =>
    setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  return (
    <div className="relative h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center">
          <CloseIcon />
        </button>
        <span className="flex flex-col items-center gap-0.5">
          <span className="text-[15px] font-bold">운동 계획 추가</span>
          <span className="text-[11px] text-label-disabled">{labelOf(day).replace(/\s\S요일$/, "")}에 추가</span>
        </span>
        <span className="w-11 h-11" aria-hidden />
      </div>

      <div className="px-5 pb-4">
        <div className="flex items-center gap-2.5 h-12 px-4 rounded-[14px] bg-fill-subtle">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#8b95a1" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <circle cx="7" cy="7" r="6" />
            <path d="M12 12l5 5" />
          </svg>
          <span className="text-[14px] text-label-disabled">운동 이름을 검색해보세요</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-5 pb-[130px] flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <span className="text-[11px] font-bold text-label-subtle">자주 계획하는 운동</span>
          <div className="flex flex-wrap gap-2">
            {RECENT.map((r) => (
              <span key={r} className="px-3.5 py-2.5 rounded-[10px] bg-fill-subtle text-[14px] font-medium text-label-subtle">
                {r}
              </span>
            ))}
          </div>
        </section>

        {GROUPS.map((g) => (
          <section key={g.title} className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-label-subtle">{g.title}</span>
            <div className="rounded-[18px] border border-line-normal px-[18px]">
              {g.items.map((it, i) => {
                const on = picked.includes(it.name);
                return (
                  <div key={it.name}>
                    {i > 0 && <div className="h-px bg-line-subtle" />}
                    <button type="button" onClick={() => toggle(it.name)} className="w-full flex items-center gap-5 py-3.5">
                      <span className="w-10 h-10 rounded-[10px] bg-fill-subtle shrink-0" />
                      <span className="flex-1 min-w-0 text-left">
                        <span className="block text-[14px] font-bold truncate">{it.name}</span>
                        <span className="block text-[11px] text-label-disabled truncate">{it.sub}</span>
                      </span>
                      <span className={`w-[26px] h-[26px] rounded-full shrink-0 grid place-items-center ${on ? "bg-label" : "border border-line-strong"}`}>
                        {on && (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M1 5 4.5 8.5 11 1.5" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <button
          type="button"
          onClick={() => router.push("/plan/new")}
          className="flex items-center gap-5 px-[18px] py-3.5 rounded-[18px] border-2 border-dashed border-line-strong"
        >
          <span className="w-10 h-10 grid place-items-center shrink-0">
            <PlusIcon />
          </span>
          <span className="text-left">
            <span className="block text-[14px] font-bold">직접 만들기</span>
            <span className="block text-[11px] text-label-disabled">목록에 없는 운동을 새로 등록해요</span>
          </span>
        </button>
      </ScrollArea>

      <div className="absolute bottom-0 inset-x-0 bg-white/70 backdrop-blur-xl border-t border-white/60 px-5 pt-4 pb-9">
        <button
          type="button"
          disabled={picked.length === 0}
          onClick={() => router.back()}
          className="w-full py-4 rounded-2xl bg-label text-white text-[15px] font-bold disabled:opacity-35"
        >
          {picked.length}개 계획에 추가
        </button>
      </div>
    </div>
  );
}
