'use client';

/**
 * ArticleHeader.tsx
 *
 * Enhanced article header used by both "post" and "case-study" variants.
 *
 * Configure:
 *   - variant: 'post' (default) | 'case-study' — controls badge and layout hints
 *   - series: string — shown as a teal label in the meta row (e.g. "Design Systems")
 *   - tags: string[] — small pill tags shown in the meta row
 *   - readingTime: number — computed by calculateReadingTime() in tocUtils.ts
 */

import React, { useState } from 'react';
import Link from 'next/link';

interface ArticleHeaderProps {
  title: string;
  /** Lede / excerpt — shown below the title as a lead paragraph */
  lede?: string;
  pubdate?: string;
  /** Pre-computed reading time in minutes (from tocUtils.calculateReadingTime) */
  readingTime?: number;
  tags?: string[];
  /** Optional series or collection name */
  series?: string;
  /** Controls variant badge and layout hints */
  variant?: 'post' | 'case-study';
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  lede,
  pubdate,
  readingTime,
  tags = [],
  series,
  variant = 'post',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently
    }
  };

  const formattedDate = pubdate
    ? new Date(pubdate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <header className="pb-8 border-b border-gray-200 dark:border-gray-700 mb-10">
      {/* Back navigation */}
      <div className="mb-6">
        <Link
          href="/posts"
          className="text-sm text-gray-400 dark:text-gray-500 hover:text-link dark:hover:text-blue-400 transition-colors"
        >
          ← Back to Writing
        </Link>
      </div>

      {/* Case-study variant badge */}
      {variant === 'case-study' && (
        <div className="mb-4">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-oracle dark:text-tropicalteal border border-oracle/50 dark:border-tropicalteal/50 rounded-full px-3 py-0.5">
            Case Study
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4 text-balance">
        {title}
      </h1>

      {/* Lede / excerpt */}
      {lede && (
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl font-normal">
          {lede}
        </p>
      )}

      {/* Meta row: date · reading time · series · tags   + copy link */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-400 dark:text-gray-500">
        {formattedDate && <span>{formattedDate}</span>}

        {readingTime && (
          <>
            {formattedDate && <span aria-hidden="true">·</span>}
            <span>{readingTime} min read</span>
          </>
        )}

        {series && (
          <>
            <span aria-hidden="true">·</span>
            <span className="text-oracle dark:text-tropicalteal font-medium">{series}</span>
          </>
        )}

        {tags.length > 0 && (
          <>
            <span aria-hidden="true">·</span>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-mercury dark:bg-gravel text-emperor dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Push copy link to the right */}
        <span className="flex-1 hidden sm:block" />

        {/* Copy link action */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-link dark:hover:text-blue-400 transition-colors ml-auto sm:ml-0"
          aria-label="Copy link to this article"
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy link
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default ArticleHeader;
