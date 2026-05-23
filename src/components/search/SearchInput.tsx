"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SearchIndexEntry } from "@/types";
import { PostCard } from "@/components/posts/PostCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [index, setIndex] = useState<SearchIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data: SearchIndexEntry[]) => {
        setIndex(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const doSearch = useCallback(
    (q: string) => {
      const normalized = q.toLowerCase().trim();
      if (!normalized) {
        setResults([]);
        return;
      }

      const filtered = index
        .filter(
          (entry) =>
            entry.title.toLowerCase().includes(normalized) ||
            entry.description.toLowerCase().includes(normalized) ||
            entry.category.toLowerCase().includes(normalized) ||
            entry.tags.some((t) => t.toLowerCase().includes(normalized)) ||
            entry.excerpt.toLowerCase().includes(normalized)
        )
        .map((entry) => {
          let score = 0;
          if (entry.title.toLowerCase().includes(normalized)) score += 10;
          if (entry.description.toLowerCase().includes(normalized)) score += 5;
          if (entry.category.toLowerCase().includes(normalized)) score += 3;
          if (entry.tags.some((t) => t.toLowerCase().includes(normalized))) score += 3;
          if (entry.excerpt.toLowerCase().includes(normalized)) score += 1;
          return { entry, score };
        })
        .sort((a, b) => b.score - a.score)
        .map(({ entry }) => entry);

      setResults(filtered);
    },
    [index]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(value), 300);
  };

  return (
    <div>
      <div className="relative mb-8">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-green font-mono text-lg">
            $
          </span>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="grep -r ..."
            className="w-full pl-10 pr-5 py-4
              border-2 border-void-400 bg-void-800
              text-white placeholder-gray-600
              font-mono text-lg
              focus:outline-none focus:border-neon-cyan
              focus:shadow-[0_0_20px_rgba(0,240,255,0.15)]
              transition-all duration-300"
            autoFocus
          />
          {loading && (
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-void-400
                border-t-neon-cyan animate-spin" />
            </div>
          )}
        </div>
      </div>

      {error && (
        <EmptyState message="搜索服务离线，请稍后重试。" />
      )}

      {!error && query.trim() && results.length > 0 && (
        <div>
          <p className="font-mono text-sm text-gray-500 mb-6 border-l-4 border-neon-cyan pl-4">
            <span className="text-neon-green">$</span> grep:{" "}
            <span className="text-neon-cyan neon-text-cyan">{results.length} results</span> for{" "}
            &quot;{query}&quot;
          </p>
          <div className="space-y-6">
            {results.map((entry) => (
              <div key={entry.slug}>
                <PostCard
                  post={{
                    slug: entry.slug,
                    title: entry.title,
                    date: entry.date,
                    description: entry.description,
                    category: entry.category,
                    tags: entry.tags,
                    content: "",
                    html: "",
                    readingTime: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {!error && query.trim() && results.length === 0 && !loading && (
        <EmptyState message={`未找到与 "${query}" 相关的内容。`} />
      )}

      {!error && !query.trim() && !loading && (
        <p className="text-center text-gray-600 font-mono text-sm mt-12">
          <span className="text-neon-cyan animate-neon-pulse">▊</span> 输入关键词进行搜索...
        </p>
      )}
    </div>
  );
}
