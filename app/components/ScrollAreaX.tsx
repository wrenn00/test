"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

export default function ScrollAreaX({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const moved = useRef(false);
  const [grabbing, setGrabbing] = useState(false);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    moved.current = false;
    setGrabbing(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) moved.current = true;
    el.scrollLeft = drag.current.left - dx;
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
      onClickCapture={(e) => {
        if (moved.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className={`no-scrollbar-x ${grabbing ? "cursor-grabbing select-none" : "cursor-grab"} ${className}`}
    >
      {children}
    </div>
  );
}
