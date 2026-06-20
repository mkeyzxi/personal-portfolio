'use client';

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";

export default function WYSIWYGEditor({ onChange }: { onChange: (json: any) => void }) {
  // Hanya inisialisasi editor setelah dipastikan berjalan di klien
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useCreateBlockNote();

  if (!isMounted) {
    return <div className="min-h-[400px] border border-[var(--color-border)] rounded-md bg-[var(--color-bg-main)]"></div>;
  }

  return (
    <div className="min-h-[400px] border border-[var(--color-border)] rounded-md bg-[var(--color-bg-main)] text-[var(--color-text-primary)]">
      <BlockNoteView 
        editor={editor} 
        theme="light" // Anda dapat menyesuaikan ini dengan state tema jika ingin dynamic
        onChange={() => {
          onChange(editor.document);
        }} 
      />
    </div>
  );
}
