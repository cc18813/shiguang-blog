import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "关于",
  description: "关于我和这个博客。",
};

export default function AboutPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        关于
      </h1>
      <div className="prose prose-gray dark:prose-invert prose-lg max-w-none">
        <p>
          你好，我是一名热爱技术与生活的开发者。这个博客是我记录思考、阅读笔记和生活感悟的地方。
        </p>
        <h2>关于本站</h2>
        <p>
          本站使用 Next.js、TypeScript 和 Tailwind CSS 构建。所有文章均以
          Markdown 撰写并静态生成，追求极致的加载速度和阅读体验。没有数据库、没有服务器——纯粹的静态页面。
        </p>
        <h2>联系我</h2>
        <p>
          欢迎通过社交媒体或邮件与我交流，我一直对各种有趣的想法和合作保持开放。
        </p>
      </div>
    </Container>
  );
}
