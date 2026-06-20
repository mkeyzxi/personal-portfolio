'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '@/lib/firebase'
import {cn} from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Mengecek apakah admin sudah login
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Pindahkan ini ke state atau re-render, onAuthStateChanged akan menangkap
    } catch (err: any) {
      console.error(err)
      setError('Login gagal. Periksa kembali email dan password.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-main)] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8 shadow-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-[var(--color-interactive)] p-3 text-[var(--color-interactive-text)]">
            <LucideIcons.Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Admin Portal</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Masuk untuk mengelola pesan dan testimoni.
          </p>
        </div>

        {user ? (
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <LucideIcons.CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Anda sudah login sebagai Admin</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">{user.email}</p>
            <div className="mt-4 flex w-full gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex-1 rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[var(--color-bg-elevated)]"
              >
                Ke Beranda
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-[var(--color-interactive)] px-4 py-2 text-sm font-semibold text-[var(--color-interactive-text)] transition-colors hover:bg-[var(--color-interactive-hover)]"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-2">
                <LucideIcons.AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label
                className="text-sm font-medium text-[var(--color-text-secondary)]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none focus:ring-1 focus:ring-[var(--color-focus-ring)] transition-colors"
                placeholder="admin@domain.com"
              />
            </div>

            <div className="space-y-1">
              <label
                className="text-sm font-medium text-[var(--color-text-secondary)]"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-main)] px-4 py-3 text-[var(--color-text-primary)] focus:border-[var(--color-focus-ring)] focus:outline-none focus:ring-1 focus:ring-[var(--color-focus-ring)] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[var(--color-interactive)] px-4 py-3 font-semibold text-[var(--color-interactive-text)] transition-colors hover:bg-[var(--color-interactive-hover)] disabled:opacity-70"
            >
              {isLoading ? (
                <LucideIcons.Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Masuk ke Sistem'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
