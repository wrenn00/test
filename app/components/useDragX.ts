"use client";

import { useRef, useState, type PointerEvent } from "react";

export function useDragX({
  onPrev,
  onNext,
  threshold = 60,
}: {
  onPrev: () => void;
  onNext: () => void;
  threshold?: number;
}) {
  const start = useRef<number | null>(null);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);

  const handlers = {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      start.current = e.clientX;
      moved.current = false;
      setDragging(true);
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (start.current === null) return;
      const d = e.clientX - start.current;
      if (Math.abs(d) > 4) moved.current = true;
      setDx(d);
    },
    onPointerUp: () => {
      if (start.current !== null) {
        if (dx <= -threshold) onNext();
        else if (dx >= threshold) onPrev();
      }
      start.current = null;
      setDx(0);
      setDragging(false);
    },
    onPointerCancel: () => {
      start.current = null;
      setDx(0);
      setDragging(false);
    },
    onPointerLeave: () => {
      if (start.current === null) return;
      start.current = null;
      setDx(0);
      setDragging(false);
    },
  };

  return { dx, dragging, handlers, didMove: () => moved.current };
}
