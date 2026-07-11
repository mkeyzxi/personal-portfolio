'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface ReadmeRendererProps {
  content: string;
}

/**
 * Komponen client-side yang merender markdown mentah (dari GitHub README)
 * dengan styling yang konsisten dengan BlockNote renderer.
 * Menggunakan react-markdown + remark-gfm untuk dukungan GFM (tabel, checklist, strikethrough).
 */
export default function ReadmeRenderer({ content }: ReadmeRendererProps) {
  const components: Components = {
    // ── Headings ──────────────────────────────────────────
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mt-8 mb-4 pb-2 border-b border-[var(--color-border)]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-4 pb-2 border-b border-[var(--color-border)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-[var(--color-text-primary)] mt-6 mb-2">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-bold text-[var(--color-text-primary)] mt-4 mb-2">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-bold text-[var(--color-text-muted)] mt-4 mb-2 uppercase tracking-wide">
        {children}
      </h6>
    ),

    // ── Paragraph ────────────────────────────────────────
    p: ({ children }) => (
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {children}
      </p>
    ),

    // ── Links ────────────────────────────────────────────
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--color-text-primary)] underline underline-offset-2 decoration-[var(--color-text-muted)] hover:decoration-[var(--color-text-primary)] transition-colors"
      >
        {children}
      </a>
    ),

    // ── Lists ────────────────────────────────────────────
    ul: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 space-y-1 text-[var(--color-text-secondary)]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 space-y-1 text-[var(--color-text-secondary)]">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">
        {children}
      </li>
    ),

    // ── Blockquote ───────────────────────────────────────
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-border)] pl-4 py-1 my-4 text-[var(--color-text-muted)] italic">
        {children}
      </blockquote>
    ),

    // ── Code ─────────────────────────────────────────────
    code: ({ className, children }) => {
      const isBlock = className?.includes('language-');
      if (isBlock) {
        return (
          <code className={`block text-sm font-mono ${className || ''}`}>
            {children}
          </code>
        );
      }
      // Inline code
      return (
        <code className="font-mono text-sm bg-[var(--color-bg-elevated)] px-1.5 py-0.5 rounded text-[var(--color-text-primary)] border border-[var(--color-border-muted)]">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-4 my-4 overflow-x-auto text-sm leading-relaxed">
        {children}
      </pre>
    ),

    // ── Table (GFM) ──────────────────────────────────────
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-[var(--color-bg-elevated)]">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-[var(--color-border)]">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-[var(--color-bg-surface)] transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-[var(--color-text-primary)] border-b border-[var(--color-border)]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-[var(--color-text-secondary)]">
        {children}
      </td>
    ),

    // ── Image ────────────────────────────────────────────
    img: ({ src, alt }) => (
      <span className="block my-6">
        <span className="block rounded-2xl overflow-hidden border border-[var(--color-border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt || 'Image'} className="w-full object-cover" />
        </span>
        {alt && alt !== 'Image' && (
          <span className="block text-center text-sm text-[var(--color-text-muted)] mt-2">{alt}</span>
        )}
      </span>
    ),

    // ── Divider ──────────────────────────────────────────
    hr: () => (
      <hr className="my-8 border-[var(--color-border)]" />
    ),

    // ── Strong & Em ──────────────────────────────────────
    strong: ({ children }) => (
      <strong className="font-bold text-[var(--color-text-primary)]">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic">
        {children}
      </em>
    ),
    del: ({ children }) => (
      <del className="line-through text-[var(--color-text-muted)]">
        {children}
      </del>
    ),

    // ── Input (GFM checkbox) ─────────────────────────────
    input: ({ checked, ...rest }) => (
      <input
        type="checkbox"
        checked={checked}
        readOnly
        className="mr-2 h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-interactive)]"
        {...rest}
      />
    ),
  };

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
