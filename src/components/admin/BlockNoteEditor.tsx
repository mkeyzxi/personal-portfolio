'use client';

import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

interface BlockNoteEditorProps {
  initialContent?: string; // JSON string
  onChange: (content: string) => void;
  editable?: boolean;
}

export default function BlockNoteEditor({ initialContent, onChange, editable = true }: BlockNoteEditorProps) {
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
        theme="light"
        onChange={() => {
          onChange(JSON.stringify(editor.document));
        }}
      />
    </div>
  );
}
