export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-6xl mb-6 opacity-20 text-neon-cyan font-mono select-none">
        [ EMPTY ]
      </div>
      <p className="text-gray-500 font-mono text-sm">
        <span className="text-neon-green">$</span> {message}
      </p>
    </div>
  );
}
