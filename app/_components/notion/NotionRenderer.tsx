/**
 * NotionRenderer.tsx
 *
 * Renders Notion block types as styled React elements.
 *
 * Changes from the original:
 *   - Accepts headingIdMap (blockId → anchorSlug) so h2/h3 get id attributes
 *     that match the TableOfContents links. Build this map with
 *     buildHeadingIdMap() from tocUtils.ts before rendering.
 *   - Code blocks now use the <CodeBlock> component (language label, copy, expand).
 *   - Rich text annotations are applied compositionally so bold+italic,
 *     bold+link, etc. all work correctly.
 *   - Heading spacing, blockquote, and callout styles refined for prose rhythm.
 *   - Links in body text use the site's brand link color.
 */

import React from 'react';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import CodeBlock from '@/app/_components/article/CodeBlock';

interface NotionRendererProps {
  blocks: BlockObjectResponse[];
  /**
   * Map of Notion block IDs → anchor slugs.
   * Build with buildHeadingIdMap() from tocUtils.ts.
   * When provided, h2/h3 headings receive the matching id attribute
   * so the TableOfContents scroll tracking and deep links work.
   */
  headingIdMap?: Record<string, string>;
}

// ── Rich text renderer ───────────────────────────────────────────────────────
// Handles annotations compositely so multiple styles on one span work.

type RichText = {
  plain_text: string;
  href?: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    code: boolean;
    strikethrough: boolean;
    underline: boolean;
  };
};

function renderRichText(richText: RichText[], keyPrefix: string): React.ReactNode[] {
  return richText.map((text, i) => {
    const key = `${keyPrefix}-${i}`;
    let node: React.ReactNode = text.plain_text;

    // Inline code overrides all other annotations
    if (text.annotations.code) {
      return (
        <code
          key={key}
          className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[0.85em] font-mono text-gray-800 dark:text-gray-200"
        >
          {text.plain_text}
        </code>
      );
    }

    // Apply text decorations compositionally
    if (text.annotations.strikethrough) node = <del key={`${key}-del`}>{node}</del>;
    if (text.annotations.underline) node = <u key={`${key}-u`}>{node}</u>;
    if (text.annotations.italic) node = <em key={`${key}-em`}>{node}</em>;
    if (text.annotations.bold) node = <strong key={`${key}-strong`}>{node}</strong>;

    // Wrap in a link if href exists
    if (text.href) {
      return (
        <a
          key={key}
          href={text.href}
          className="text-link dark:text-blue-400 underline underline-offset-2 hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          {node}
        </a>
      );
    }

    return <React.Fragment key={key}>{node}</React.Fragment>;
  });
}

// ── Block renderer ───────────────────────────────────────────────────────────

