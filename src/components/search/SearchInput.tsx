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
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="搜索文章..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-shadow text-lg"
          autoFocus
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <EmptyState message="搜索功能暂不可用，请稍后重试。" />
      )}

      {!error && query.trim() && results.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            找到 {results.length} 篇与 &quot;{query}&quot; 相关的文章
          </p>
          <div className="space-y-6">
            {results.map((entry) => (
              <div key={entry.slug} className="border-b border-gray-100 dark:border-gray-800 pb-6 last:border-b-0">
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
        <EmptyState message={`未找到与 "${query}" 相关的文章。`} />
      )}

      {!error && !query.trim() && !loading && (
        <p className="text-center text-gray-400 dark:text-gray-500 mt-12">
          输入关键词开始搜索...
        </p>
      )}
    </div>
  );
}
