import Link from "next/link";
import type { PaginationProps } from "@/types";

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1 mt-12 font-mono text-sm">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 border border-void-400 text-gray-500
            hover:border-neon-cyan hover:text-neon-cyan
            transition-all duration-200"
        >
          &lt; PREV
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`px-4 py-2 border transition-all duration-200 ${
            page === currentPage
              ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan neon-text-cyan font-bold"
              : "border-void-400 text-gray-500 hover:border-neon-cyan/50 hover:text-neon-cyan"
          }`}
        >
          {String(page).padStart(2, "0")}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 border border-void-400 text-gray-500
            hover:border-neon-cyan hover:text-neon-cyan
            transition-all duration-200"
        >
          NEXT &gt;
        </Link>
      )}
    </nav>
  );
}
