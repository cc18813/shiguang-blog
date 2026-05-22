import fs from "fs";
import path from "path";
import { getAllPosts } from "../src/lib/posts";

const OUTPUT = path.join(process.cwd(), "public", "search-index.json");

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/[#*_~>|]/g, "")
    .replace(/\n+/g, " ")
    .trim();
}

const index = getAllPosts().map((post) => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  category: post.category,
  tags: post.tags,
  date: post.date,
  excerpt: stripMarkdown(post.content).slice(0, 300),
}));

fs.writeFileSync(OUTPUT, JSON.stringify(index));
console.log(`Search index written to ${OUTPUT} (${index.length} posts)`);
