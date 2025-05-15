import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface ToolPlaceholderUIProps {
  toolTitle: string;
}

export function ToolPlaceholderUI({ toolTitle }: ToolPlaceholderUIProps) {
  return (
    <Card className="my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{toolTitle} - Tool Interface</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[300px] flex flex-col items-center justify-center text-muted-foreground bg-muted/30 rounded-b-lg">
        <Construction className="h-16 w-16 mb-4" />
        <p className="text-lg">Tool UI for "{toolTitle}" will be here.</p>
        <p className="text-sm">Interactive elements and functionality coming soon!</p>
        {/* <!-- AdSense Placeholder: Within Tool UI (if appropriate for the tool) --> */}
      </CardContent>
    </Card>
  );
}
