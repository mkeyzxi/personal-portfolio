'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <AdminGuard>
      <div className="flex h-screen bg-[var(--color-bg-main)] text-[var(--color-text-primary)]">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-[var(--color-bg-surface)] border-r border-[var(--color-border)] flex flex-col hidden md:flex shrink-0">
          <div className="p-6 border-b border-[var(--color-border)] flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[var(--color-interactive)] flex items-center justify-center text-[var(--color-interactive-text)]">
              <LucideIcons.Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-none">Admin Panel</h2>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">CMS Control</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <Link 
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname === '/admin' ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]' : 'hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]'
              }`}
            >
              <LucideIcons.LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link 
              href="/admin/projects"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname.includes('/admin/projects') ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]' : 'hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]'
              }`}
            >
              <LucideIcons.FolderGit2 className="w-5 h-5" />
              <span className="font-medium">Projects</span>
            </Link>

            <Link 
              href="/admin/testimonials"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname.includes('/admin/testimonials') ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]' : 'hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]'
              }`}
            >
              <LucideIcons.MessageSquare className="w-5 h-5" />
              <span className="font-medium">Testimonials</span>
            </Link>

            <Link 
              href="/admin/story"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname.includes('/admin/story') ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)]' : 'hover:bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)]'
              }`}
            >
              <LucideIcons.FileText className="w-5 h-5" />
              <span className="font-medium">Stories</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-[var(--color-border)]">
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-medium"
            >
              <LucideIcons.LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
