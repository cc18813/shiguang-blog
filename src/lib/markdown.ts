import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import type { PostFrontmatter } from "@/types";

export function calculateReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function parseMarkdownFile(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as PostFrontmatter;
  if (!frontmatter.title) throw new Error(`Missing title in ${filePath}`);
  if (!frontmatter.date) throw new Error(`Missing date in ${filePath}`);
  if (!frontmatter.description) throw new Error(`Missing description in ${filePath}`);

  const html = marked.parse(content, { gfm: true }) as string;
  const readingTime = calculateReadingTime(content);

  return { frontmatter, content, html, readingTime };
}
