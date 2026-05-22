import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFoundPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-800 mb-4">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          页面未找到
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          你查找的页面不存在或已被移动。
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </Container>
  );
}
