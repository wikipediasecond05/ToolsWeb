
import { PageWrapper } from '@/components/layout/PageWrapper';
import type { Metadata } from 'next';
import { APP_NAME, APP_DOMAIN } from '@/lib/constants';

export const metadata: Metadata = {
  title: { absolute: `Privacy Policy` },
  description: `Read the Privacy Policy for ${APP_NAME} (${APP_DOMAIN}). Understand how we handle your data, cookies, and third-party services.`,
};

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <p>Welcome to {APP_NAME} (referred to as "{APP_DOMAIN}", "we", "us", or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website {APP_DOMAIN}, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Personal Data</h3>
        <p>Personally identifiable information, such as your name, email address, that you voluntarily give to us when you use our contact form. You are under no obligation to provide us with personal information of any kind, however your refusal to do so may prevent you from using certain features of the Site.</p>
        <p>Most of our tools operate client-side, meaning the data you input into these tools is processed in your browser and not sent to our servers, unless explicitly stated for a specific tool's functionality (e.g., tools requiring server-side processing).</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Log Data and Analytics</h3>
        <p>Like many site operators, we may collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address (anonymized where possible), browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics. We use this data for analytical purposes to improve our Site and services.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Cookies</h2>
        <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. A "cookie" is a string of information that assigns you a unique identifier that we store on your computer. Your browser then provides that unique identifier to use each time you submit a query to the Site.</p>
        <p>Specifically, we may use cookies for:</p>
        <ul className="list-disc list-inside">
          <li><strong>Functionality:</strong> To remember your preferences, such as dark/light mode settings.</li>
          <li><strong>Analytics:</strong> To understand how our Site is used, helping us improve user experience.</li>
          <li><strong>Advertising:</strong> We may use third-party advertising companies (like Google AdSense) to serve ads when you visit the Site. These companies may use cookies to display ads about goods and services of interest to you.</li>
        </ul>
        <p>You can control the use of cookies at the individual browser level. If you reject cookies, you may still use our Site, but your ability to use some features or areas of our Site may be limited.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Third-Party Services</h2>
        <p>We may use third-party services for various purposes, including:</p>
        <ul className="list-disc list-inside">
          <li><strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our Site. Google AdSense may use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.</li>
          <li><strong>Analytics Providers:</strong> We may use third-party analytics services (e.g., Google Analytics) to help analyze how users use the Site.</li>
        </ul>
        <p>These third-party service providers have their own privacy policies addressing how they use such information.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Data Security</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Children's Privacy</h2>
        <p>Our Site is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we become aware that we have collected personal information from a child under age 13 without verification of parental consent, we will take steps to remove that information from our servers.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
        
        {/* <!-- AdSense Placeholder: Privacy Policy Content Area --> */}
      </div>
    </PageWrapper>
  );
}
