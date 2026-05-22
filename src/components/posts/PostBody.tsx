export function PostBody({ html }: { html: string }) {
  return (
    <article
      className="prose prose-gray dark:prose-invert prose-lg max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-a:text-gray-900 dark:prose-a:text-white prose-a:underline prose-a:underline-offset-2
        prose-pre:bg-gray-950 dark:prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
        prose-img:rounded-lg prose-img:shadow-md"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
