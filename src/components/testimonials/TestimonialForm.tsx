'use client'

import {useState} from 'react'
import {useLazyAuthState} from '@/hooks/useLazyAuthState'
import {toast} from 'sonner'
import {Icon} from '@iconify/react'
import Image from 'next/image'

interface TestimonialFormProps {
  onSuccess: () => void
  onLoginRequest: () => void
}

export default function TestimonialForm({onSuccess, onLoginRequest}: TestimonialFormProps) {
  const [user, loading] = useLazyAuthState()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="w-full p-6 bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl animate-pulse flex items-center justify-center">
        <Icon icon="mdi:loading" className="h-6 w-6 animate-spin text-[var(--color-text-muted)]" />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      onLoginRequest()
      return
    }

    if (!message || message.trim().length < 10) {
      toast.error('Testimoni terlalu pendek', {description: 'Minimal 10 karakter.'})
      return
    }

    setIsSubmitting(true)
    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: message.trim(),
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          provider: user.providerData[0]?.providerId || 'unknown',
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Gagal mengirim testimoni')
      }

      toast.success('Testimoni berhasil ditambahkan!')
      setMessage('')
      onSuccess() // Refresh daftar testimoni
    } catch (error: unknown) {
      toast.error('Gagal', {description: (error instanceof Error ? error.message : String(error))})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full p-1 mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              user
                ? 'Tulis pendapat Anda tentang portofolio ini (min 10 karakter)...'
                : 'Tulis pendapat Anda (Login untuk mengirim)...'
            }
            className={`w-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-2xl p-4 pb-14 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-interactive)] resize-none transition-all shadow-sm ${user ? 'pt-16' : 'pt-4'}`}
            rows={4}
            maxLength={500}
          />

          {/* Indikator Sesi Aktif (Absolut di dalam area input) */}
          {user && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[var(--color-bg-elevated)] px-2.5 py-1.5 rounded-full border border-[var(--color-border)] shadow-sm pointer-events-none select-none">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  referrerPolicy="no-referrer"
                  alt={user.displayName || 'Avatar'}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full img-mono"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[var(--color-bg-surface)] flex items-center justify-center">
                  <Icon icon="mdi:account" className="h-3 w-3 text-[var(--color-text-muted)]" />
                </div>
              )}
              <span className="text-xs font-medium text-[var(--color-text-primary)] pr-1">
                {user.displayName || 'Pengguna'}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <span className="text-xs text-[var(--color-text-muted)]">{message.length} / 500</span>
            <button
              type="submit"
              disabled={isSubmitting || (user !== null && message.trim().length < 10)}
              className="px-4 py-2 bg-[var(--color-interactive)] text-[var(--color-interactive-text)] text-sm font-semibold rounded-xl hover:bg-[var(--color-interactive-hover)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Icon icon="mdi:loading" className="h-4 w-4 animate-spin" />
                  Mengirim...
                </>
              ) : !user ? (
                <>
                  <Icon icon="mdi:login" className="h-4 w-4" />
                  Login
                </>
              ) : (
                <>
                  <Icon icon="mdi:send" className="h-4 w-4" />
                  Kirim
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
