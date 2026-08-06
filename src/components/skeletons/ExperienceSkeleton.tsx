export default function ExperienceSkeleton() {
  return (
    <div className="flex flex-col w-full py-8">
      {[1, 2, 3].map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={item} className="relative flex items-center justify-between w-full mb-12">
            {/* Garis & Titik Tengah (Absolute center on desktop, left on mobile) */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[var(--color-bg-surface)] bg-[var(--color-bg-elevated)] animate-pulse z-10 shadow-sm" />

            {/* Kolom Kiri (Desktop) */}
            <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${isEven ? 'md:text-right md:pr-16' : 'hidden md:block opacity-0'}`}>
              {isEven && (
                <div className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-sm">
                   <div className={`h-6 w-1/2 rounded bg-[var(--color-bg-elevated)] animate-pulse ${isEven ? 'md:ml-auto' : ''}`} />
                   <div className={`h-5 w-1/3 rounded bg-[var(--color-bg-elevated)] animate-pulse ${isEven ? 'md:ml-auto' : ''}`} />
                   
                   <div className={`mt-2 flex items-center gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                      <div className="h-4 w-4 rounded-full bg-[var(--color-bg-elevated)] animate-pulse shrink-0" />
                      <div className="h-4 w-1/4 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                   </div>

                   <div className="mt-4 space-y-2">
                      <div className="h-3 w-full rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                      <div className="h-3 w-full rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                      <div className={`h-3 w-3/4 rounded bg-[var(--color-bg-elevated)] animate-pulse ${isEven ? 'md:ml-auto' : ''}`} />
                   </div>
                </div>
              )}
            </div>

            {/* Kolom Kanan (Desktop) & Default (Mobile) */}
            <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${!isEven ? 'md:pl-16' : 'hidden md:block opacity-0'}`}>
              {!isEven && (
                <div className="flex flex-col gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shadow-sm">
                   <div className="h-6 w-1/2 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                   <div className="h-5 w-1/3 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                   
                   <div className="mt-2 flex items-center gap-2 justify-start">
                      <div className="h-4 w-4 rounded-full bg-[var(--color-bg-elevated)] animate-pulse shrink-0" />
                      <div className="h-4 w-1/4 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                   </div>

                   <div className="mt-4 space-y-2">
                      <div className="h-3 w-full rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                      <div className="h-3 w-full rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                      <div className="h-3 w-3/4 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
                   </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
