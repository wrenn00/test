"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

export default function ScrollArea({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ y: number; top: number } | null>(null);
  const [grabbing, setGrabbing] = useState(false);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || el.scrollHeight <= el.clientHeight) return;
    if ((e.target as HTMLElement).closest("input, textarea")) return;
    drag.current = { y: e.clientY, top: el.scrollTop };
    setGrabbing(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current) return;
    const dy = e.clientY - drag.current.y;
    el.scrollTop = drag.current.top - dy;
    if (Math.abs(dy) > 4) el.setPointerCapture?.(e.pointerId);
  };

  const end = () => {
    drag.current = null;
    setGrabbing(false);
  };

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onPointerLeave={end}
      className={`no-scrollbar overscroll-contain ${grabbing ? "cursor-grabbing select-none" : "cursor-grab"} ${className}`}
    >
      {children}
    </div>
  );
}
