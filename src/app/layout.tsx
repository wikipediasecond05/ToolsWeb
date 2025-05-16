
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Use Inter from Google Fonts
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster"
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

const inter = Inter({
  variable: '--font-inter', // CSS variable for Inter
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_TAGLINE,
  // Add more SEO metadata here: Open Graph, Twitter Cards, etc.
  openGraph: {
    title: APP_NAME,
    description: APP_TAGLINE,
    type: 'website',
    siteName: APP_NAME,
    // Add your site URL and a default image URL
    // url: 'https://NymGram.com', 
    // images: [{ url: 'https://NymGram.com/og-image.png' }], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('nymgram-theme');
                if (theme) {
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.classList.add(theme);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            })();
          `,
        }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="nymgram-theme"
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
