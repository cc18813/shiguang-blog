import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";
import { getCachedSummary, generateSummary, saveSummary } from "@/lib/summary";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // Return cached summary if available
  const cached = getCachedSummary(slug);
  if (cached) {
    return NextResponse.json({ summary: cached, cached: true });
  }

  // Generate new summary
  try {
    const summary = await generateSummary(post.title, post.content);
    saveSummary(slug, summary);
    return NextResponse.json({ summary, cached: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
