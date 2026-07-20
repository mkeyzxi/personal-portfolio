export default function ExperienceSkeleton() {
  return (
    <div className="flex flex-col w-full py-8">
      {[1, 2, 3].map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={item} className={`mb-12 flex w-full md:justify-between items-start md:items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            {/* Ruang kosong untuk Desktop */}
            <div className="hidden md:block md:w-5/12"></div>
            
            {/* Garis & Titik Tengah */}
            <div className="absolute left-6 md:relative md:left-auto md:w-2/12 flex justify-center z-10 shrink-0">
              <div className="h-6 w-6 rounded-full bg-[var(--color-bg-elevated)] animate-pulse border-4 border-[var(--color-bg-surface)]" />
            </div>

            {/* Card Skeleton */}
            <div className="w-full ml-12 md:ml-0 md:w-5/12 px-2">
              <div className="rounded-2xl border border-[var(--color-border)]/50 bg-[var(--color-bg-surface)] p-6 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-bg-elevated)]/70 animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-5 w-3/4 rounded bg-[var(--color-bg-elevated)]/70 animate-pulse" />
                    <div className="h-4 w-1/2 rounded bg-[var(--color-bg-elevated)]/70 animate-pulse" />
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="h-3 w-full rounded bg-[var(--color-bg-elevated)]/70 animate-pulse" />
                  <div className="h-3 w-full rounded bg-[var(--color-bg-elevated)]/70 animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-[var(--color-bg-elevated)]/70 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
