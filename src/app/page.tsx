
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { ToolCard } from '@/components/tools/ToolCard';
import { getAllCategories, getAllTools } from '@/lib/toolsData';
import { HeroShineEffect } from '@/components/layout/HeroShineEffect';
import { HomepageSearch } from '@/components/search/HomepageSearch';
import { Icons } from '@/components/icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: APP_TAGLINE },
  description: `Welcome to ${APP_NAME} - ${APP_TAGLINE}`,
};

export default function HomePage() {
  const categories = getAllCategories().slice(0, 6); 
  const popularTools = getAllTools().slice(0, 8); 

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
    <> {/* Use a fragment to allow HeroShineEffect to be full-width before PageWrapper */}
      {/* Hero Section */}
      <HeroShineEffect className="mb-12 border-b"> {/* This border will now be full-width */}
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
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
      </HeroShineEffect>

      <PageWrapper> {/* PageWrapper for subsequent sections */}
        {/* Tool Categories */}
        <section className="py-12 md:py-16">
          <div className="flex items-center gap-3 mb-10">
            <Icons.Layers3 className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Tool Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="text-left mt-8">
            <Button asChild variant="link">
              <Link href="/categories">View All Categories &rarr;</Link>
            </Button>
          </div>
        </section>
        
        {/* <!-- AdSense Placeholder: Between Sections --> */}

        {/* Popular Tools */}
        <section className="py-12 md:py-16 rounded-lg">
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

        {/* Why NymGram? Section */}
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

        {/* Testimonials Section */}
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
    </>
  );
}
