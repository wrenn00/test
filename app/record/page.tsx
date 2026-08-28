import RecordScreen from "./RecordScreen";

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string; edit?: string; plan?: string; shot?: string }> }) {
  const { d, edit, plan, shot } = await searchParams;
  const day = Math.min(31, Math.max(1, Number(d) || 27));
  return (
    <main className="min-h-[100svh] flex items-center justify-center sm:py-10 sm:px-4">
      <div className="relative w-full max-w-[375px] h-[100svh] sm:h-[812px] bg-bg sm:rounded-[28px] sm:shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <RecordScreen initialDay={day} edit={edit === "1"} initialPlan={plan} shot={shot}  />
      </div>
    </main>
  );
}
