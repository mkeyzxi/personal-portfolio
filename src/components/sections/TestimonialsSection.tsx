'use client';

import TestimonialList from '@/components/testimonials/TestimonialList';

export default function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-heading" className="flex min-h-screen w-full flex-col items-center justify-center py-24 px-6 md:px-10">
      <div className="w-full max-w-5xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h1 id="testimonials-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Testimoni & Komentar
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            Tinggalkan masukan Anda menggunakan akun sosial.
          </p>
        </div>

        <TestimonialList />
      </div>
    </section>
  );
}
