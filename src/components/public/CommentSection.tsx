'use client';

import { useState, useEffect } from 'react';
import { useLazyAuthState } from '@/hooks/useLazyAuthState';
import { MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';
import LoginModal from '@/components/testimonials/LoginModal';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import Image from 'next/image';

export default function CommentSection({ storyId }: { storyId: string }) {
  const [user] = useLazyAuthState();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [storyId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/stories/${storyId}/comments`);
      const data = await res.json();
      if (data.success) {
        setComments(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (newComment.trim().length < 3) {
      toast.error('Komentar terlalu pendek (minimal 3 karakter)');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/stories/${storyId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: newComment,
          userName: user.displayName || 'Anonymous',
          userAvatar: user.photoURL || ''
        })
      });

      const data = await res.json();
      if (data.success) {
        setNewComment('');
        toast.success('Komentar berhasil ditambahkan');
        fetchComments(); // Reload comments
      } else {
        toast.error(data.message || 'Gagal menambahkan komentar');
      }
    } catch (e) {
      toast.error('Terjadi kesalahan sistem');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Komentar ({comments.length})</h3>

      <div className="mb-8">
        {!user ? (
          <div className="flex flex-col items-center justify-center p-6 border border-[var(--color-border)] border-dashed rounded-xl bg-[var(--color-bg-surface)] text-center">
            <MessageSquare className="w-8 h-8 text-[var(--color-text-muted)] mb-3" />
            <p className="text-[var(--color-text-secondary)] mb-4">Login untuk ikut berdiskusi di artikel ini</p>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[var(--color-interactive-hover)]"
            >
              Masuk / Daftar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="shrink-0">
              {user.photoURL ? (
                <Image src={user.photoURL} alt="Avatar" width={40} height={40} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center">
                  <User className="w-5 h-5 text-[var(--color-text-muted)]" />
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar Anda..."
                className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border)] rounded-xl p-3 min-h-[100px] text-[var(--color-text-primary)] focus:ring-1 focus:ring-[var(--color-focus-ring)] focus:outline-none resize-y"
              />
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[var(--color-interactive)] text-[var(--color-interactive-text)] px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[var(--color-interactive-hover)] disabled:opacity-50"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-[var(--color-bg-elevated)] h-10 w-10"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-2 bg-[var(--color-bg-elevated)] rounded w-1/4"></div>
              <div className="h-2 bg-[var(--color-bg-elevated)] rounded w-3/4"></div>
              <div className="h-2 bg-[var(--color-bg-elevated)] rounded w-1/2"></div>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center text-[var(--color-text-muted)] py-8">Belum ada komentar. Jadilah yang pertama!</p>
        ) : (
          comments.map(comment => {
            const isMine = user && user.uid === comment.userId;
            return (
              <div key={comment.id} className={`flex gap-4 ${isMine ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <div className="shrink-0">
                  {comment.userAvatar ? (
                    <Image src={comment.userAvatar} alt="Avatar" width={40} height={40} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center">
                      <User className="w-5 h-5 text-[var(--color-text-muted)]" />
                    </div>
                  )}
                </div>
                <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div className={`flex items-center gap-2 mb-1 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="font-semibold text-[var(--color-text-primary)] text-sm">{comment.userName}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: idLocale })}
                    </span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap text-left ${
                    isMine 
                      ? 'bg-[var(--color-interactive)] text-[var(--color-interactive-text)] rounded-tr-sm' 
                      : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-tl-sm'
                  }`}>
                    {comment.content}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </section>
  );
}
