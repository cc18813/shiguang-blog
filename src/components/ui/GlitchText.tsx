export function GlitchText({
  children,
  as: Tag = "h1",
  className = "",
}: {
  children: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
}) {
  return (
    <Tag
      className={`glitch-text ${className}`}
      data-text={children}
    >
      {children}
    </Tag>
  );
}

export function LineWipeText({
  lines,
  as: Tag = "h1",
  className = "",
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className="line-wipe-container in">
      {lines.map((line, i) => (
        <span key={i} className="line-wipe-row">
          <Tag className={`line-wipe-inner ${className}`}>{line}</Tag>
        </span>
      ))}
    </div>
  );
}
