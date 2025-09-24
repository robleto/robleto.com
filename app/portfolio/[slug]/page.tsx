import React from "react";
import { notFound } from "next/navigation";
import { HybridContentFetcher } from "@/lib/hybridContentFetcher";
import type { PortfolioItem } from "@/types";
import NotionRenderer from "@/app/_components/notion/NotionRenderer";
import PageHeader from "@/app/_components/layout/page/PageHeader";
import Link from "next/link";

interface PortfolioItemPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // Get all portfolio items to generate static paths
  const { listItems: portfolioItems } = await HybridContentFetcher.getPortfolioItems();
  
  return portfolioItems.map((item: PortfolioItem) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PortfolioItemPageProps) {
  const portfolioItem = await HybridContentFetcher.getPortfolioItemBySlug(params.slug);
  
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
  const portfolioItem = await HybridContentFetcher.getPortfolioItemBySlug(params.slug);

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

      {/* Hero Image */}
      {(portfolioItem as PortfolioItem).image && (
        <div className="mb-8">
          <img
            src={(portfolioItem as PortfolioItem).image as string}
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