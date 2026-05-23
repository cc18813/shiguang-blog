import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览文章。",
};

const TAG_NEONS = [
  "border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/15 hover:border-neon-cyan",
  "border-neon-magenta/30 text-neon-magenta hover:bg-neon-magenta/15 hover:border-neon-magenta",
  "border-neon-green/30 text-neon-green hover:bg-neon-green/15 hover:border-neon-green",
  "border-neon-yellow/30 text-neon-yellow hover:bg-neon-yellow/15 hover:border-neon-yellow",
  "border-neon-orange/30 text-neon-orange hover:bg-neon-orange/15 hover:border-neon-orange",
  "border-neon-purple/30 text-neon-purple hover:bg-neon-purple/15 hover:border-neon-purple",
];

function hashColor(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % TAG_NEONS.length;
}

export default function TagsPage() {
  const tags = getAllTags();
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  return (
    <Container>
      <h1 className="text-3xl font-black tracking-tight text-white mb-2">
        <span className="text-neon-cyan neon-text-cyan"># </span>
        标签云
      </h1>
      <div className="mt-2 h-1 w-16 bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] mb-10" />

      {tags.length === 0 ? (
        <p className="text-gray-500 font-mono">$ no_tags_found</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const ratio = tag.count / maxCount;
            const size = 0.75 + ratio * 0.75;
            const colorIdx = hashColor(tag.name);
            return (
              <Link
                key={tag.name}
                href={`/tags/${tag.name}`}
                className={`inline-block px-3 py-1.5 border font-mono tracking-wider
                  transition-all duration-200 hover:scale-110
                  ${TAG_NEONS[colorIdx]}`}
                style={{ fontSize: `${size}rem` }}
              >
                &lt;{tag.name}/&gt;
                <span className="ml-1.5 opacity-50">[{tag.count}]</span>
              </Link>
            );
          })}
        </div>
      )}
    </Container>
  );
}
