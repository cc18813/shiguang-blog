import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PostBody } from "@/components/posts/PostBody";
import { Badge } from "@/components/ui/Badge";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container>
      <article>
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge href={`/categories/${post.category.toLowerCase()}`}>
              {post.category}
            </Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} href={`/tags/${tag.toLowerCase()}`}>
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{date}</time>
            <span>&middot;</span>
            <span>阅读 {post.readingTime} 分钟</span>
          </div>
        </header>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-lg mb-10 shadow-md"
          />
        )}

        <PostBody html={post.html} />
      </article>
    </Container>
  );
}
