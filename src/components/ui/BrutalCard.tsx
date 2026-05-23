import Link from "next/link";

export function BrutalCard({
  children,
  href,
  className = "",
  neon = false,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  neon?: boolean;
}) {
  const baseClass = `block p-5 md:p-6 border-2 bg-void-800 transition-all duration-300
    ${neon
      ? "border-neon-cyan/30 brutal-shadow-neon hover:brutal-shadow-neon-hover hover:border-neon-magenta"
      : "border-void-500 brutal-shadow hover:brutal-shadow-hover hover:border-neon-cyan"
    }
    ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    );
  }

  return <div className={baseClass}>{children}</div>;
}
