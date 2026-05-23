import Link from "next/link";
import type { Post } from "@/types";
import { Badge } from "@/components/ui/Badge";

export function PostCard({ post }: { post: Post }) {
  const date = new Date(post.date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group mb-8 last:mb-0">
      <Link href={`/posts/${post.slug}`} className="block">
        {/* Brutalist card */}
        <div className="border-2 border-void-400 bg-void-800
          brutal-shadow
          hover:brutal-shadow-neon-hover hover:border-neon-cyan
          transition-all duration-300
          p-5 md:p-6">

          {post.coverImage && (
            <div className="mb-4 overflow-hidden border border-void-500">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover
                  group-hover:scale-105 transition-transform duration-500 ease-out
                  grayscale-[30%] group-hover:grayscale-0"
              />
            </div>
          )}

          {/* Meta row — terminal style */}
          <div className="flex items-center gap-3 font-mono text-xs text-gray-500 mb-3">
            <time dateTime={post.date} className="text-neon-green/70">
              {date}
            </time>
            <span className="text-void-400">::</span>
            <span>{post.readingTime} MIN READ</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold tracking-tight
            text-white
            group-hover:text-neon-cyan group-hover:neon-text-cyan
            transition-all duration-300 mb-2">
            <span className="text-neon-cyan/60 font-mono text-lg">&gt; </span>
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-gray-400 line-clamp-2 mb-4 leading-relaxed text-sm">
            {post.description}
          </p>

          {/* Bottom accent line */}
          <div className="w-0 group-hover:w-full h-0.5
            bg-gradient-to-r from-neon-cyan to-neon-magenta
            transition-all duration-500" />
        </div>
      </Link>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 px-5 md:px-6 pb-5 md:pb-6 -mt-1 pt-3">
        <Badge href={`/categories/${post.category.toLowerCase()}`}>
          {post.category}
        </Badge>
        {post.tags.map((tag) => (
          <Badge key={tag} href={`/tags/${tag.toLowerCase()}`}>
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );
}
