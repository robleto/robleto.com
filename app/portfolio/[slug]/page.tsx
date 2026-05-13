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
    <div className="pt-12 md:pt-16 lg:pt-20">
      {/* Header band — breadcrumb, title, subtitle all live at reading measure */}
      <div className="max-w-2xl mx-auto">
        {/* Navigation breadcrumb */}
        <div className="mb-6">
          <Link
            href="/portfolio"
            className="text-sm text-gray-400 dark:text-gray-500 hover:text-link dark:hover:text-blue-400 transition-colors"
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
      </div>

      {/* Hero Image — breaks out one step wider than the body (max-w-3xl). */}
      {((portfolioItem as PortfolioItem).image || portfolioItem.slug) && (
        <div className="mb-8 max-w-3xl mx-auto">
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

      {/* Case Study Content — constrained to the reading measure */}
      <div className="max-w-2xl mx-auto">
        {portfolioItem.content && portfolioItem.content.length > 0 ? (
          <NotionRenderer blocks={portfolioItem.content} />
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Case study content is being prepared. Please check back soon.
            </p>
          </div>
        )}

        {/* Back to portfolio — quieter close, no SaaS-blue CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/portfolio"
            className="text-sm text-gray-400 dark:text-gray-500 hover:text-link dark:hover:text-blue-400 transition-colors"
          >
            ← View All Portfolio Work
          </Link>
        </div>
      </div>
    </div>
  );
}