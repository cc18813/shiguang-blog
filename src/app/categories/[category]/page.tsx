import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PostList } from "@/components/posts/PostList";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `分类：${category}`,
    description: `分类为 "${category}".`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) notFound();

  return (
    <Container>
      <h1 className="text-3xl font-black tracking-tight text-white mb-2 capitalize">
        <span className="text-neon-cyan neon-text-cyan font-mono">~/</span>
        {category}
      </h1>
      <div className="mt-2 h-1 w-16 bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] mb-4" />
      <p className="text-gray-500 font-mono text-sm mb-8">
        <span className="text-neon-green">$</span> found{" "}
        <span className="text-neon-cyan neon-text-cyan">{posts.length}</span> posts
      </p>
      <PostList posts={posts} />
    </Container>
  );
}
