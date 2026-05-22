import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PostList } from "@/components/posts/PostList";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <>
      <section className="pb-16">
        <Container>
          <div className="py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              拾光小记
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              记录思考、阅读与生活的个人随笔。
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              最近文章
            </h2>
            {getAllPosts().length > 5 && (
              <Link
                href="/posts"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                查看全部 &rarr;
              </Link>
            )}
          </div>
          <PostList posts={recentPosts} />
        </Container>
      </section>
    </>
  );
}
