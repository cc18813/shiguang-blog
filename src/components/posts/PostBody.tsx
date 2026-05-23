export function PostBody({ html }: { html: string }) {
  return (
    <article
      className="prose prose-invert prose-lg max-w-none
        prose-headings:font-black prose-headings:tracking-tight
        prose-headings:text-white
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h2:border-l-4 prose-h2:border-neon-cyan prose-h2:pl-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-a:text-neon-cyan prose-a:no-underline hover:prose-a:text-neon-magenta
        prose-a:underline-offset-2
        prose-blockquote:border-neon-cyan prose-blockquote:bg-neon-cyan/5
        prose-blockquote:rounded-r prose-blockquote:py-1 prose-blockquote:px-4
        prose-blockquote:not-italic prose-blockquote:text-gray-300
        prose-pre:bg-void-900 prose-pre:border-2 prose-pre:border-void-500
        prose-pre:rounded-none
        prose-code:bg-neon-cyan/10 prose-code:text-neon-cyan
        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-none
        prose-code:text-sm prose-code:font-normal
        prose-code:before:content-none prose-code:after:content-none
        prose-img:border-2 prose-img:border-void-500
        prose-hr:border-void-500
        prose-strong:text-white
        prose-li:marker:text-neon-cyan
        prose-table:border-void-500
        prose-th:border-void-500 prose-th:bg-void-800
        prose-td:border-void-500"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
