import type { Post } from "@/types";
import { PostCard } from "./PostCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <EmptyState message="暂无文章。" />;
  }

  return (
    <div className="space-y-0">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
