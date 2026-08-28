import RecordScreen from "./RecordScreen";

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string; edit?: string }> }) {
  const { d, edit } = await searchParams;
  const day = Math.min(31, Math.max(1, Number(d) || 27));
  return (
    <main className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-[375px] h-[812px] bg-bg rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <RecordScreen initialDay={day} edit={edit === "1"} />
      </div>
    </main>
  );
}
