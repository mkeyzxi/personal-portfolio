'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';
import LoginModal from '@/components/testimonials/LoginModal';

export default function LikeButton({ initialLikes, storyId }: { initialLikes: number, storyId: string }) {
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Note: Optimistically fetching user's like status would require an endpoint
  // GET /api/stories/[id]/like/status, but for simplicity we rely on the toggle response.

  const handleToggleLike = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (isLoading) return; // Debounce mechanism
    setIsLoading(true);

    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/stories/${storyId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setIsLiked(data.liked);
        setLikes(data.newCount);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error('Gagal menyukai cerita');
    } finally {
      // Debounce delay
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <>
      <button 
        onClick={handleToggleLike}
        disabled={isLoading}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors border ${
          isLiked 
            ? 'bg-red-50 text-red-500 border-red-200 dark:bg-red-500/10 dark:border-red-500/20' 
            : 'bg-[var(--color-bg-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <LucideIcons.Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        <span className="font-mono text-sm">{likes}</span>
      </button>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
