import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览文章。",
};

export default function TagsPage() {
  const tags = getAllTags();
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        标签
      </h1>
      {tags.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">暂无标签。</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const ratio = tag.count / maxCount;
            const size = 0.75 + ratio * 0.75;
            return (
              <Link
                key={tag.name}
                href={`/tags/${tag.name}`}
                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                style={{ fontSize: `${size}rem` }}
              >
                {tag.name}
                <span className="ml-1 text-gray-400 dark:text-gray-500 text-xs">
                  ({tag.count})
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </Container>
  );
}
