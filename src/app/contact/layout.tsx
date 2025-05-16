
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: { absolute: 'Contact Us' },
  description: `Get in touch with the ${APP_NAME} team. Send us your feedback, suggestions, or inquiries.`,
};

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
