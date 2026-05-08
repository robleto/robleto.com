import React from "react";
import { notFound } from "next/navigation";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import type { PortfolioItem } from "@/types";
import NotionRenderer from "@/app/_components/notion/NotionRenderer";
import NotionImage from "@/app/_components/notion/NotionImage";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import Link from "next/link";

interface PortfolioItemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Get all portfolio items to generate static paths
  const { listItems: portfolioItems } = await HybridContentFetcher.getPortfolioItems();
  
  return portfolioItems.map((item: PortfolioItem) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PortfolioItemPageProps) {
  const { slug } = await params;
  const portfolioItem = await HybridContentFetcher.getPortfolioItemBySlug(slug);
  
  if (!portfolioItem) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${portfolioItem.title} | Greg Robleto Portfolio`,
    description: (portfolioItem as PortfolioItem).subtitle || `Case study: ${portfolioItem.title}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function PortfolioItemPage({ params }: PortfolioItemPageProps) {
  const { slug } = await params;
  const portfolioItem = await HybridContentFetcher.getPortfolioItemBySlug(slug);

  if (!portfolioItem) {
    notFound();
  }

  return (
    <div>
      {/* Navigation breadcrumb */}
      <div className="mb-6">
        <Link 
          href="/portfolio" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Page Header */}
      <PageHeader
        title={portfolioItem.title}
        icon="portfolio"
        pageContent={[]} // No additional page content needed
      />

      {/* Subtitle */}
      {(portfolioItem as PortfolioItem).subtitle && (
        <div className="mb-8">
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {(portfolioItem as PortfolioItem).subtitle}
          </p>
        </div>
      )}

      {/* Hero Image — prefer local downloaded copy (public/portfolio/{slug}.png),
          fall back to the (potentially expiring) Notion URL on error. */}
      {((portfolioItem as PortfolioItem).image || portfolioItem.slug) && (
        <div className="mb-8">
          <NotionImage
            src={
              portfolioItem.slug
                ? `/portfolio/${portfolioItem.slug}.png`
                : ((portfolioItem as PortfolioItem).image as string)
            }
            fallbackSrc={
              portfolioItem.slug
                ? ((portfolioItem as PortfolioItem).image as string) || undefined
                : undefined
            }
            alt={portfolioItem.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Case Study Content */}
      <div className="max-w-4xl mx-auto">
        {portfolioItem.content && portfolioItem.content.length > 0 ? (
          <NotionRenderer blocks={portfolioItem.content} />
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-gray-500 dark:text-gray-400">
              Case study content is being prepared. Please check back soon.
            </p>
          </div>
        )}
      </div>

      {/* Back to portfolio link */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <Link 
          href="/portfolio" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← View All Portfolio Work
        </Link>
      </div>
    </div>
  );
}