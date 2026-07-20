export default function JourneySkeleton() {
  return (
    <div className="relative">
      {/* Garis Vertikal */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-[var(--color-border)]/50"></div>

      <div className="flex flex-col gap-12 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative flex gap-6 md:gap-8 w-full">
            {/* Ikon Lingkaran Skeleton */}
            <div className="relative z-10 flex h-12 w-12 shrink-0 rounded-full border-4 border-[var(--color-bg-main)] shadow-sm bg-[var(--color-bg-elevated)] animate-pulse">
            </div>

            {/* Konten Teks Skeleton */}
            <div className="flex flex-1 flex-col pt-1 gap-2 w-full">
              <div className="h-3 w-16 bg-[var(--color-bg-elevated)] animate-pulse rounded mb-1" />
              <div className="h-6 w-2/3 md:w-1/3 bg-[var(--color-bg-elevated)] animate-pulse rounded mb-2" />
              <div className="h-4 w-full md:w-3/4 bg-[var(--color-bg-elevated)] animate-pulse rounded" />
              <div className="h-4 w-5/6 md:w-2/3 bg-[var(--color-bg-elevated)] animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
