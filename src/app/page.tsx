
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

export const metadata: Metadata = {
  title: { absolute: APP_TAGLINE },
  description: `Welcome to ${APP_NAME} - ${APP_TAGLINE}`,
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

  const testimonials = [
    {
      quote: `${APP_NAME} has become my go-to for quick developer tasks. The JSON formatter is a lifesaver!`,
      name: "Alex R.",
      role: "Full Stack Developer"
    },
    {
      quote: "Clean UI, fast tools, and no annoying popups. Exactly what I need. Highly recommended!",
      name: "Sarah L.",
      role: "Frontend Engineer"
    },
    {
      quote: "The variety of tools is impressive. From text manipulation to security, it's all here.",
      name: "Mike P.",
      role: "DevOps Specialist"
    }
  ];

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

      <PageWrapper>
        <FavoriteToolsSection />

        <section className="py-12 md:py-16">
          <div className="flex items-center gap-3 mb-10">
            <Icons.Sparkles className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Popular Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <section className="py-12 md:py-16">
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
                    {CategoryIconComponent && <CategoryIconComponent className="h-8 w-8 text-primary" />}
                    <h2 className="text-3xl font-bold">{category.name}</h2>
                  </div>
                  <Button asChild variant="link" size="sm">
                    <Link href={category.path}>See all &rarr;</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {toolsInCategory.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="py-16 md:py-24">
          <div className="flex items-center gap-3 mb-10">
            <Icons.ThumbsUp className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Why Choose {APP_NAME}?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border rounded-lg shadow-sm">
              <Icons.Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
              <p className="text-muted-foreground">Tools designed for speed and reliability, helping you get things done quickly.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <Icons.CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
              <p className="text-muted-foreground">Clean, intuitive interfaces that are easy to navigate and use, for all skill levels.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm">
              <Icons.ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
              <p className="text-muted-foreground">No invasive tracking, no login walls. Your data stays yours.</p>
            </div>
          </div>
        </section>
        
        {/* <!-- AdSense Placeholder: Below Content / In FAQs area --> */}

        <section className="py-12 md:py-16 rounded-lg">
           <div className="flex items-center gap-3 mb-12">
             <Icons.Users className="h-8 w-8 text-primary" />
             <h2 className="text-3xl font-bold">What Our Users Say</h2>
           </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 bg-card border rounded-lg shadow-sm">
                  <p className="text-card-foreground italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              ))}
            </div>
        </section>
      </PageWrapper>
    </HeroShineEffect>
  );
}

    