import React from 'react';

export default function BlockNoteRenderer({ content }: { content: string | any[] }) {
  let parsedContent = content;
  
  if (typeof parsedContent === 'string') {
    try {
      parsedContent = JSON.parse(parsedContent);
    } catch (e) {
      console.error("Gagal mem-parsing konten BlockNote", e);
      parsedContent = [];
    }
  }

  function renderBlockNoteJSON(blocks: any[]): React.ReactNode {
    if (!blocks || !Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      // Rekursif render children jika ada
      const childrenBlocks = block.children && block.children.length > 0 
        ? <div className="pl-4 mt-2">{renderBlockNoteJSON(block.children)}</div> 
        : null;

      const renderTextContent = (contentArr: any[]) => {
        return contentArr?.map((textNode: any, i: number) => {
          let className = "";
          if (textNode.styles?.bold) className += "font-bold ";
          if (textNode.styles?.italic) className += "italic ";
          if (textNode.styles?.underline) className += "underline ";
          if (textNode.styles?.strike) className += "line-through ";
          if (textNode.styles?.code) className += "font-mono bg-[var(--color-bg-elevated)] px-1 py-0.5 rounded text-[var(--color-text-primary)] ";
          
          if (textNode.type === 'link') {
            return <a key={i} href={textNode.href} target="_blank" rel="noopener noreferrer" className={`${className} text-[var(--color-interactive)] hover:underline`}>{textNode.text}</a>;
          }
          return <span key={i} className={className}>{textNode.text}</span>;
        });
      };

      switch (block.type) {
        case 'paragraph':
          return (
            <div key={block.id || index} className="mb-4">
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {renderTextContent(block.content)}
              </p>
              {childrenBlocks}
            </div>
          );
        case 'heading':
          const HeadingTag = `h${block.props.level}` as any;
          const text = block.content?.map((c: any) => c.text).join('') || '';
          const baseClasses = "font-bold text-[var(--color-text-primary)] mt-8 mb-4";
          const sizeClass = block.props.level === 1 ? "text-3xl" : block.props.level === 2 ? "text-2xl" : "text-xl";
          return (
            <div key={block.id || index}>
              <HeadingTag className={`${baseClasses} ${sizeClass}`}>{text}</HeadingTag>
              {childrenBlocks}
            </div>
          );
        case 'bulletListItem':
        case 'numberedListItem':
          return (
            <div key={block.id || index} className="ml-6 mb-2">
              <li className={`text-[var(--color-text-secondary)] ${block.type === 'bulletListItem' ? 'list-disc' : 'list-decimal'}`}>
                {renderTextContent(block.content)}
              </li>
              {childrenBlocks}
            </div>
          );
        case 'image':
          return (
            <div key={block.id || index} className="my-8">
              <div className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.props.url} alt={block.props.caption || "Image"} className="w-full object-cover" />
                {block.props.caption && <p className="text-center text-sm text-[var(--color-text-muted)] mt-2 pb-2">{block.props.caption}</p>}
              </div>
              {childrenBlocks}
            </div>
          );
        case 'divider':
          return <hr key={block.id || index} className="my-8 border-[var(--color-border)]" />;
        default:
          return (
            <div key={block.id || index}>
              {childrenBlocks}
            </div>
          );
      }
    });
  }

  return <>{renderBlockNoteJSON(parsedContent as any[])}</>;
}
