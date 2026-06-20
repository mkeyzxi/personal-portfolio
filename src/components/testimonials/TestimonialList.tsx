'use client';

import { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '@/types';
import TestimonialCard from './TestimonialCard';
import TestimonialForm from './TestimonialForm';
import LoginModal from './LoginModal';
import { auth } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';

export default function TestimonialList() {
  const [user, loadingAuth] = useAuthState(auth);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  if (loading || loadingAuth) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-[var(--color-text-muted)]">
        <Icon icon="mdi:loading" className="h-8 w-8 animate-spin mb-4" />
        <p className="text-sm">Memuat Testimoni...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Bagian Input Form dengan Auth Intercept */}
      <div className="mb-6">
        <TestimonialForm 
          onSuccess={fetchTestimonials} 
          onLoginRequest={() => setIsLoginModalOpen(true)}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Grid Testimoni (Chat-like Layout Berbasis Identitas) */}
      {testimonials.length > 0 ? (
        <div className="flex flex-col gap-6 w-full">
          {testimonials.map((testi) => {
            const isOwner = user?.uid === testi.uid;
            
            return (
              <div 
                key={testi.id} 
                className={`flex w-full ${isOwner ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`w-full md:w-[85%] lg:w-[75%] ${isOwner ? 'ml-auto' : 'mr-auto'}`}>
                  <TestimonialCard 
                    testimonial={testi} 
                    onUpdate={fetchTestimonials} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-[var(--color-border)] border-dashed rounded-2xl">
          <p className="text-[var(--color-text-muted)] text-sm">Belum ada testimoni. Jadilah yang pertama!</p>
        </div>
      )}
    </div>
  );
}
