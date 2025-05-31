
import type { Metadata, ResolvingMetadata } from 'next';
import { getToolById } from '@/lib/toolsData';
import { APP_NAME } from '@/lib/constants';

type ToolPageLayoutProps = {
  params: { toolId: string };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: ToolPageLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const toolId = (await params).toolId;
  const tool = getToolById(toolId);

  if (!tool) {
    return {
      title: `Tool Not Found | ${APP_NAME}`, // Keep APP_NAME for "Not Found" as it's an app-level message
      description: `The tool you are looking for could not be found on ${APP_NAME}.`,
    };
  }

  const pageTitle = tool.title; // Changed: Removed APP_NAME
  const pageDescription = tool.longDescription?.overview || tool.description;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      // Add a relevant image URL if available for each tool or a default one
      // images: [{ url: tool.ogImage || '/default-og-image.png' }],
      siteName: APP_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      // images: [tool.twitterImage || '/default-twitter-image.png'],
    },
  };
}

export default function ToolLayout({ children }: ToolPageLayoutProps) {
  return <>{children}</>;
}
