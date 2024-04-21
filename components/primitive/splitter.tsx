export function Splitter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="h-[1px] w-full bg-charcoal-600" />
      <span className="text-charcoal-200">{children}</span>
      <div className="h-[1px] w-full bg-charcoal-600" />
    </div>
  );
}
