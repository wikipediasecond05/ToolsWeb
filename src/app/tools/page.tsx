// app/tools/page.tsx
import { Suspense } from 'react';
import ToolsPageClient from './ToolsPageClient';

export default function ToolsPage() {
  return (
    <Suspense fallback={<div>Loading tools...</div>}>
      <ToolsPageClient />
    </Suspense>
  );
}
