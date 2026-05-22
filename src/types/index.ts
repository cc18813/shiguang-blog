export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  coverImage?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  coverImage?: string;
  draft?: boolean;
  content: string;
  html: string;
  readingTime: number;
}

export interface SearchIndexEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  excerpt: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export interface TermCount {
  name: string;
  count: number;
}
