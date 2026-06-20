'use client';

import dynamic from 'next/dynamic';

const BlockNoteEditor = dynamic(() => import('@/components/admin/BlockNoteEditor'), { ssr: false });

export default function StoryReader({ jsonContentString }: { jsonContentString: string }) {
  if (!jsonContentString) return null;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <BlockNoteEditor 
        initialContent={jsonContentString} 
        onChange={() => {}} 
        editable={false} 
      />
    </div>
  );
}
