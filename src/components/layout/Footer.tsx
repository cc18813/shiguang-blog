import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t-2 border-void-500">
      {/* Neon top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5
        bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent" />

      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
          <div className="font-mono text-xs text-gray-600">
            <span className="text-neon-green">$</span> system.status{" "}
            <span className="text-neon-cyan neon-text-cyan">ONLINE</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-gray-600">
            <span>&copy; {new Date().getFullYear()} 逸洛学社</span>
            <span className="text-void-400">|</span>
            <Link
              href="/rss.xml"
              className="hover:text-neon-cyan transition-colors"
            >
              RSS FEED
            </Link>
            <span className="text-void-400">|</span>
            <span>POWERED BY NEXT.JS</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
