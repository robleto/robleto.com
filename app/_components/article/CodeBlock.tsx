'use client';

/**
 * CodeBlock.tsx
 *
 * A reusable code block component with:
 *   - Language/filename label in the header bar
 *   - Copy-to-clipboard button
 *   - Horizontal scrolling for wide code
 *   - Expand/collapse for blocks longer than collapseThreshold lines
 *
 * No external syntax-highlighting dependencies.
 * Styled using existing Tailwind classes (gray-50/100/800, foreground colors).
 *
 * Configure: set collapseThreshold to control when expand/collapse appears (default: 20 lines).
 */

import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  /** Optional filename shown in place of / alongside the language label */
  filename?: string;
  /** Lines of code before the block collapses (default: 20) */
  collapseThreshold?: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = '',
  filename,
  collapseThreshold = 20,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const lineCount = code.split('\n').length;
  const isLong = lineCount > collapseThreshold;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently
    }
  };

  // Prefer filename as label; fall back to language; fall back to "code"
  const label = filename || language || 'code';

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6 text-sm">

      {/* Header bar: language/filename label + copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700/80 border-b border-gray-200 dark:border-gray-700">
        <span className="font-mono text-xs text-gray-400 dark:text-gray-400 select-none">
          {label}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code area with optional collapse */}
      <div
        className={`relative overflow-hidden transition-[max-height] duration-300 ${
          isLong && !expanded ? 'max-h-[320px]' : 'max-h-none'
        }`}
      >
        <pre className="overflow-x-auto p-4 m-0 bg-gray-50 dark:bg-gray-800">
          <code className="font-mono text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre">
            {code}
          </code>
        </pre>

        {/* Gradient fade mask at the bottom when collapsed */}
        {isLong && !expanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Expand / collapse toggle — only shown for long blocks */}
      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors"
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {expanded ? 'Show less' : `Show all ${lineCount} lines`}
        </button>
      )}
    </div>
  );
};

export default CodeBlock;
