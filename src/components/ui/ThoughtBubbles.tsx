"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Bubble {
  id: number;
  char: string;
  quote: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  el: HTMLSpanElement | null;
}

const BUBBLES: Omit<Bubble, "x" | "y" | "vx" | "vy" | "el">[] = [
  { id: 1, char: "思", quote: "思考是存在的证明", size: 48, hue: 190 },
  { id: 2, char: "读", quote: "阅读是与伟大灵魂的对话", size: 42, hue: 290 },
  { id: 3, char: "创", quote: "创造是人类的终极自由", size: 52, hue: 120 },
  { id: 4, char: "悟", quote: "顿悟是积累的瞬间爆发", size: 38, hue: 50 },
  { id: 5, char: "写", quote: "写作是把思想锻造成文字", size: 44, hue: 330 },
  { id: 6, char: "知", quote: "知识是照亮黑暗的火把", size: 40, hue: 160 },
  { id: 7, char: "慧", quote: "智慧在独处中生长", size: 46, hue: 210 },
  { id: 8, char: "学", quote: "学习是永不停止的旅程", size: 36, hue: 270 },
];

export function ThoughtBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const initBubbles = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const bubbles: Bubble[] = BUBBLES.map((b) => ({
      ...b,
      x: Math.random() * (rect.width - 100) + 50,
      y: Math.random() * (rect.height - 100) + 50,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      el: null,
    }));

    // Create DOM elements
    container.querySelectorAll(".tb-char").forEach((el) => el.remove());

    bubbles.forEach((b) => {
      const span = document.createElement("span");
      span.className = "tb-char";
      span.textContent = b.char;
      span.style.cssText = `
        position: absolute;
        left: ${b.x}px;
        top: ${b.y}px;
        font-size: ${b.size}px;
        font-family: var(--font-brush), cursive;
        color: hsl(${b.hue}, 80%, 70%);
        text-shadow: 0 0 15px hsla(${b.hue}, 80%, 70%, 0.5);
        pointer-events: auto;
        cursor: none;
        transition: color 0.3s, text-shadow 0.3s, transform 0.1s;
        will-change: transform, left, top;
        z-index: 5;
        line-height: 1;
        user-select: none;
      `;

      span.addEventListener("mouseenter", () => {
        setTooltip({ text: b.quote, x: b.x, y: b.y - 50 });
        span.style.color = `hsl(${b.hue}, 100%, 90%)`;
        span.style.textShadow = `0 0 25px hsla(${b.hue}, 100%, 80%, 0.8), 0 0 50px hsla(${b.hue}, 100%, 70%, 0.4)`;
      });

      span.addEventListener("mouseleave", () => {
        setTooltip(null);
        span.style.color = `hsl(${b.hue}, 80%, 70%)`;
        span.style.textShadow = `0 0 15px hsla(${b.hue}, 80%, 70%, 0.5)`;
      });

      container.appendChild(span);
      b.el = span;
    });

    bubblesRef.current = bubbles;
  }, []);

  useEffect(() => {
    initBubbles();

    const handleMouse = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("resize", initBubbles);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", initBubbles);
    };
  }, [initBubbles]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      bubblesRef.current.forEach((b) => {
        if (!b.el) return;

        // Attraction to mouse
        const dx = mx - b.x;
        const dy = my - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attractRadius = 150;

        if (dist < attractRadius && dist > 0) {
          const force = (attractRadius - dist) / attractRadius;
          const accel = force * 0.15;
          b.vx += (dx / dist) * accel;
          b.vy += (dy / dist) * accel;
        }

        // Damping
        b.vx *= 0.995;
        b.vy *= 0.995;

        // Minimum speed
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed < 0.3) {
          b.vx += (Math.random() - 0.5) * 0.1;
          b.vy += (Math.random() - 0.5) * 0.1;
        }

        // Update position
        b.x += b.vx;
        b.y += b.vy;

        // Bounce off edges
        const margin = 30;
        if (b.x < margin) { b.x = margin; b.vx *= -1; }
        if (b.x > rect.width - margin) { b.x = rect.width - margin; b.vx *= -1; }
        if (b.y < margin) { b.y = margin; b.vy *= -1; }
        if (b.y > rect.height - margin) { b.y = rect.height - margin; b.vy *= -1; }

        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 md:h-80 overflow-hidden
        border-2 border-void-500 bg-void-800/50
        rounded-sm"
      style={{ cursor: "none" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2
        font-mono text-[10px] tracking-[0.2em] text-gray-600
        pointer-events-none z-10 select-none">
        :: 触碰灵感 ::
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 px-4 py-2
            bg-void-900 border border-neon-cyan/50
            text-neon-cyan text-sm font-sans
            shadow-[0_0_20px_rgba(0,240,255,0.2)]
            pointer-events-none
            whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
