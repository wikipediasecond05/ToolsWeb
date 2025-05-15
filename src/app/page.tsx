
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { ToolCard } from '@/components/tools/ToolCard';
import { getAllCategories, getAllTools } from '@/lib/toolsData';
import { CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Home | ${APP_NAME}`,
  description: `Welcome to ${APP_NAME} - ${APP_TAGLINE}`,
};

export default function HomePage() {
  const categories = getAllCategories().slice(0, 6); // Show a few categories
  const popularTools = getAllTools().slice(0, 6); // Show a few popular tools (example)

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
    <PageWrapper>
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Welcome to <span className="text-primary">{APP_NAME}</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {APP_TAGLINE}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/tools">Explore All Tools</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Tool Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="link">
            <Link href="/categories">View All Categories &rarr;</Link>
          </Button>
        </div>
      </section>
      
      {/* <!-- AdSense Placeholder: Between Sections --> */}

      {/* Popular Tools */}
      <section className="py-12 md:py-16 bg-secondary/50 rounded-lg">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10">Popular Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="link">
              <Link href="/tools">Discover More Tools &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why NymGram? Section */}
      <section className="py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose {APP_NAME}?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg shadow-sm">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast & Efficient</h3>
            <p className="text-muted-foreground">Tools designed for speed and reliability, helping you get things done quickly.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
            <p className="text-muted-foreground">Clean, intuitive interfaces that are easy to navigate and use, for all skill levels.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy Focused</h3>
            <p className="text-muted-foreground">No invasive tracking, no login walls. Your data stays yours.</p>
          </div>
        </div>
      </section>
      
      {/* <!-- AdSense Placeholder: Below Content / In FAQs area --> */}

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-muted/30 rounded-lg">
         <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-card border rounded-lg shadow-sm">
                <p className="text-card-foreground italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
