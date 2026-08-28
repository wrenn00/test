export type DayState = "mission" | "planned" | "done" | "noplan";

export type Plan = {
  name: string;
  sub: string;
  done: boolean;
  fromMission?: boolean;
};

export const MISSION = {
  title: "가볍게 15분 걷기",
  tags: ["15분", "가볍게", "야외"],
  reason: ["최근 이틀 기록이 없어요.", "다시 시작하기 좋은 양이에요."],
  short: "최근 이틀 쉬었으니 가볍게 시작해요",
};

export const BASE_PLANS: Plan[] = [
  { name: MISSION.title, sub: "15분", done: false, fromMission: true },
  { name: "근력", sub: "상체 위주 30분", done: false },
  { name: "스트레칭", sub: "자기 전 10분", done: false },
];

export const TODAY = 27;
export const PHOTO_DAYS = [4, 5, 6, 8, 10, 11, 12, 13, 14, 17, 18];

export const PHOTO_COUNT: Record<number, number> = { 6: 3, 11: 2 };

export function photosOf(day: number) {
  return PHOTO_COUNT[day] ?? 1;
}

export function labelOf(day: number) {
  const d = new Date(2026, 7, day);
  const w = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  return `8월 ${day}일 ${w}요일`;
}
