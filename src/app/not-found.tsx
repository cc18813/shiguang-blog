import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { GlitchText } from "@/components/ui/GlitchText";

export default function NotFoundPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <GlitchText
          as="div"
          className="text-9xl font-black text-neon-magenta neon-text-magenta mb-4 select-none"
        >
          404
        </GlitchText>

        <div className="font-mono text-gray-500 mb-8">
          <span className="text-neon-green">$</span> locate page{" "}
          <span className="text-neon-yellow">ERROR</span>: not_found
        </div>

        <p className="text-gray-400 mb-10 max-w-md">
          你试图访问的页面不存在于这个赛博空间中。它可能已被删除、移动，或者从未存在过。
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neon-cyan
            bg-neon-cyan/10 text-neon-cyan font-bold text-lg
            brutal-shadow-neon hover:brutal-shadow-neon-hover
            hover:bg-neon-cyan/20
            transition-all duration-200
            neon-text-cyan"
        >
          <span className="font-mono">&gt;</span>
          返回入口
        </Link>
      </div>
    </Container>
  );
}
