'use client';

import { useState, useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

interface BlockNoteEditorProps {
  initialContent?: string; // JSON string
  onChange: (content: string) => void;
  editable?: boolean;
}

export default function BlockNoteEditor({ initialContent, onChange, editable = true }: BlockNoteEditorProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Deteksi dark mode secara reaktif
  useEffect(() => {
    const html = document.documentElement;
    const updateTheme = () => {
      setTheme(html.classList.contains('dark') ? 'dark' : 'light');
    };
    updateTheme();

    // Observasi perubahan class di <html> (untuk theme toggle)
    const observer = new MutationObserver(updateTheme);
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const initialBlocks = initialContent ? JSON.parse(initialContent) : undefined;
  
  const editor = useCreateBlockNote({
    initialContent: initialBlocks
  });

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden bg-[var(--color-bg-surface)]">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={theme}
        onChange={() => {
          onChange(JSON.stringify(editor.document));
        }}
      />
    </div>
  );
}

