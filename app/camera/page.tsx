import CameraScreen from "./CameraScreen";

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string; plan?: string }> }) {
  const { d, plan } = await searchParams;
  const day = Math.min(31, Math.max(1, Number(d) || 27));
  return (
    <main className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="relative w-[375px] h-[812px] rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <CameraScreen day={day} plan={plan} />
      </div>
    </main>
  );
}
