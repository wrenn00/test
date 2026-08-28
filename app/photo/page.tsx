import PhotoScreen from "./PhotoScreen";

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string; i?: string }> }) {
  const { d, i } = await searchParams;
  const day = Math.min(31, Math.max(1, Number(d) || 6));
  const index = Math.max(0, Number(i) || 0);
  return (
    <main className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-[375px] h-[812px] rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <PhotoScreen day={day} initial={index} />
      </div>
    </main>
  );
}
