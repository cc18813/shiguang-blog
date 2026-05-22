import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PostList } from "@/components/posts/PostList";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `标签：${tag}`,
    description: `标签为 "${tag}".`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        #{tag}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {posts.length} 篇文章
      </p>
      <PostList posts={posts} />
    </Container>
  );
}