const NotionRenderer: React.FC<NotionRendererProps> = ({ blocks, headingIdMap = {} }) => {

  const renderBlock = (block: BlockObjectResponse): React.ReactNode => {
    const { type } = block;

    switch (type) {

      // ── Paragraphs ──────────────────────────────────────────────────────────
      case 'paragraph': {
        const content = renderRichText(block.paragraph.rich_text as RichText[], block.id);
        // Skip truly empty paragraphs (Notion often generates them as spacers)
        if (!block.paragraph.rich_text.length) {
          return <div key={block.id} className="mt-4" aria-hidden="true" />;
        }
        return (
          <p key={block.id} className="mb-5 text-gray-700 dark:text-gray-300 leading-[1.75]">
            {content}
          </p>
        );
      }

      // ── Headings ────────────────────────────────────────────────────────────
      // headingIdMap provides anchor IDs so the TOC scroll tracking works.

      case 'heading_1': {
        const text = renderRichText(block.heading_1.rich_text as RichText[], block.id);
        return (
          <h2
            key={block.id}
            id={headingIdMap[block.id]}
            className="text-2xl font-bold mt-12 mb-4 text-gray-900 dark:text-gray-100 scroll-mt-8"
          >
            {text}
          </h2>
        );
      }

      case 'heading_2': {
        const text = renderRichText(block.heading_2.rich_text as RichText[], block.id);
        return (
          <h2
            key={block.id}
            id={headingIdMap[block.id]}
            className="text-xl font-semibold mt-10 mb-3 text-gray-900 dark:text-gray-100 scroll-mt-8"
          >
            {text}
          </h2>
        );
      }

      case 'heading_3': {
        const text = renderRichText(block.heading_3.rich_text as RichText[], block.id);
        return (
          <h3
            key={block.id}
            id={headingIdMap[block.id]}
            className="text-lg font-semibold mt-8 mb-2 text-gray-800 dark:text-gray-200 scroll-mt-8"
          >
            {text}
          </h3>
        );
      }

      // ── Lists ────────────────────────────────────────────────────────────────
      // Note: list items are wrapped into <ul>/<ol> by renderBlocks below.

      case 'bulleted_list_item': {
        const content = renderRichText(block.bulleted_list_item.rich_text as RichText[], block.id);
        return (
          <li key={block.id} className="mb-1.5 text-gray-700 dark:text-gray-300 leading-[1.75]">
            {content}
          </li>
        );
      }

      case 'numbered_list_item': {
        const content = renderRichText(block.numbered_list_item.rich_text as RichText[], block.id);
        return (
          <li key={block.id} className="mb-1.5 text-gray-700 dark:text-gray-300 leading-[1.75]">
            {content}
          </li>
        );
      }

      // ── Image ────────────────────────────────────────────────────────────────
      case 'image': {
        const imageUrl =
          block.image.type === 'file'
            ? block.image.file.url
            : block.image.external?.url;
        const caption = block.image.caption?.map((t) => t.plain_text).join('') || '';

        return (
          <figure key={block.id} className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={caption}
              className="w-full rounded-lg shadow-md"
            />
            {caption && (
              <figcaption className="mt-2.5 text-sm text-gray-400 dark:text-gray-500 text-center">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      }

      // ── Code ─────────────────────────────────────────────────────────────────
      // Uses the CodeBlock component for language label, copy, and expand.
      case 'code': {
        const code = block.code.rich_text.map((t) => t.plain_text).join('');
        const language = block.code.language || '';
        return (
          <CodeBlock
            key={block.id}
            code={code}
            language={language}
          />
        );
      }

      // ── Quote / Blockquote ───────────────────────────────────────────────────
      case 'quote': {
        const content = renderRichText(block.quote.rich_text as RichText[], block.id);
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-gray-300 dark:border-gray-600 pl-5 py-1 my-6 italic text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {content}
          </blockquote>
        );
      }

      // ── Divider ──────────────────────────────────────────────────────────────
      case 'divider':
        return (
          <hr
            key={block.id}
            className="my-10 border-0 border-t border-gray-200 dark:border-gray-700"
          />
        );

      // ── Toggle ───────────────────────────────────────────────────────────────
      case 'toggle': {
        const summary = renderRichText(block.toggle.rich_text as RichText[], block.id);
        return (
          <details key={block.id} className="mb-4 group">
            <summary className="cursor-pointer list-none flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200 hover:text-link dark:hover:text-blue-400 transition-colors">
              <svg
                className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {summary}
            </summary>
            <div className="mt-2 ml-6 text-gray-700 dark:text-gray-300">
              {(block as any).children && renderBlocks((block as any).children)}
            </div>
          </details>
        );
      }

      // ── Callout ──────────────────────────────────────────────────────────────
      // Notion's native callout block (not the same as our editorial Callouts components).
      case 'callout': {
        const content = renderRichText(block.callout.rich_text as RichText[], block.id);
        const icon =
          block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : '📝';
        return (
          <div
            key={block.id}
            className="flex gap-3 bg-blue-50 dark:bg-blue-900/15 border-l-4 border-blue-400 dark:border-blue-500 rounded-r-lg px-4 py-3.5 mb-5"
          >
            <span className="shrink-0 text-lg leading-none mt-0.5" aria-hidden="true">
              {icon}
            </span>
            <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {content}
            </div>
          </div>
        );
      }

      default:
        // Log unknown types in development; hide gracefully in production
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[NotionRenderer] Unsupported block type:', type);
        }
        return null;
    }
  };

  // ── Block list renderer (handles list grouping) ──────────────────────────

  const renderBlocks = (blocks: BlockObjectResponse[]): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let currentListType: 'bulleted' | 'numbered' | null = null;

    const flushList = (key: string) => {
      if (listItems.length === 0) return;
      if (currentListType === 'bulleted') {
        elements.push(
          <ul key={key} className="list-disc list-outside ml-5 mb-5 space-y-1">
            {listItems}
          </ul>
        );
      } else if (currentListType === 'numbered') {
        elements.push(
          <ol key={key} className="list-decimal list-outside ml-5 mb-5 space-y-1">
            {listItems}
          </ol>
        );
      }
      listItems = [];
      currentListType = null;
    };

    blocks.forEach((block, index) => {
      if (block.type === 'bulleted_list_item') {
        if (currentListType === 'numbered') flushList(`numbered-${index}`);
        currentListType = 'bulleted';
        listItems.push(renderBlock(block));
      } else if (block.type === 'numbered_list_item') {
        if (currentListType === 'bulleted') flushList(`bulleted-${index}`);
        currentListType = 'numbered';
        listItems.push(renderBlock(block));
      } else {
        flushList(`list-${index}`);
        elements.push(renderBlock(block));
      }
    });

    // Flush any trailing list
    flushList('list-end');

    return elements;
  };

  return (
    <div className="max-w-none">
      {renderBlocks(blocks)}
    </div>
  );
};

export default NotionRenderer;
