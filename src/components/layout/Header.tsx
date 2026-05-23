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
    <header
      className="sticky top-0 z-50
        border-b-2 border-void-500
        bg-void-900/95 backdrop-blur-md"
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo — neon styled */}
          <Link
            href="/"
            className="relative font-black text-xl tracking-tighter
              text-neon-cyan neon-text-cyan
              hover:text-neon-magenta hover:neon-text-magenta
              transition-all duration-300"
          >
            <span className="font-mono text-neon-green">&gt;_</span>
            逸洛学社
          </Link>

          <nav className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-1.5 text-xs font-mono tracking-wider
                  text-gray-500
                  hover:text-neon-cyan hover:neon-text-cyan
                  hover:bg-void-700
                  transition-all duration-150"
              >
                <span className="text-neon-cyan/50">/</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
