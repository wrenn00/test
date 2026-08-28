import HomeScreen from "./HomeScreen";
import type { DayState } from "./types";

const VALID: DayState[] = ["mission", "planned", "done", "noplan"];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  const { s } = await searchParams;
  const initial: DayState = VALID.includes(s as DayState) ? (s as DayState) : "mission";

  return (
    <main className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="relative w-[375px] h-[812px] bg-bg rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <HomeScreen initial={initial} />
      </div>
    </main>
  );
}
