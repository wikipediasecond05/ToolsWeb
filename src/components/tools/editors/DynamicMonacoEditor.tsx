
'use client';

import React, { Suspense } from 'next/dynamic';
import type { EditorProps } from '@monaco-editor/react';
import { useTheme } from '@/hooks/use-theme';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the Editor component
const MonacoEditor = dynamic(() => import('@monaco-editor/react').then(mod => mod.Editor), {
  ssr: false, // Monaco editor is client-side only
  loading: () => <Skeleton className="h-[300px] w-full" />, // Or your custom loader
});

interface DynamicMonacoEditorProps extends EditorProps {
  // You can add any custom props here if needed
}

const DynamicMonacoEditor: React.FC<DynamicMonacoEditorProps> = (props) => {
  const { theme: appTheme } = useTheme();
  const monacoTheme = appTheme === 'dark' ? 'vs-dark' : 'vs';

  return (
    <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
      <MonacoEditor
        height={props.height || "300px"}
        theme={monacoTheme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          ...props.options,
        }}
        {...props}
      />
    </Suspense>
  );
};

export default DynamicMonacoEditor;
