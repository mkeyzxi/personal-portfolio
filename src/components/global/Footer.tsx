import { OWNER_INFO } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--color-border)] py-8 px-6 sm:px-10 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">
            {OWNER_INFO.name}
          </span>
          <span className="text-sm text-[var(--color-text-secondary)] mt-1">
            {OWNER_INFO.role}
          </span>
        </div>

        <div className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
          &copy; {currentYear} Dibangun dengan <span className="mx-1 text-[var(--color-text-primary)]">♥</span> dan Next.js
        </div>
      </div>
    </footer>
  );
}
