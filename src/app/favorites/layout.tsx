
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Favorite Tools',
  description: `Your collection of favorite tools on ${APP_NAME}. Manage and quickly access your pinned utilities.`,
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
