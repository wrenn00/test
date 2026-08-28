"use client";

import TabBar from "../components/TabBar";

export default function ChatScreen() {
  return (
    <div className="relative h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[94px] flex items-center">
        <span className="text-[22px] font-extrabold tracking-tight">채팅</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-5 pb-[98px] px-10 text-center">
        <span className="w-[68px] h-[68px] rounded-[20px] bg-fill-subtle grid place-items-center">
          <svg width="30" height="32" viewBox="0 0 30 32" fill="none" stroke="#d1d6db" strokeWidth="2" strokeLinejoin="round" aria-hidden>
            <rect x="1" y="1" width="28" height="21" rx="7" />
            <path d="M8 22v8l9-8" />
          </svg>
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-[17px] font-extrabold text-label-subtle">아직 준비 중이에요</span>
          <span className="text-[13px] text-label-disabled leading-relaxed">
            기록을 보고 오늘 뭘 하면 좋을지
            <br />
            같이 정하는 기능을 만들고 있어요
          </span>
        </div>
      </div>

      <TabBar active="chat" />
    </div>
  );
}
