/**
 * tocUtils.ts
 * Utilities for Table of Contents generation and reading time estimation.
 * All functions are pure and safe to call in Server Components.
 */

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export interface TocItem {
  id: string;    // anchor slug used as the HTML id attribute
  text: string;  // display text for the TOC link
  level: 2 | 3;  // heading level (h2 or h3)
}

/** Convert heading text to a URL-safe anchor slug. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Build a map of Notion block IDs → anchor slugs.
 * Handles duplicate heading text by appending a counter (-1, -2, …).
 *
 * @returns Record<blockId, anchorSlug>
 */
export function buildHeadingIdMap(blocks: BlockObjectResponse[]): Record<string, string> {
  const idMap: Record<string, string> = {};
  const seen = new Map<string, number>();

  for (const block of blocks) {
    if (block.type !== 'heading_2' && block.type !== 'heading_3') continue;

    const richText =
      block.type === 'heading_2'
        ? block.heading_2.rich_text
        : block.heading_3.rich_text;

    const text = richText.map((t) => t.plain_text).join('');
    if (!text.trim()) continue;

    let slug = slugifyHeading(text);
    const count = seen.get(slug) ?? 0;
    seen.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count}`;

    idMap[block.id] = slug;
  }

  return idMap;
}

/**
 * Extract TOC items from blocks using a pre-built heading ID map.
 * Use buildHeadingIdMap first, then pass the result here.
 */
export function extractTocItems(
  blocks: BlockObjectResponse[],
  idMap: Record<string, string>
): TocItem[] {
  const items: TocItem[] = [];

  for (const block of blocks) {
    if (block.type !== 'heading_2' && block.type !== 'heading_3') continue;

    const anchorId = idMap[block.id];
    if (!anchorId) continue;

    const richText =
      block.type === 'heading_2'
        ? block.heading_2.rich_text
        : block.heading_3.rich_text;

    const text = richText.map((t) => t.plain_text).join('');
    if (!text.trim()) continue;

    items.push({
      id: anchorId,
      text,
      level: block.type === 'heading_2' ? 2 : 3,
    });
  }

  return items;
}

/**
 * Estimate reading time from Notion content blocks.
 * Uses 200 words-per-minute as the baseline.
 * Returns a minimum of 1 minute.
 */
export function calculateReadingTime(blocks: BlockObjectResponse[]): number {
  let wordCount = 0;

  const countWords = (richText: { plain_text: string }[]): number =>
    richText
      .map((t) => t.plain_text)
      .join(' ')
      .split(/\s+/)
      .filter(Boolean).length;

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        wordCount += countWords(block.paragraph.rich_text);
        break;
      case 'heading_1':
        wordCount += countWords(block.heading_1.rich_text);
        break;
      case 'heading_2':
        wordCount += countWords(block.heading_2.rich_text);
        break;
      case 'heading_3':
        wordCount += countWords(block.heading_3.rich_text);
        break;
      case 'bulleted_list_item':
        wordCount += countWords(block.bulleted_list_item.rich_text);
        break;
      case 'numbered_list_item':
        wordCount += countWords(block.numbered_list_item.rich_text);
        break;
      case 'quote':
        wordCount += countWords(block.quote.rich_text);
        break;
      case 'callout':
        wordCount += countWords(block.callout.rich_text);
        break;
    }
  }

  return Math.max(1, Math.round(wordCount / 200));
}
