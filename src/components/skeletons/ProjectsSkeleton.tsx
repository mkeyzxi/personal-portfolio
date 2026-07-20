export default function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex h-[400px] flex-col overflow-hidden rounded-[24px] border border-[var(--color-border)]/60 bg-[var(--color-bg-surface)]/80 backdrop-blur-xl shadow-sm w-full">
          {/* Thumbnail Skeleton */}
          <div className="relative aspect-[16/10] w-full p-3 pb-0">
            <div className="h-full w-full rounded-[16px] bg-[var(--color-bg-elevated)] animate-pulse" />
          </div>
          {/* Content Skeleton */}
          <div className="flex flex-1 flex-col p-6 pt-5">
            <div className="h-7 w-3/4 rounded bg-[var(--color-bg-elevated)]/80 animate-pulse mb-4" />
            <div className="space-y-2 mb-6 flex-1">
              <div className="h-4 w-full rounded bg-[var(--color-bg-elevated)]/50 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-[var(--color-bg-elevated)]/50 animate-pulse" />
              <div className="h-4 w-4/6 rounded bg-[var(--color-bg-elevated)]/50 animate-pulse" />
            </div>
            <div className="mt-auto pt-4 flex gap-2 border-t border-[var(--color-border)]/30">
              <div className="h-8 w-8 rounded-full bg-[var(--color-bg-elevated)]/80 animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-[var(--color-bg-elevated)]/80 animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-[var(--color-bg-elevated)]/80 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
