/**
 * RelatedPosts.tsx
 *
 * Navigation and discovery module rendered at the bottom of every article.
 * Renders nothing when no data is provided.
 *
 * Props:
 *   prevPost    — previous post in chronological/series order
 *   nextPost    — next post in chronological/series order
 *   relatedPosts — up to 3–5 posts sharing tags/series
 *
 * Configure: compute these values in page.tsx from the full posts list.
 * Example:
 *   const posts = allPosts as PostItem[];
 *   const idx   = posts.findIndex(p => p.slug === slug);
 *   const prev  = posts[idx - 1];
 *   const next  = posts[idx + 1];
 *   const related = posts
 *     .filter(p => p.slug !== slug && p.tags?.some(t => postItem.tags?.includes(t)))
 *     .slice(0, 3);
 */

import React from 'react';
import Link from 'next/link';

export interface RelatedPost {
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
}

interface RelatedPostsProps {
  prevPost?: RelatedPost;
  nextPost?: RelatedPost;
  /** Posts sharing at least one tag with the current article */
  relatedPosts?: RelatedPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  prevPost,
  nextPost,
  relatedPosts = [],
}) => {
  const hasNav = Boolean(prevPost || nextPost);
  const hasRelated = relatedPosts.length > 0;

  if (!hasNav && !hasRelated) return null;

  return (
    <div className="mt-16 space-y-10 pt-10 border-t border-gray-200 dark:border-gray-700">

      {/* ── Previous / Next navigation ── */}
      {hasNav && (
        <nav aria-label="Post navigation">
          <div className="grid sm:grid-cols-2 gap-3">

            {/* Previous */}
            {prevPost ? (
              <Link
                href={`/posts/${prevPost.slug}`}
                className="group block rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3.5 hover:border-link dark:hover:border-blue-400 transition-colors"
              >
                <span className="block text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                  ← Previous
                </span>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-link dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              // Empty placeholder keeps the grid aligned when only "Next" exists
              <div />
            )}

            {/* Next */}
            {nextPost && (
              <Link
                href={`/posts/${nextPost.slug}`}
                className="group block rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3.5 hover:border-link dark:hover:border-blue-400 transition-colors text-right"
              >
                <span className="block text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
                  Next →
                </span>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-link dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  {nextPost.title}
                </span>
              </Link>
            )}

          </div>
        </nav>
      )}

      {/* ── Related posts ── */}
      {hasRelated && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Related
          </p>
          <ul className="space-y-3" role="list">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex items-start gap-2.5"
                >
                  <span
                    className="mt-0.5 shrink-0 text-xs text-gray-300 dark:text-gray-600 group-hover:text-link dark:group-hover:text-blue-400 transition-colors"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <div>
                    <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-link dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {post.title}
                    </span>
                    {post.description && (
                      <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1 leading-snug">
                        {post.description}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── View all writing CTA ── */}
      <div className="pt-2">
        <Link
          href="/posts"
          className="inline-flex items-center border border-gray-700 dark:border-gray-400 text-gray-700 dark:text-gray-300 rounded-full px-5 py-2 text-sm transition-colors duration-200 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-800"
        >
          ← View all writing
        </Link>
      </div>

    </div>
  );
};

export default RelatedPosts;
