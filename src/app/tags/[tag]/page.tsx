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
      <h1 className="text-3xl font-black tracking-tight text-white mb-2">
        <span className="text-neon-cyan neon-text-cyan font-mono">&lt;</span>
        {tag}
        <span className="text-neon-cyan neon-text-cyan font-mono">/&gt;</span>
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
