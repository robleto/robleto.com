'use client';

/**
 * TableOfContents.tsx
 *
 * Auto-generated TOC rendered in two modes:
 *   - "mobile"  — collapsible panel, shown above article content (xl:hidden)
 *   - "desktop" — sticky right-rail nav, shown beside article content (hidden xl:block)
 *
 * Usage in page.tsx:
 *   Place <TableOfContents items={tocItems} mode="mobile" /> inside the article column.
 *   Place <TableOfContents items={tocItems} mode="desktop" /> in the sibling right-rail div.
 *
 * Active heading is tracked via IntersectionObserver.
 * Returns null when items.length < 2 (not useful for very short articles).
 */

import React, { useEffect, useState } from 'react';
import type { TocItem } from './tocUtils';

interface TableOfContentsProps {
  items: TocItem[];
  /** Render as mobile collapsible or desktop sticky rail */
  mode: 'mobile' | 'desktop';
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, mode }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting heading and set it as active
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by position and pick the topmost visible one
          visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when the heading crosses the upper quarter of the viewport
        rootMargin: '-5% 0% -75% 0%',
        threshold: 0,
      }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  const tocList = (
    <ul className="space-y-1" role="list">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? 'pl-3.5' : ''}>
          <a
            href={`#${item.id}`}
            onClick={() => setMobileOpen(false)}
            className={`
              block text-xs leading-snug py-0.5 transition-colors duration-150
              border-l-2 pl-2.5
              ${
                activeId === item.id
                  ? 'border-link dark:border-blue-400 text-link dark:text-blue-400 font-medium'
                  : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  /* ── Mobile: collapsible panel ── */
  if (mode === 'mobile') {
    return (
      <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 bg-mercury dark:bg-gravel"
          aria-expanded={mobileOpen}
          aria-controls="toc-mobile-content"
        >
          <span className="flex items-center gap-2">
            {/* List icon */}
            <svg
              className="w-3.5 h-3.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10" />
            </svg>
            On this page
          </span>
          {/* Chevron */}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {mobileOpen && (
          <nav
            id="toc-mobile-content"
            className="px-4 py-4 bg-white dark:bg-gray-800/60"
            aria-label="Article contents"
          >
            {tocList}
          </nav>
        )}
      </div>
    );
  }

  /* ── Desktop: sticky right-rail nav ── */
  return (
    <nav
      className="sticky top-8 self-start"
      aria-label="Article contents"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        On this page
      </p>
      {tocList}
    </nav>
  );
};

export default TableOfContents;
