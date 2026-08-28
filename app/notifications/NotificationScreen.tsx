"use client";

import { useRouter } from "next/navigation";
import ScrollArea from "../components/ScrollArea";
import { BackIcon } from "../home/icons";

type Noti = { title: string; body: string; time: string; unread: boolean };

const TODAY: Noti[] = [
  { title: "오늘의 미션이 도착했어요", body: "가볍게 15분 걷기", time: "오전 7:00", unread: true },
  { title: "오늘 유산소 계획이 있어요", body: "한강 러닝 40분을 계획해두셨어요", time: "오전 8:00", unread: true },
  { title: "어제 기록이 비어 있어요", body: "지금 남겨도 어제 날짜로 저장돼요", time: "오전 9:12", unread: true },
];
const EARLIER: Noti[] = [
  { title: "이번 주 3번 운동했어요", body: "지난주보다 한 번 늘었어요", time: "8월 24일", unread: false },
  { title: "7월 기록이 정리됐어요", body: "한 달 동안 사진 17장을 남기셨어요", time: "8월 1일", unread: false },
];

export default function NotificationScreen({ empty }: { empty: boolean }) {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col bg-bg">
      <div className="px-5 pt-14 h-[100px] flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="w-11 h-11 -ml-3 grid place-items-center">
          <BackIcon />
        </button>
        <span className="text-[15px] font-bold">알림</span>
        {empty ? (
          <span className="w-11 h-11" aria-hidden />
        ) : (
          <button type="button" className="px-2.5 py-2 -mr-2.5 text-[12px] font-bold text-label-subtle">
            모두 읽음
          </button>
        )}
      </div>

      {empty ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 pb-20">
          <svg width="56" height="58" viewBox="0 0 56 58" fill="none" stroke="#d1d6db" strokeWidth="2" strokeLinejoin="round" aria-hidden>
            <path d="M28 4c13 0 16 10 16 23v11l6 10H6l6-10V27C12 14 15 4 28 4Z" />
            <path d="M23 53c0 5 10 5 10 0" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[17px] font-extrabold text-label-subtle">받은 알림이 없어요</span>
            <span className="text-[13px] text-label-disabled leading-relaxed">
              운동 계획 리마인드와 주간 요약을
              <br />
              여기로 보내드려요
            </span>
          </div>
          <button type="button" className="px-4 py-3 rounded-[14px] border border-line-strong text-[14px] font-bold">
            알림 설정 열기
          </button>
        </div>
      ) : (
        <ScrollArea className="flex-1 px-5 pb-8 flex flex-col gap-6">
          <Group title="오늘" items={TODAY} />
          <Group title="이전" items={EARLIER} />
        </ScrollArea>
      )}
    </div>
  );
}

function Group({ title, items }: { title: string; items: Noti[] }) {
  return (
    <section className="flex flex-col gap-2.5">
      <span className="text-[11px] font-bold text-label-subtle">{title}</span>
      <div className="flex flex-col gap-2">
        {items.map((n) => (
          <div
            key={n.title}
            className={`relative flex gap-3.5 px-4 py-4 rounded-2xl ${
              n.unread ? "bg-fill-subtle" : "border border-line-normal"
            }`}
          >
            <span className={`w-[38px] h-[38px] rounded-[10px] shrink-0 ${n.unread ? "bg-label" : "bg-fill-subtle"}`} />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-start gap-2">
                <span className="flex-1 text-[14px] font-bold">{n.title}</span>
                <span className="text-[11px] text-label-disabled shrink-0">{n.time}</span>
              </div>
              <span className="text-[11px] text-label-subtle">{n.body}</span>
            </div>
            {n.unread && <span className="absolute right-3.5 top-3.5 w-[7px] h-[7px] rounded-full bg-label" />}
          </div>
        ))}
      </div>
    </section>
  );
}
