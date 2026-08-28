"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ScrollArea from "../../components/ScrollArea";
import { BackIcon } from "../../home/icons";

type Row = { key: string; title: string; sub: string; time?: string };

const ROWS: Row[] = [
  { key: "mission", title: "오늘의 미션", sub: "아침에 오늘 할 운동을 제안해요", time: "오전 7:00" },
  { key: "plan", title: "계획 리마인드", sub: "계획한 시간 전에 알려드려요", time: "오전 8:00" },
  { key: "record", title: "기록 리마인드", sub: "기록이 비어 있으면 저녁에 알려드려요", time: "오후 9:00" },
  { key: "weekly", title: "주간 요약", sub: "한 주를 돌아보는 알림을 보내드려요" },
];

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [on, setOn] = useState<Record<string, boolean>>({
    mission: true,
    plan: true,
    record: true,
    weekly: false,
  });

  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center">
          <BackIcon />
        </button>
        <span className="text-[15px] font-bold">알림 설정</span>
        <span className="w-11 h-11" aria-hidden />
      </div>

      <ScrollArea className="flex-1 px-5 pb-8 flex flex-col gap-5">
        <div className="rounded-[18px] border border-line-normal px-[18px]">
          {ROWS.map((r, i) => (
            <div key={r.key}>
              {i > 0 && <div className="h-px bg-line-subtle" />}
              <div className="flex items-center gap-4 py-4">
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="text-[14px] font-bold">{r.title}</span>
                  <span className="text-[11px] text-label-disabled">{r.sub}</span>
                </div>
                <button
                  type="button"
                  aria-label={`${r.title} 알림`}
                  onClick={() => setOn((v) => ({ ...v, [r.key]: !v[r.key] }))}
                  className={`w-12 h-7 rounded-full relative shrink-0 transition-colors ${on[r.key] ? "bg-label" : "bg-line-normal"}`}
                >
                  <span
                    className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white transition-all ${
                      on[r.key] ? "right-[3px]" : "left-[3px]"
                    }`}
                  />
                </button>
              </div>
              {r.time && on[r.key] && (
                <>
                  <div className="h-px bg-line-subtle" />
                  <button type="button" className="w-full flex items-center justify-between py-3.5">
                    <span className="text-[13px] text-label-subtle">알림 시각</span>
                    <span className="flex items-center gap-1.5 text-[13px] font-bold">
                      {r.time}
                      <span className="text-label-disabled">›</span>
                    </span>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-label-disabled leading-relaxed px-1">
          기기 설정에서 알림이 꺼져 있으면 여기 설정과 상관없이 알림이 오지 않아요.
        </p>
      </ScrollArea>
    </div>
  );
}
