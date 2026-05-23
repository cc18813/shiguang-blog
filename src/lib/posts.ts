import fs from "fs";
import path from "path";
import { parseMarkdownFile } from "./markdown";
import type { Post, TermCount } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

let _cache: Post[] | null = null;

function readAllPosts(): Post[] {
  // In development, always re-read from disk so new/edited .md files show up immediately
  if (_cache && process.env.NODE_ENV === "production") return _cache;

  if (!fs.existsSync(POSTS_DIR)) {
    _cache = [];
    return _cache;
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const filePath = path.join(POSTS_DIR, file);
    const { frontmatter, content, html, readingTime } = parseMarkdownFile(filePath);

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description,
      category: frontmatter.category || "Uncategorized",
      tags: frontmatter.tags || [],
      coverImage: frontmatter.coverImage,
      draft: frontmatter.draft ?? false,
      content,
      html,
      readingTime,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  _cache = posts;
  return _cache;
}

export function getAllPosts(): Post[] {
  const posts = readAllPosts();
  if (process.env.NODE_ENV === "production") {
    return posts.filter((p) => !p.draft);
  }
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllCategories(): TermCount[] {
  const counts: Record<string, number> = {};
  for (const post of getAllPosts()) {
    const cat = post.category.toLowerCase();
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): TermCount[] {
  const counts: Record<string, number> = {};
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const t = tag.toLowerCase();
      counts[t] = (counts[t] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
