
import { PageWrapper } from '@/components/layout/PageWrapper';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  title: { absolute: 'About Us' },
  description: `Discover the mission, vision, and values that drive ${APP_NAME}. Learn how we're committed to delivering exceptional tools for developers and digital professionals.`,
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          About <span className="text-primary">{APP_NAME}</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground">
          Empowering developers and digital creators with a suite of smart, simple, and powerful online utilities.
          At {APP_NAME}, we build tools that streamline your workflow and enhance your productivity.
        </p>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Icons.Rocket className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At {APP_NAME}, our mission is to provide an indispensable toolkit of high-performance, intuitive, and freely accessible utilities. We empower developers, content creators, and digital professionals by delivering solutions that enhance productivity and simplify complex tasks. We believe powerful tools should be elegant, efficient, and user-centric, addressing real-world challenges with sophistication and ease.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-muted/30 rounded-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Icons.Sparkles className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Why We Built {APP_NAME}</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            As seasoned developers and digital creators, we recognized a persistent need for reliable, straightforward online tools. The existing landscape often presented utilities cluttered with advertisements, hampered by slow performance, or gated by mandatory sign-ups. {APP_NAME} was conceived from a desire to create a sanctuary of pure utility—a clean, dependable, and readily accessible platform where user experience and privacy are paramount. We're building the toolkit we always wished we had.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Icons.ShieldCheck className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Our Commitment</h2>
          </div>
          <ul className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <li className="flex items-start">
              <Icons.CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Genuine Utility:</strong> We engineer tools that are purpose-built to solve specific problems effectively, ensuring every feature delivers tangible value.
              </div>
            </li>
            <li className="flex items-start">
              <Icons.Smile className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Seamless User Experience:</strong> Our dedication to intuitive design and frictionless interaction means clean interfaces and streamlined workflows, making our tools a pleasure to use.
              </div>
            </li>
            <li className="flex items-start">
              <Icons.Zap className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Optimized Performance:</strong> Speed and responsiveness are core to our development. We build tools that perform efficiently, so you can accomplish tasks without delay.
              </div>
            </li>
            <li className="flex items-start">
              <Icons.Lock className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Privacy First:</strong> We fundamentally respect your privacy. The majority of our tools operate client-side, ensuring your data never leaves your browser. We champion a no-login-wall policy and minimal data collection.
              </div>
            </li>
            <li className="flex items-start">
              <Icons.Globe className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Inclusive Accessibility:</strong> We are committed to making our tools accessible to the broadest possible audience by adhering to best practices in web accessibility (WCAG).
              </div>
            </li>
            <li className="flex items-start">
              <Icons.Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
              <div>
                <strong>Continuous Evolution:</strong> {APP_NAME} is a dynamic platform. Our core tools will always be free, and we are passionately committed to expanding our suite and refining existing utilities based on user feedback and emerging technologies.
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center py-12 md:py-16">
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're thrilled you're exploring {APP_NAME} and are dedicated to making it an indispensable part of your digital toolkit. Your insights and suggestions fuel our progress.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/contact">Share Your Feedback</Link>
          </Button>
        </div>
      </section>
    </PageWrapper>
  );
}
