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
    <main className="min-h-[100svh] flex items-center justify-center sm:py-10 sm:px-4">
      <div className="relative w-full max-w-[375px] h-[100svh] sm:h-[812px] bg-bg sm:rounded-[28px] sm:shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <HomeScreen initial={initial} />
      </div>
    </main>
  );
}
