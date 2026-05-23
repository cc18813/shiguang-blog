import Link from "next/link";

const NEON_COLORS = [
  "border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/15 hover:border-neon-cyan",
  "border-neon-magenta/30 text-neon-magenta hover:bg-neon-magenta/15 hover:border-neon-magenta",
  "border-neon-green/30 text-neon-green hover:bg-neon-green/15 hover:border-neon-green",
  "border-neon-yellow/30 text-neon-yellow hover:bg-neon-yellow/15 hover:border-neon-yellow",
  "border-neon-orange/30 text-neon-orange hover:bg-neon-orange/15 hover:border-neon-orange",
  "border-neon-purple/30 text-neon-purple hover:bg-neon-purple/15 hover:border-neon-purple",
];

function neonColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return NEON_COLORS[Math.abs(hash) % NEON_COLORS.length];
}

export function Badge({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const colorClass = neonColor(String(children));

  const className = `inline-block px-2.5 py-0.5 border font-mono text-[10px] tracking-wider
    transition-all duration-200 hover:scale-105
    ${colorClass}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}
