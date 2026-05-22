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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
        {category}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {posts.length} 篇文章
      </p>
      <PostList posts={posts} />
    </Container>
  );
}
