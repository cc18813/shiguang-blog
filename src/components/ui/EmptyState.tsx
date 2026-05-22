export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-4xl mb-4 text-gray-300 dark:text-gray-700">~</div>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
