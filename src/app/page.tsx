
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { ToolCard } from '@/components/tools/ToolCard';
import { getAllCategories, getAllTools, getPopularSlugs, getToolsByCategory } from '@/lib/toolsData';
import type { SerializableToolData } from '@/types'; 
import { HeroShineEffect } from '@/components/layout/HeroShineEffect';
import { HomepageSearch } from '@/components/search/HomepageSearch';
import { Icons } from '@/components/icons';
import type { Metadata } from 'next';
import { FavoriteToolsSection } from '@/components/homepage/FavoriteToolsSection';
import { FeaturedTools } from '@/components/homepage/FeaturedTools';

export const metadata: Metadata = {
  title: { absolute: APP_TAGLINE },
  description: `${APP_NAME} is dedicated to providing high-quality, intuitive utilities to enhance productivity for developers and digital professionals.`,
};

export default function HomePage() {
  const categories = getAllCategories();
  const popularSlugs = getPopularSlugs();
  const popularToolsFull = getAllTools().filter(tool => popularSlugs.filter(slug => slug.slug === tool.path).length > 0).reverse();

  // Transform popularTools to be serializable
  const popularTools: SerializableToolData[] = popularToolsFull.map(tool => {
    const { icon, ...serializableTool } = tool;
    return serializableTool;
  });

  return (
    <HeroShineEffect>
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {APP_TAGLINE}
          </p>
          <div className="mt-10 mb-10">
            <HomepageSearch />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/tools">Explore All Tools</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </section>

      <FeaturedTools />
      
      <PageWrapper>
        <FavoriteToolsSection />

        <section className="py-12 md:py-16">
          <div className="flex items-center gap-3 mb-10">
            <Icons.Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-[24px] font-bold">Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="text-left mt-8">
            <Button asChild variant="link">
              <Link href="/tools">Discover More Tools &rarr;</Link>
            </Button>
          </div>
        </section>

        {/* <!-- AdSense Placeholder: Between Sections --> */}

        {/* All Categories with their Tools Section */}
        <section className="py-2">
          {categories.map((category) => {
            const toolsInCategoryFull = getToolsByCategory(category.id).slice(0, 4); // Show first 4 tools
            
            // Transform toolsInCategory to be serializable
            const toolsInCategory: SerializableToolData[] = toolsInCategoryFull.map(tool => {
              const { icon, ...serializableTool } = tool;
              return serializableTool;
            });

            if (toolsInCategory.length === 0) return null; // Skip category if no tools

            const CategoryIconComponent = category.iconName ? Icons[category.iconName as keyof typeof Icons] || Icons.Component : Icons.Component;
            return (
              <div key={category.id} className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    {CategoryIconComponent && <CategoryIconComponent className="h-6 w-6 text-primary" />}
                    <h2 className="text-[24px] font-bold">{category.name}</h2>
                  </div>
                  <Button asChild variant="link" size="sm">
                    <Link href={category.path}>See all &rarr;</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {toolsInCategory.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="py-5 mb-12">
          <div className="flex items-center gap-3 mb-12">
            <Icons.ThumbsUp className="h-6 w-6 text-primary" />
            <h2 className="text-[24px] font-bold">Why Choose {APP_NAME}?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border rounded-lg shadow-sm bg-white/55 dark:bg-background/55">
              <Icons.Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
              <p className="text-muted-foreground">Tools designed for speed and reliability, helping you get things done quickly.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm bg-white/55 dark:bg-background/55">
              <Icons.CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
              <p className="text-muted-foreground">Clean, intuitive interfaces that are easy to navigate and use, for all skill levels.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm bg-white/55 dark:bg-background/55">
              <Icons.ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
              <p className="text-muted-foreground">No invasive tracking, no login walls. Your data stays yours.</p>
            </div>
          </div>
        </section>
      </PageWrapper>
      <section className='w-full bg-white dark:bg-background md:p-6 p-3 rounded-md border border-gray-100 dark:border-gray-800'>
          <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6'>
            <div className="flex items-center gap-3 mb-7">
              <h2 className="text-2xl text-gray-800 dark:text-gray-300 font-bold">Fullfill all your needs!</h2>
            </div>
            
          <div className="space-y-6 text-[19px]/loose">
              <p>
                <span className="text-primary">NymGram</span> brings all essential online tools under one roof. Whether you're editing text, working with images, generating code, or solving everyday digital tasks — NymGram has you covered.
              </p>

              <p>
                Forget juggling multiple websites and endless bookmarks. <span className="font-semibold text-primary">NymGram is your one-stop hub</span> for smart, efficient, and user-friendly tools, all designed with simplicity and performance in mind.
              </p>

              <p>
                Each tool is crafted to deliver results in the fewest steps possible, with a clean interface that keeps you focused on what matters.
              </p>

              <p className="text-lg md:text-xl font-semibold">
                Start using <span className="text-primary">NymGram</span> today — and make scattered tools a thing of the past.
              </p>
            </div>
          </div>
        </section>
    </HeroShineEffect>
  );
}

    