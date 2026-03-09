'use client';

/**
 * ReadingProgress.tsx
 *
 * Thin fixed progress bar at the top of the viewport showing how far
 * the reader has scrolled through the article.
 *
 * Targets the element with id="article-content" for accurate progress
 * relative to the article length (not the full page).
 *
 * Styled to match existing brand link color (bg-link / bg-blue-400).
 */

import React, { useEffect, useState } from 'react';

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.getElementById('article-content');

      if (article) {
        // Progress relative to the article element
        const rect = article.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        const pct = Math.min(100, (scrolled / article.offsetHeight) * 100);
        setProgress(pct);
      } else {
        // Fallback: progress relative to the full page
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // set initial value

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gray-200/60 dark:bg-gray-700/60"
      aria-hidden="true"
      role="presentation"
    >
      <div
        className="h-full bg-link dark:bg-blue-400 transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
