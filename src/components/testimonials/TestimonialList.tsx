'use client';

import { useState, Suspense } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Testimonial } from '@/types';
import TestimonialCard from './TestimonialCard';
import TestimonialForm from './TestimonialForm';
import LoginModal from './LoginModal';
import { useLazyAuthState } from '@/hooks/useLazyAuthState';
import TestimonialsSkeleton from '@/components/skeletons/TestimonialsSkeleton';

function TestimonialContent({ user }: { user: any }) {
  const { data: testimonials = [], mutate: fetchTestimonials } = useSWR<Testimonial[]>(
    '/api/testimonials', 
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000, suspense: true }
  );

  return (
    <>
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
        <div className="text-center py-20 border border-[var(--color-border)] border-dashed rounded-2xl mt-6">
          <p className="text-[var(--color-text-muted)] text-sm">Belum ada testimoni. Jadilah yang pertama!</p>
        </div>
      )}
    </>
  );
}

export default function TestimonialList() {
  const [user, loadingAuth] = useLazyAuthState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // loadingAuth tidak disuspend oleh SWR karena asalnya dari Firebase.
  // Tapi kita bisa menampilkannya sebagai bagian dari Skeleton.
  if (loadingAuth) {
    return <TestimonialsSkeleton />;
  }

  // function dummy onSuccess agar fetcher ter-trigger.
  // Tapi dengan mutate() global lebih baik. Kita biarkan onSuccess kosong jika tak ada context, atau memanggil revalidate global.
  // Namun, form sudah memakai useSWR mutate internal jika menggunakan SWR global key.
  
  return (
    <div className="w-full">
      {/* Bagian Input Form dengan Auth Intercept */}
      <div className="mb-6">
        <TestimonialForm 
          onSuccess={() => { /* revalidation via global mutate handled in form or auto revalidate */ }} 
          onLoginRequest={() => setIsLoginModalOpen(true)}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialContent user={user} />
      </Suspense>
    </div>
  );
}
