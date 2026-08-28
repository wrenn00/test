import CameraScreen from "./CameraScreen";

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string; plan?: string }> }) {
  const { d, plan } = await searchParams;
  const day = Math.min(31, Math.max(1, Number(d) || 27));
  return (
    <main className="min-h-[100svh] flex items-center justify-center sm:py-10 sm:px-4">
      <div className="relative w-full max-w-[375px] h-[100svh] sm:h-[812px] sm:rounded-[28px] sm:shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <CameraScreen day={day} plan={plan} />
      </div>
    </main>
  );
}
