'use client'

import {useState} from 'react'
import {Testimonial} from '@/types'
import {useLazyAuthState} from '@/hooks/useLazyAuthState'
import {formatDistanceToNow} from 'date-fns'
import {id as localeId} from 'date-fns/locale'
import {Icon} from '@iconify/react'
import {toast} from 'sonner'
import Image from 'next/image'

interface TestimonialCardProps {
  testimonial: Testimonial
  onUpdate: () => void
}

export default function TestimonialCard({testimonial, onUpdate}: TestimonialCardProps) {
  const [user] = useLazyAuthState()
  const isOwner = user?.uid === testimonial.uid

  const [isEditing, setIsEditing] = useState(false)
  const [editMessage, setEditMessage] = useState(testimonial.message)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) return

    setIsDeleting(true)
    try {
      const token = await user?.getIdToken()
      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'DELETE',
        headers: {Authorization: `Bearer ${token}`},
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      toast.success('Testimoni dihapus')
      onUpdate()
    } catch (err: unknown) {
      toast.error('Gagal menghapus', {description: (err instanceof Error ? err.message : String(err))})
      setIsDeleting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editMessage || editMessage.length < 10) return

    setIsSubmitting(true)
    try {
      const token = await user?.getIdToken()
      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({message: editMessage}),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      toast.success('Testimoni diperbarui')
      setIsEditing(false)
      onUpdate()
    } catch (err: unknown) {
      toast.error('Gagal memperbarui', {description: (err instanceof Error ? err.message : String(err))})
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`bg-[var(--color-bg-surface)] border ${isOwner ? 'border-[var(--color-interactive)] shadow-sm shadow-[var(--color-interactive)]/10' : 'border-[var(--color-border)]'} rounded-2xl p-5 break-inside-avoid flex flex-col gap-4 group transition-colors`}
    >
      <div
        className={`flex items-center justify-between ${isOwner ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div
          className={`flex items-center gap-3 ${isOwner ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
        >
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full img-mono border border-[var(--color-border)]"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center border border-[var(--color-border)]">
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                {testimonial.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">{testimonial.name}</p>
            <p
              className={`text-xs text-[var(--color-text-muted)] flex items-center gap-1 ${isOwner ? 'justify-end' : 'justify-start'}`}
            >
              {testimonial.provider.includes('google') && (
                <Icon icon="logos:google-icon" className="h-3 w-3 inline" />
              )}
              {testimonial.provider.includes('github') && (
                <Icon icon="mdi:github" className="h-3 w-3 inline" />
              )}
              {formatDistanceToNow(new Date(testimonial.createdAt), {
                addSuffix: true,
                locale: localeId,
              })}
              {testimonial.isEdited && ' (diperbarui)'}
            </p>
          </div>
        </div>

        {isOwner && !isEditing && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-interactive)] transition-colors rounded-lg hover:bg-[var(--color-bg-elevated)]"
            >
              <Icon icon="mdi:pencil" className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 text-[var(--color-text-muted)] hover:text-red-500 transition-colors rounded-lg hover:bg-[var(--color-bg-elevated)] disabled:opacity-50"
            >
              {isDeleting ? (
                <Icon icon="mdi:loading" className="h-4 w-4 animate-spin" />
              ) : (
                <Icon icon="mdi:trash-can" className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleEdit} className="flex flex-col gap-2">
          <textarea
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            className="w-full bg-[var(--color-bg-main)] border border-[var(--color-border)] rounded-xl p-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-interactive)] resize-none"
            rows={3}
            maxLength={500}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || editMessage.length < 10}
              className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-interactive)] text-[var(--color-interactive-text)] rounded-lg hover:bg-[var(--color-interactive-hover)] disabled:opacity-50 flex items-center gap-1"
            >
              {isSubmitting && <Icon icon="mdi:loading" className="h-3 w-3 animate-spin" />}
              Simpan
            </button>
          </div>
        </form>
      ) : (
        <p
          className={`text-sm text-[var(--color-text-secondary)] leading-relaxed ${isOwner ? 'text-right' : 'text-left'}`}
        >
          {testimonial.message}
        </p>
      )}
    </div>
  )
}
