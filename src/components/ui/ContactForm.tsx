'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        toast.success('Pesan Terkirim!', {
          description: 'Terima kasih telah menghubungi. Saya akan membalas secepatnya.',
        });
        setSubmitStatus('Pesan berhasil dikirim! Saya akan membalas dalam 1-2 hari kerja.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Gagal mengirim pesan', {
          description: json.message || 'Coba lagi beberapa saat.',
        });
        setSubmitStatus('Gagal mengirim pesan. Coba lagi atau hubungi via email langsung.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan', {
        description: 'Tidak dapat terhubung ke server.',
      });
      setSubmitStatus('Gagal mengirim pesan karena terjadi kesalahan. Coba lagi atau hubungi via email langsung.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full" noValidate>
      {/* Visually hidden status region for screen readers */}
      <div className="sr-only" role="alert" aria-live="assertive">
        {submitStatus}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-[var(--color-text-secondary)]">
            Nama Lengkap <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            name="name"
            required
            aria-required="true"
            autoComplete="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] focus-visible:ring-[var(--color-focus-ring)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-secondary)]">
            Email <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            aria-describedby="email-hint"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] focus-visible:ring-[var(--color-focus-ring)]"
          />
          <p id="email-hint" className="sr-only">Format: nama@domain.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-[var(--color-text-secondary)]">
          Subjek <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <Input
          id="subject"
          name="subject"
          required
          aria-required="true"
          placeholder="Tawaran Kerjasama / Halo"
          value={formData.subject}
          onChange={handleChange}
          className="border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] focus-visible:ring-[var(--color-focus-ring)]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-[var(--color-text-secondary)]">
          Pesan <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={6}
          placeholder="Tuliskan pesan Anda di sini..."
          value={formData.message}
          onChange={handleChange}
          className="resize-none border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] focus-visible:ring-[var(--color-focus-ring)]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-[var(--color-interactive)] px-8 py-4 font-semibold text-[var(--color-interactive-text)] transition-all hover:bg-[var(--color-interactive-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Mengirim...
          </>
        ) : (
          <>
            Kirim Pesan
            <Send className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
