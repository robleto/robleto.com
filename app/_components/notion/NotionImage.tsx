'use client';

import React, { useEffect, useState } from 'react';

interface NotionImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}

/**
 * Image with a single graceful fallback. Used for Notion-sourced images where
 * the primary `src` is a local downloaded copy and `fallbackSrc` is the original
 * (potentially expiring) Notion URL.
 */
export default function NotionImage({ src, fallbackSrc, alt, className }: NotionImageProps) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && current !== fallbackSrc) {
      setCurrent(fallbackSrc);
    }
  };

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={current} alt={alt} className={className} onError={handleError} />
  );
}
