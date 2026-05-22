import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PostList } from "@/components/posts/PostList";
import { Pagination } from "@/components/ui/Pagination";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "全部文章",
  description: "浏览所有博客文章。",
};

const POSTS_PER_PAGE = 10;

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const posts = allPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        全部文章
      </h1>
      <PostList posts={posts} />
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath="/posts"
      />
    </Container>
  );
}
