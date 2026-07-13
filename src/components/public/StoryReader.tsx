'use client';

import dynamic from 'next/dynamic';

const BlockNoteEditor = dynamic(() => import('@/components/admin/BlockNoteEditor'), { ssr: false });

export default function StoryReader({ jsonContentString }: { jsonContentString: string }) {
  if (!jsonContentString) return null;

  return (
    <div className="story-reader-content">
      <BlockNoteEditor 
        initialContent={jsonContentString} 
        onChange={() => {}} 
        editable={false} 
      />
    </div>
  );
}
