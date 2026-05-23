import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PostBody } from "@/components/posts/PostBody";
import { AiSummary } from "@/components/posts/AiSummary";
import { Badge } from "@/components/ui/Badge";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
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

  // Pick first character of post title as ghost character
  const ghostChar = post.title.charAt(0);

  return (
    <>
      <ScrollProgress />

      <Container>
        <article>
          {/* Header with ghost character decoration */}
          <header className="relative mb-10 pt-8 overflow-hidden">
            {/* Ghost character — brush calligraphy background */}
            <span
              className="ghost-char-post"
              aria-hidden="true"
            >
              {ghostChar}
            </span>

            <div className="relative z-10">
              {/* Badges */}
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

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black tracking-tight
                text-white mb-4">
                <span className="text-neon-cyan neon-text-cyan"># </span>
                {post.title}
              </h1>

              {/* Meta — terminal style */}
              <div className="flex items-center gap-3 font-mono text-sm
                text-gray-500 border-l-4 border-neon-cyan pl-4
                bg-neon-cyan/5 py-2">
                <span className="text-neon-green">$</span>
                <time dateTime={post.date}>{date}</time>
                <span className="text-void-400">::</span>
                <span>{post.readingTime} MIN READ</span>
              </div>
            </div>
          </header>

          <AiSummary slug={post.slug} />

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full mb-10 border-2 border-void-500"
            />
          )}

          <PostBody html={post.html} />

          {/* Post footer — brush accent */}
          <footer className="mt-16 pt-8 border-t-2 border-void-500 text-center">
            <span
              className="text-4xl text-neon-cyan/30 neon-text-cyan"
              style={{ fontFamily: "var(--font-brush)" }}
              aria-hidden="true"
            >
              终
            </span>
            <p className="font-mono text-xs text-gray-600 mt-2">
              /// END OF TRANSMISSION ///
            </p>
          </footer>
        </article>
      </Container>
    </>
  );
}
