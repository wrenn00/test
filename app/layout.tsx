import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "운동 기록 — 홈 와이어프레임",
  description: "사진으로 남기는 운동 기록 앱의 홈 화면 상태별 와이어프레임",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
