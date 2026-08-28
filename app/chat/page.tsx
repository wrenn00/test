import ChatScreen from "./ChatScreen";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-[375px] h-[812px] bg-bg rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        <ChatScreen />
      </div>
    </main>
  );
}
