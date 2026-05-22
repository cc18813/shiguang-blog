import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "分类",
  description: "按分类浏览文章。",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        分类
      </h1>
      {categories.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">暂无分类。</p>
      ) : (
        <div className="grid gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/categories/${cat.name}`}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <span className="font-medium text-gray-900 dark:text-white capitalize">
                {cat.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {cat.count} {cat.count === 1 ? "篇" : "篇"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
