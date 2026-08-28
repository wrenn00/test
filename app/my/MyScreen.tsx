"use client";

import { useRouter } from "next/navigation";
import ScrollArea from "../components/ScrollArea";
import TabBar from "../components/TabBar";

export default function MyScreen() {
  const router = useRouter();

  const groups: { items: { title: string; sub?: string; href?: string }[] }[] = [
    { items: [
      { title: "알림 설정", sub: "리마인드 시간, 요약 알림", href: "/settings/notifications" },
      { title: "기록 백업", sub: "마지막 백업 8월 26일" },
      { title: "사진 내보내기", sub: "기기에 저장" },
    ]},
    { items: [{ title: "도움말" }, { title: "문의하기" }, { title: "약관 및 정책" }] },
  ];

  return (
    <div className="relative h-full flex flex-col bg-bg">
      <ScrollArea className="flex-1 pb-[98px]">
        <div className="px-5 pt-14 h-[94px] flex items-center">
          <span className="text-[22px] font-extrabold tracking-tight">마이</span>
        </div>

        <div className="px-5 pt-2 flex flex-col gap-7">
          <div className="flex items-center gap-3.5">
            <span className="w-12 h-12 rounded-full bg-fill-subtle" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-bold">승금이</span>
              <span className="text-[11px] text-label-subtle">8월에 11일 기록했어요</span>
            </div>
          </div>

          {groups.map((g, gi) => (
            <div key={gi} className="rounded-[18px] border border-line-normal px-[18px]">
              {g.items.map((it, i) => (
                <div key={it.title}>
                  {i > 0 && <div className="h-px bg-line-subtle" />}
                  <button
                    type="button"
                    onClick={() => it.href && router.push(it.href)}
                    className="w-full flex items-center justify-between gap-3 py-4 text-left"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-bold">{it.title}</span>
                      {it.sub && <span className="text-[11px] text-label-disabled">{it.sub}</span>}
                    </span>
                    <span className="text-label-disabled text-[18px]">›</span>
                  </button>
                </div>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3.5 pb-4">
            <div className="h-px bg-line-subtle" />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-label-disabled">버전</span>
              <span className="text-[11px] text-label-disabled">1.0.0</span>
            </div>
            <button type="button" className="self-start text-[14px] font-bold text-label-subtle">
              로그아웃
            </button>
          </div>
        </div>
      </ScrollArea>
      <TabBar active="my" />
    </div>
  );
}
