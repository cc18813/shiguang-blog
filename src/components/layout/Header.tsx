import Link from "next/link";
import { Container } from "./Container";

const NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/posts", label: "文章" },
  { href: "/categories", label: "分类" },
  { href: "/tags", label: "标签" },
  { href: "/search", label: "搜索" },
  { href: "/about", label: "关于" },
];

export function Header() {
  return (
    <header className="border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            拾光小记
          </Link>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
