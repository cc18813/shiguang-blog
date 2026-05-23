"use client";

import { useEffect, useRef } from "react";

export function CyberCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<{ x: number; y: number; r: number; life: number }[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
      points.current.push({ x: e.clientX, y: e.clientY, r: 3 + Math.random() * 2, life: 1 });
      if (points.current.length > 40) points.current.shift();
    }

    window.addEventListener("mousemove", onMouseMove);

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw trail
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        p.life -= 0.02;
        if (p.life <= 0) {
          points.current.splice(i, 1);
          i--;
          continue;
        }
        const alpha = p.life * 0.6;
        const r = p.r * p.life;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx!.fill();

        // Outer glow
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 240, 255, ${alpha * 0.15})`;
        ctx!.fill();
      }

      // Main cursor dot
      const { x, y } = mouse.current;
      ctx!.beginPath();
      ctx!.arc(x, y, 4, 0, Math.PI * 2);
      ctx!.fillStyle = "#00f0ff";
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(x, y, 12, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(0, 240, 255, 0.15)";
      ctx!.fill();

      requestAnimationFrame(animate);
    }

    // Init mouse position to center
    mouse.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    animate();

    // Track mouse leaving/entering window
    function onMouseLeave() {
      points.current = [];
    }
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9995] pointer-events-none"
    />
  );
}
