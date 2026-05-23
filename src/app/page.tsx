import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PostList } from "@/components/posts/PostList";
import { MatrixRain } from "@/components/ui/MatrixRain";
import { LineWipeText } from "@/components/ui/GlitchText";
import { MarqueeBar } from "@/components/ui/MarqueeBar";
import { HeroGlow } from "@/components/ui/HeroGlow";
import { ThoughtBubbles } from "@/components/ui/ThoughtBubbles";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <>
      {/* ================================================================ */}
      {/* HERO — MATRIX + GLITCH + BRUTALIST                                 */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden pb-16 pt-8 md:pt-16 md:pb-24">
        {/* Matrix rain background */}
        <MatrixRain />

        {/* Cursor-following glow */}
        <HeroGlow />

        <Container>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Neon decorative top line */}
            <div className="mb-10 flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
              <span className="font-mono text-xs tracking-[0.3em] text-neon-cyan/70 neon-text-cyan">
                /// CYBERSPACE ENTRY POINT ///
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
            </div>

            {/* Hero Title — line-wipe cinematic entrance */}
            <LineWipeText
              as="h1"
              lines={["逸洛学社"]}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter
                text-neon-cyan neon-text-cyan mb-6 select-none"
            />

            {/* Subtitle — terminal style with line-wipe */}
            <div className="mb-10 font-mono text-sm md:text-base animate-float-up"
              style={{ animationDelay: "0.3s" }}>
              <span className="text-neon-green">$</span>
              <span className="text-gray-400"> echo </span>
              <span className="text-neon-cyan neon-text-cyan">&quot;思考、阅读、创造的数字化记录&quot;</span>
              <span className="animate-neon-pulse ml-1 text-neon-cyan">▊</span>
            </div>

            {/* CTA Buttons — brutalist style */}
            <div className="flex items-center justify-center gap-4 flex-wrap animate-float-up"
              style={{ animationDelay: "0.5s" }}>
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neon-cyan
                  bg-neon-cyan/10 text-neon-cyan font-bold text-lg
                  brutal-shadow-neon hover:brutal-shadow-neon-hover
                  hover:bg-neon-cyan/20
                  transition-all duration-200
                  neon-text-cyan"
              >
                <span className="font-mono">&gt;</span>
                进入文章
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neon-magenta/60
                  text-neon-magenta font-bold text-lg
                  hover:border-neon-magenta hover:bg-neon-magenta/10
                  transition-all duration-200"
              >
                关于学社
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Marquee bar separator — dual row with fading edges */}
      <MarqueeBar />

      {/* ================================================================ */}
      {/* INSPIRATION FIELD — interactive thought bubbles                    */}
      {/* ================================================================ */}
      <section className="relative py-12 overflow-hidden">
        {/* Section ghost watermark */}
        <span
          className="section-ghost"
          aria-hidden="true"
          style={{ top: "-0.2em", right: "0.05em" }}
        >
          灵
        </span>
        <Container>
          <div className="relative z-10 mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight text-white mb-2">
              <span className="text-neon-cyan neon-text-cyan">#</span> 灵感场
            </h2>
            <p className="font-mono text-xs text-gray-600">
              移动光标，触碰那些漂浮的思绪
            </p>
          </div>
          <div className="relative z-10">
            <ThoughtBubbles />
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* RECENT POSTS                                                       */}
      {/* ================================================================ */}
      <section className="relative pt-16 pb-8 overflow-hidden">
        {/* Section ghost watermark */}
        <span
          className="section-ghost"
          aria-hidden="true"
          style={{ top: "-0.15em", left: "-0.1em" }}
        >
          文
        </span>
        <Container>
          <div className="relative z-10 flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">
                <span className="text-neon-cyan neon-text-cyan">#</span> 最新文章
              </h2>
              <div className="mt-2 h-1 w-16 bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
            </div>
            {getAllPosts().length > 5 && (
              <Link
                href="/posts"
                className="group inline-flex items-center gap-2 px-4 py-2
                  border border-neon-cyan/30 text-neon-cyan text-sm font-mono
                  hover:border-neon-cyan hover:bg-neon-cyan/10
                  transition-all duration-200"
              >
                查看全部
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            )}
          </div>
          <div className="relative z-10">
            <PostList posts={recentPosts} />
          </div>
        </Container>
      </section>
    </>
  );
}
