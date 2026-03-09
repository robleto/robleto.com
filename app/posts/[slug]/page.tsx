/**
 * app/posts/[slug]/page.tsx
 *
 * Article page template — supports both "post" and "case-study" variants.
 *
 * ── Configure variant ────────────────────────────────────────────────────────
 * The variant is read from postItem.variant (a field on PostItem in types/index.ts).
 * Add a "Variant" select property to your Notion Posts database with options
 * "post" (default) and "case-study". Map it in lib/dataMappers.ts under the
 * posts entry mapper. Until then, all posts default to the "post" variant.
 *
 * ── Configure related posts ──────────────────────────────────────────────────
 * prevPost / nextPost are computed by sort order from getAllPosts().
 * relatedPosts are filtered by shared tags. Adjust slice(0, 3) below
 * to show more or fewer suggestions.
 *
 * ── Configure TOC ────────────────────────────────────────────────────────────
 * The TOC is auto-generated from h2/h3 headings in the Notion content.
 * It appears as a sticky right rail on xl+ screens and as a collapsible
 * panel on smaller screens. Hidden when fewer than 2 headings exist.
 *
 * ── Configure case study brief ───────────────────────────────────────────────
 * When variant === 'case-study', render <CaseStudyBrief data={...} /> between
 * the header and main content. Populate `data` from additional PostItem fields
 * mapped in lib/dataMappers.ts (e.g. role, timeline, outcomes).
 */

import React from "react";
import { notFound } from "next/navigation";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import type { PostItem } from "@/types";

// Article components
import ArticleHeader from "@/app/_components/article/ArticleHeader";
import ReadingProgress from "@/app/_components/article/ReadingProgress";
import TableOfContents from "@/app/_components/article/TableOfContents";
import RelatedPosts from "@/app/_components/article/RelatedPosts";
import CaseStudyBrief from "@/app/_components/article/CaseStudyBrief";
import {
  buildHeadingIdMap,
  extractTocItems,
  calculateReadingTime,
} from "@/app/_components/article/tocUtils";

// Content renderer
import NotionRenderer from "@/app/_components/notion/NotionRenderer";

// ── Types ────────────────────────────────────────────────────────────────────

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const { listItems } = await HybridContentFetcher.getAllPosts();
  const postItems = listItems as PostItem[];

  return postItems
    .filter((item) => Boolean(item.slug))
    .map((item) => ({
      slug: item.slug as string,
    }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const postItem = await HybridContentFetcher.getPostBySlug(slug);

  if (!postItem) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${postItem.title} | Greg Robleto Writing`,
    description: postItem.description || `Post: ${postItem.title}`,
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  // Fetch current post + full posts list in parallel (for prev/next/related)
  const [postItem, { listItems }] = await Promise.all([
    HybridContentFetcher.getPostBySlug(slug),
    HybridContentFetcher.getAllPosts(),
  ]);

  if (!postItem) {
    notFound();
  }

  const allPosts = listItems as PostItem[];
  const content = postItem.content ?? [];
  const variant = postItem.variant ?? "post";

  // ── TOC + reading time (server-side, pure functions) ───────────────────────
  const headingIdMap = buildHeadingIdMap(content);
  const tocItems = extractTocItems(content, headingIdMap);
  const readingTime = calculateReadingTime(content);
  const hasToc = tocItems.length >= 2;

  // ── Prev / Next / Related posts ────────────────────────────────────────────
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);

  const prevPost =
    currentIndex > 0
      ? {
          title: allPosts[currentIndex - 1].title!,
          slug: allPosts[currentIndex - 1].slug!,
        }
      : undefined;

  const nextPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? {
          title: allPosts[currentIndex + 1].title!,
          slug: allPosts[currentIndex + 1].slug!,
        }
      : undefined;

  // Posts sharing at least one tag with the current post, capped at 3
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.tags?.some((t) => postItem.tags?.includes(t))
    )
    .slice(0, 3)
    .map((p) => ({
      title: p.title!,
      slug: p.slug!,
      description: p.description,
      tags: p.tags,
    }));

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Fixed reading progress bar (2px at very top of viewport) */}
      <ReadingProgress />

      {/* Article header: back nav, variant badge, title, lede, meta row + copy link */}
      <ArticleHeader
        title={postItem.title ?? "Untitled"}
        lede={postItem.description}
        pubdate={postItem.pubdate}
        readingTime={readingTime}
        tags={postItem.tags}
        series={postItem.series}
        variant={variant}
      />

      {/* Featured image */}
      {postItem.image && (
        <div className="mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={postItem.image}
            alt={postItem.title ?? "Featured image"}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Case study brief — structured project metadata.
          Only rendered when variant === 'case-study'.
          Populate `data` from Notion fields mapped in lib/dataMappers.ts. */}
      {variant === "case-study" && (
        <CaseStudyBrief
          data={{
            // Uncomment and map these as you add fields to PostItem / dataMappers.ts:
            // role:        postItem.caseStudyRole,
            // timeline:    postItem.caseStudyTimeline,
            // team:        postItem.caseStudyTeam,
            // context:     postItem.caseStudyContext,
            // constraints: postItem.caseStudyConstraints,
            // outcomes:    postItem.caseStudyOutcomes,
            // artifacts:   postItem.caseStudyArtifacts,
          }}
        />
      )}

      {/* ── Two-column layout: article content | desktop TOC right rail ── */}
      <div className="flex gap-10 items-start">

        {/* Content column */}
        <div className="flex-1 min-w-0">

          {/* Mobile TOC — collapsible panel, hidden on xl+ screens */}
          {hasToc && (
            <div className="xl:hidden">
              <TableOfContents items={tocItems} mode="mobile" />
            </div>
          )}

          {/* Main article content */}
          <article id="article-content">
            {content.length > 0 ? (
              <NotionRenderer blocks={content} headingIdMap={headingIdMap} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Content is being prepared. Please check back soon.
                </p>
              </div>
            )}

            {/* "Originally published elsewhere" attribution link */}
            {postItem.linkedUrl && (
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={postItem.linkedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-link dark:text-blue-400 hover:underline"
                >
                  Originally published elsewhere →
                </a>
              </div>
            )}
          </article>

          {/* Prev / Next navigation, related posts, and view-all CTA */}
          <RelatedPosts
            prevPost={prevPost}
            nextPost={nextPost}
            relatedPosts={relatedPosts}
          />
        </div>

        {/* Desktop TOC right rail — sticky, only visible on xl+ screens */}
        {hasToc && (
          <div className="hidden xl:block w-52 shrink-0">
            <TableOfContents items={tocItems} mode="desktop" />
          </div>
        )}

      </div>
    </>
  );
}
