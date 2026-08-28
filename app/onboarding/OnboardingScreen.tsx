"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PAGES = [
  { title: "운동한 날을\n사진으로 남겨요", body: "오늘 뭘 했는지 한 장이면 충분해요" },
  { title: "달력에 사진이 쌓여요", body: "한 달을 한눈에 돌아볼 수 있어요" },
  { title: "매일 맞춤 미션을 받아요", body: "기록을 보고 무리 없는 양을 제안해요" },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const last = step === PAGES.length - 1;
  const page = PAGES[step];

  const next = () => (last ? router.push("/login") : setStep((s) => s + 1));

  return (
    <div className="relative h-full flex flex-col">
      <div className="h-[100px] flex items-center justify-end px-5">
        {!last && (
          <button type="button" onClick={() => router.push("/login")} className="px-3 py-2 text-[14px] font-bold text-label-disabled">
            건너뛰기
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="relative w-[255px] h-[220px] rounded-[20px] bg-fill-subtle mt-[50px]">
          <svg className="absolute inset-0" width="255" height="220" aria-hidden>
            <line x1="0" y1="0" x2="255" y2="220" stroke="#e5e8eb" />
            <line x1="255" y1="0" x2="0" y2="220" stroke="#e5e8eb" />
          </svg>
        </div>

        <div className="mt-[50px] px-6 flex flex-col items-center gap-3 text-center">
          <h1 className="text-[24px] font-extrabold leading-snug whitespace-pre-line">{page.title}</h1>
          <p className="text-[15px] font-medium text-label-subtle">{page.body}</p>
        </div>

        <div className="mt-[38px] flex items-center gap-1.5">
          {PAGES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}번째 소개`}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all ${i === step ? "w-[18px] bg-label" : "w-1.5 bg-line-strong"}`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-[46px]">
        <button type="button" onClick={next} className="w-full py-4 rounded-2xl bg-label text-white text-[15px] font-bold">
          {last ? "시작하기" : "다음"}
        </button>
      </div>
    </div>
  );
}
