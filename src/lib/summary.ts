import fs from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), ".summary-cache.json");
const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
const MODEL = "deepseek-chat";

interface CacheEntry {
  summary: string;
  generatedAt: number;
}

let _cache: Record<string, CacheEntry> | null = null;

function readCache(): Record<string, CacheEntry> {
  if (_cache) return _cache;
  try {
    if (fs.existsSync(CACHE_FILE)) {
      _cache = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    } else {
      _cache = {};
    }
  } catch {
    _cache = {};
  }
  return _cache!;
}

function writeCache(): void {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(readCache(), null, 2), "utf-8");
}

export function getCachedSummary(slug: string): string | null {
  const cache = readCache();
  return cache[slug]?.summary ?? null;
}

export async function generateSummary(
  title: string,
  content: string
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY not configured");
  }

  const snippet = content.slice(0, 3000);

  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "你是一位优秀的编辑，擅长用简洁的中文总结文章核心内容。",
        },
        {
          role: "user",
          content: `请用 2-3 句话总结以下文章的核心观点，使用中文，不要评价，只做客观总结：\n\n标题：${title}\n\n${snippet}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const summary = data.choices?.[0]?.message?.content?.trim();
  if (!summary) throw new Error("Empty response from DeepSeek");

  return summary;
}

export function saveSummary(slug: string, summary: string): void {
  const cache = readCache();
  cache[slug] = { summary, generatedAt: Date.now() };
  writeCache();
}
