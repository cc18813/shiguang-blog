export function MarqueeBar() {
  const messages = [
    "WELCOME TO CYBERSPACE",
    "逸洛学社",
    "THINK · READ · CREATE",
    "思考 · 阅读 · 创造",
    "BREAK THE SYSTEM",
    "颠覆即创造",
  ];

  // Duplicate for seamless loop
  const items = [...messages, ...messages];

  return (
    <div className="space-y-0">
      {/* Row 1 — forward */}
      <div className="relative overflow-hidden border-y border-neon-cyan/20 bg-void-800/80 py-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((msg, i) => (
            <span
              key={i}
              className="mx-8 font-mono text-xs tracking-widest text-neon-cyan/60 neon-text-cyan"
            >
              {msg}
            </span>
          ))}
        </div>
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void-800/90 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void-800/90 to-transparent z-10" />
      </div>

      {/* Row 2 — reverse, different color */}
      <div className="relative overflow-hidden border-b border-neon-magenta/20 bg-void-800/80 py-2">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {items.map((msg, i) => (
            <span
              key={i}
              className="mx-8 font-mono text-xs tracking-widest text-neon-magenta/60 neon-text-magenta"
            >
              {msg}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void-800/90 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void-800/90 to-transparent z-10" />
      </div>
    </div>
  );
}
