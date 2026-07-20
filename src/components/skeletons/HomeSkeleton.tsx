export default function HomeSkeleton() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-6">
      <div className="w-full max-w-3xl flex flex-col items-center gap-6">
        {/* Badge Skeleton */}
        <div className="h-8 w-48 rounded-full bg-[var(--color-bg-elevated)] animate-pulse border border-[var(--color-border)]/50" />
        
        {/* Heading Skeleton */}
        <div className="h-16 w-3/4 md:w-2/3 rounded-xl bg-[var(--color-bg-elevated)] animate-pulse" />
        
        {/* Subtitle Skeleton */}
        <div className="h-8 w-1/2 rounded-lg bg-[var(--color-bg-elevated)] animate-pulse mt-2" />
        
        {/* Paragraph Skeleton */}
        <div className="flex flex-col items-center gap-2 w-full max-w-2xl mt-4">
          <div className="h-4 w-full rounded bg-[var(--color-bg-elevated)] animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
          <div className="h-14 w-full sm:w-40 rounded-full bg-[var(--color-bg-elevated)] animate-pulse" />
          <div className="h-14 w-full sm:w-44 rounded-full bg-[var(--color-bg-elevated)] animate-pulse border-2 border-[var(--color-border)]/50" />
        </div>
      </div>
    </div>
  );
}
