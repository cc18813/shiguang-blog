import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 mt-20">
      <Container>
        <div className="flex items-center justify-between h-16 text-sm text-gray-500 dark:text-gray-400">
          <span>&copy; {new Date().getFullYear()} 拾光小记. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/rss.xml" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              RSS
            </Link>
            <span>Built with Next.js</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
