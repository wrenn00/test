import NotificationScreen from "./NotificationScreen";

export default async function Page({ searchParams }: { searchParams: Promise<{ empty?: string }> }) {
  const { empty } = await searchParams;
  return (
    <main className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-[375px] h-[812px] bg-bg rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <NotificationScreen empty={empty === "1"} />
      </div>
    </main>
  );
}
