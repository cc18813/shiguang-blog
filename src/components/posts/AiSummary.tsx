"use client";

import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export function AiSummary({ slug }: Props) {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchSummary() {
      try {
        const res = await fetch(`/api/summary?slug=${encodeURIComponent(slug)}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        if (!cancelled) setSummary(data.summary);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSummary();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="mb-10 p-5 border border-neon-cyan/20 bg-void-800/50">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neon-cyan/70 neon-text-cyan animate-neon-pulse">
            AI 摘要生成中
          </span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-blink" style={{ animationDelay: "0s" }} />
            <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-blink" style={{ animationDelay: "0.2s" }} />
            <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-blink" style={{ animationDelay: "0.4s" }} />
          </span>
        </div>
      </div>
    );
  }

  if (error || !summary) return null;

  return (
    <div className="mb-10 p-5 border-l-4 border-neon-cyan bg-neon-cyan/5">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-xs tracking-wider text-neon-cyan/80 neon-text-cyan">
          /// AI 摘要
        </span>
        <span className="text-[10px] px-1.5 py-0.5 border border-neon-cyan/30 text-neon-cyan/60 font-mono">
          DEEPSEEK
        </span>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        {summary}
      </p>
    </div>
  );
}
