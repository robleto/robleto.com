/**
 * Callouts.tsx
 *
 * Lightweight editorial callout components for structuring article content.
 * All are Server Components (no hooks needed).
 *
 * Available components:
 *   <KeyTakeaway>  — Highlight a key point or insight (blue / brand)
 *   <Aside>        — Supplementary info or context (gray / neutral)
 *   <Caution>      — Warnings, gotchas, caveats (yellow / warning)
 *   <WhatILearned> — Personal reflection or lesson (teal / growth)
 *
 * Styled to match existing design tokens: border tints, bg tints,
 * consistent text sizes, and existing brand colors (oracle, goldenyellow, link).
 *
 * Usage:
 *   import { KeyTakeaway, Aside, Caution, WhatILearned } from '@/app/_components/article/Callouts';
 *   <KeyTakeaway>The main insight from this section.</KeyTakeaway>
 */

import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
}

/* ─── Key Takeaway ──────────────────────────────────────────────────────────
   Use for the most important insight, conclusion, or point to remember.
   Icon: ★ (star) */

export const KeyTakeaway: React.FC<CalloutProps> = ({ children, className = '' }) => (
  <aside
    className={`my-8 flex gap-3.5 rounded-lg border border-link/25 dark:border-blue-400/20 bg-blue-50 dark:bg-blue-900/10 px-5 py-4 ${className}`}
    role="note"
    aria-label="Key takeaway"
  >
    <span
      className="mt-0.5 shrink-0 text-link dark:text-blue-400 text-base leading-none select-none"
      aria-hidden="true"
    >
      ★
    </span>
    <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </div>
  </aside>
);

/* ─── Aside ─────────────────────────────────────────────────────────────────
   Use for supplementary context, background, or optional detail.
   Icon: ℹ (info) */

export const Aside: React.FC<CalloutProps> = ({ children, className = '' }) => (
  <aside
    className={`my-8 flex gap-3.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-whisper dark:bg-gray-800/50 px-5 py-4 ${className}`}
    role="note"
    aria-label="Aside"
  >
    <span
      className="mt-0.5 shrink-0 text-gray-400 dark:text-gray-500 text-base leading-none select-none"
      aria-hidden="true"
    >
      ℹ
    </span>
    <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
      {children}
    </div>
  </aside>
);

/* ─── Caution ────────────────────────────────────────────────────────────────
   Use for warnings, known issues, gotchas, or important caveats.
   Icon: ⚠ (warning) */

export const Caution: React.FC<CalloutProps> = ({ children, className = '' }) => (
  <aside
    className={`my-8 flex gap-3.5 rounded-lg border border-goldenyellow/40 dark:border-goldenyellow/30 bg-yellow-50 dark:bg-yellow-900/10 px-5 py-4 ${className}`}
    role="note"
    aria-label="Caution"
  >
    <span
      className="mt-0.5 shrink-0 text-goldenyellow text-base leading-none select-none"
      aria-hidden="true"
    >
      ⚠
    </span>
    <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </div>
  </aside>
);

/* ─── What I Learned ─────────────────────────────────────────────────────────
   Use for personal reflections, lessons learned, or retrospective insight.
   Icon: 💡 (lightbulb) */

export const WhatILearned: React.FC<CalloutProps> = ({ children, className = '' }) => (
  <aside
    className={`my-8 flex gap-3.5 rounded-lg border border-oracle/30 dark:border-tropicalteal/30 bg-teal-50 dark:bg-teal-900/10 px-5 py-4 ${className}`}
    role="note"
    aria-label="What I learned"
  >
    <span
      className="mt-0.5 shrink-0 text-oracle dark:text-tropicalteal text-base leading-none select-none"
      aria-hidden="true"
    >
      💡
    </span>
    <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
      {children}
    </div>
  </aside>
);
