import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SearchInput } from "@/components/search/SearchInput";

export const metadata: Metadata = {
  title: "搜索",
  description: "搜索所有博客文章。",
};

export default function SearchPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        搜索
      </h1>
      <SearchInput />
    </Container>
  );
}
