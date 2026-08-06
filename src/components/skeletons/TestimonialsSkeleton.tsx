export default function TestimonialsSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton Testimoni */}
      <div className="flex flex-col gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex w-full ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className={`w-full md:w-[85%] lg:w-[75%] flex flex-col p-5 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]/50 shadow-sm gap-4 ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
               <div className={`flex items-center justify-between ${i % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}>
                 <div className={`flex items-center gap-3 ${i % 2 === 0 ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                    <div className="w-10 h-10 shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] animate-pulse" />
                    <div className={`flex flex-col gap-1 ${i % 2 === 0 ? 'items-end' : 'items-start'}`}>
                       <div className="h-3 w-24 bg-[var(--color-bg-elevated)] animate-pulse rounded" />
                       <div className="h-2 w-16 bg-[var(--color-bg-elevated)] animate-pulse rounded" />
                    </div>
                 </div>
               </div>
               <div className="space-y-2 mt-2">
                  <div className={`h-3 w-full bg-[var(--color-bg-elevated)] animate-pulse rounded ${i % 2 === 0 ? 'ml-auto' : ''}`} />
                  <div className={`h-3 w-5/6 bg-[var(--color-bg-elevated)] animate-pulse rounded ${i % 2 === 0 ? 'ml-auto' : ''}`} />
                  <div className={`h-3 w-4/5 bg-[var(--color-bg-elevated)] animate-pulse rounded ${i % 2 === 0 ? 'ml-auto' : ''}`} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
