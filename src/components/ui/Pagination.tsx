import Link from "next/link";
import type { PaginationProps } from "@/types";

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1 mt-12">
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}?page=${currentPage - 1}`}
          className="px-3 py-1.5 text-sm rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          &larr; 上一页
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            page === currentPage
              ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-1.5 text-sm rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          下一页 &rarr;
        </Link>
      )}
    </nav>
  );
}
