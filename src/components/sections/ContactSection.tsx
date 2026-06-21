'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { Icon } from '@iconify/react';
import ContactForm from '@/components/ui/ContactForm';
import { OWNER_INFO, SOCIAL_LINKS } from '@/lib/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 20 } },
};

export default function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="flex min-h-screen w-full flex-col items-center py-24 px-6 sm:px-10">
      <div className="w-full max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h1 id="contact-heading" className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
            Hubungi Saya
          </h1>
          <div className="mt-2 h-1 w-20 bg-[var(--color-text-primary)] mx-auto md:mx-0"></div>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-2xl">
            Ada pertanyaan, tawaran kerja, atau sekadar ingin menyapa? 
            Jangan ragu untuk mengirim pesan melalui form di bawah atau via media sosial.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row gap-16 items-start"
        >
          {/* ── Kiri: Info Kontak ──────────────────────────────── */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/3 flex flex-col gap-8">
            <div className="flex flex-col gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Informasi Kontak</h3>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-elevated)]">
                  <Mail className="h-5 w-5 text-[var(--color-text-primary)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">Email</span>
                  <a href={`mailto:${OWNER_INFO.email}`} className="text-base font-semibold text-[var(--color-text-primary)] hover:underline break-all">
                    {OWNER_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-elevated)]">
                  <MapPin className="h-5 w-5 text-[var(--color-text-primary)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--color-text-muted)]">Lokasi</span>
                  <span className="text-base font-semibold text-[var(--color-text-primary)]">
                    {OWNER_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Media Sosial</h3>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] transition-all hover:bg-[var(--color-bg-surface)] border border-transparent hover:border-[var(--color-border)] hover:-translate-y-1"
                  >
                    <Icon icon={link.iconify} className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Kanan: Form Kontak ────────────────────────────── */}
          <motion.div variants={itemVariants} className="w-full lg:w-2/3 flex flex-col gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Kirim Pesan</h3>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
