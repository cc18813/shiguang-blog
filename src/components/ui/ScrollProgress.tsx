"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.setProperty("--p", `${pct}%`);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      style={{ background: "transparent" }}
    >
      <div
        className="h-full transition-[width] duration-100 ease-linear"
        style={{
          width: "var(--p, 0%)",
          background: "linear-gradient(90deg, #00f0ff, #ff00ff)",
          boxShadow: "0 0 10px rgba(0,240,255,0.5), 0 0 20px rgba(255,0,255,0.3)",
        }}
      />
    </div>
  );
}
