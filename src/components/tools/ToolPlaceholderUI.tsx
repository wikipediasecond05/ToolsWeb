
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface ToolPlaceholderUIProps {
  toolTitle: string;
}

export function ToolPlaceholderUI({ toolTitle }: ToolPlaceholderUIProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{toolTitle}</CardTitle>
        <CardDescription className="text-lg">This tool is currently under construction.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px] flex flex-col items-center justify-center text-muted-foreground bg-muted/30 rounded-b-lg">
        <Construction className="h-16 w-16 mb-4 text-primary" />
        <p className="text-lg">Tool UI for "{toolTitle}" will be here.</p>
        <p className="text-sm">Interactive elements and functionality coming soon!</p>
        {/* <!-- AdSense Placeholder: Within Tool UI (if appropriate for the tool) --> */}
      </CardContent>
    </Card>
  );
}
