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
      <h1 className="text-3xl font-black tracking-tight text-white mb-2">
        <span className="text-neon-cyan neon-text-cyan"># </span>
        分类
      </h1>
      <div className="mt-2 h-1 w-16 bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] mb-10" />

      {categories.length === 0 ? (
        <p className="text-gray-500 font-mono">$ no_categories_found</p>
      ) : (
        <div className="grid gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/categories/${cat.name}`}
              className="group flex items-center justify-between p-4
                border-2 border-void-400 bg-void-800
                brutal-shadow hover:brutal-shadow-neon-hover hover:border-neon-cyan
                transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="font-bold text-white
                group-hover:text-neon-cyan group-hover:neon-text-cyan
                transition-all duration-200 capitalize font-mono">
                <span className="text-neon-green">~/</span>
                {cat.name}
              </span>
              <span className="font-mono text-xs px-3 py-1
                border border-neon-cyan/30 text-neon-cyan
                group-hover:bg-neon-cyan/15
                transition-all duration-200">
                [{cat.count}]
              </span>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
