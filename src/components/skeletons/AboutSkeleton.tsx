export default function AboutSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
      {/* Kolom Kiri: Foto & Detail Cepat */}
      <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-8">
        <div className="relative mb-8 h-64 w-64 md:h-72 md:w-72">
          <div className="absolute inset-4 rounded-full border-4 border-[var(--color-bg-surface)] bg-[var(--color-bg-elevated)] animate-pulse" />
        </div>
        
        <div className="w-full space-y-4 rounded-[24px] bg-[var(--color-bg-surface)] p-6 shadow-sm border border-[var(--color-border)]/50">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-md bg-[var(--color-bg-elevated)] animate-pulse shrink-0" />
              <div className="h-4 w-2/3 rounded bg-[var(--color-bg-elevated)] animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Kolom Kanan: Bio & Highlights */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8 justify-center">
        <div className="space-y-6">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-4 rounded bg-[var(--color-bg-elevated)] animate-pulse ${i === 4 ? 'w-2/3' : 'w-full'}`} />
            ))}
          </div>
          
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className={`h-4 rounded bg-[var(--color-bg-elevated)] animate-pulse ${i === 2 ? 'w-5/6' : 'w-full'}`} />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="rounded-[24px] border border-[var(--color-border)]/50 bg-[var(--color-bg-surface)] p-5 text-center shadow-sm">
              <div className="h-8 w-16 mx-auto rounded bg-[var(--color-bg-elevated)] animate-pulse mb-2" />
              <div className="h-3 w-24 mx-auto rounded bg-[var(--color-bg-elevated)] animate-pulse" />
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)]/50 bg-[var(--color-bg-surface)] p-5 text-center shadow-sm">
              <div className="h-8 w-16 mx-auto rounded bg-[var(--color-bg-elevated)] animate-pulse mb-2" />
              <div className="h-3 w-24 mx-auto rounded bg-[var(--color-bg-elevated)] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
