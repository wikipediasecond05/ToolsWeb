// app/tools/page.tsx
import { Suspense } from 'react';
import ToolsPageClient from './ToolsPageClient';

export default function ToolsPage() {
  return (
    <Suspense fallback={
      <div className='w-full h-[600px] flex items-center justify-center'>
        Loading..
      </div>
    }>
      <ToolsPageClient />
    </Suspense>
  );
}
