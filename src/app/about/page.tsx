
import { PageWrapper } from '@/components/layout/PageWrapper';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: { absolute: `About Us` },
  description: `Learn about the mission and vision of ${APP_NAME}. We provide useful, fast, and free tools for developers and digital professionals.`,
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8 text-center">About {APP_NAME}</h1>
        
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p>
            At {APP_NAME}, our mission is simple: to provide useful, fast, and free tools for developers, 
            content creators, and digital professionals. We believe that powerful utilities shouldn't
            come with a hefty price tag or a complicated user experience. We aim to build a collection
            of high-quality tools that solve real-world problems efficiently.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Why We Built {APP_NAME}</h2>
          <p>
            As developers and creators ourselves, we often found ourselves searching for simple online tools 
            for common tasks – a quick JSON format, a Base64 encode, or a line break remover. While many 
            such tools exist, they are often cluttered with ads, slow, or require unnecessary sign-ups. 
            We wanted to create a destination that prioritizes utility and user experience above all else.
            {APP_NAME} is born out of the desire for a clean, reliable, and accessible toolkit that respects
            user privacy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Utility:</strong> Every tool on {APP_NAME} is designed to be genuinely useful and solve a specific problem effectively.
            </li>
            <li>
              <strong>User Experience (UX):</strong> We strive for clean, intuitive interfaces that are a pleasure to use. No confusing layouts, no unnecessary steps.
            </li>
            <li>
              <strong>Performance:</strong> Our tools are built to be fast and responsive. We optimize for speed so you can get your tasks done without delay.
            </li>
            <li>
              <strong>Privacy:</strong> We respect your privacy. Most of our tools operate entirely client-side, meaning your data never leaves your browser. We have no login walls and minimize data collection.
            </li>
            <li>
              <strong>Accessibility:</strong> We aim to make our tools accessible to as many people as possible, following web accessibility best practices.
            </li>
            <li>
              <strong>Free Access:</strong> All our core tools are, and will remain, free to use. We may display non-intrusive ads to support the site's development and maintenance.
            </li>
          </ul>
        </section>
        
        <section className="mb-10 text-center">
          <p>
            Thank you for using {APP_NAME}. We're constantly working to add new tools and improve existing ones. 
            If you have any feedback or suggestions, please don't hesitate to <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </section>
        {/* <!-- AdSense Placeholder: About Page Content Area --> */}
      </div>
    </PageWrapper>
  );
}
