export default function TestimonialsSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton Testimoni */}
      <div className="flex flex-col gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex w-full ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className="w-full md:w-[85%] lg:w-[75%] flex flex-col p-6 rounded-[24px] bg-[var(--color-bg-surface)] border border-[var(--color-border)]/50 shadow-sm gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--color-bg-elevated)] animate-pulse" />
                  <div className="flex-1 space-y-2">
                     <div className="h-4 w-1/3 bg-[var(--color-bg-elevated)] animate-pulse rounded" />
                     <div className="h-3 w-1/4 bg-[var(--color-bg-elevated)] animate-pulse rounded" />
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="h-4 w-full bg-[var(--color-bg-elevated)] animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-[var(--color-bg-elevated)] animate-pulse rounded" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
