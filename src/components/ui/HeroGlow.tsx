"use client";

import { useEffect, useRef } from "react";

export function HeroGlow() {
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;

    const onMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      area.style.setProperty("--gx", `${x}%`);
      area.style.setProperty("--gy", `${y}%`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={areaRef} className="hero-glow-area active" aria-hidden="true" />;
}
