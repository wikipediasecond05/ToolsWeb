
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: { absolute: 'All Tools' }, // Changed to absolute
  description: `Discover all available tools on ${APP_NAME}.`,
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
