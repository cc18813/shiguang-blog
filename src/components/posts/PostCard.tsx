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
    <article className="group border-b border-gray-100 dark:border-gray-800 pb-8 last:border-b-0">
      <Link href={`/posts/${post.slug}`} className="block">
        {post.coverImage && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <time dateTime={post.date}>{date}</time>
          <span>&middot;</span>
          <span>阅读 {post.readingTime} 分钟</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {post.description}
        </p>
      </Link>
      <div className="flex flex-wrap items-center gap-2">
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
