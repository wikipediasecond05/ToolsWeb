
import Link from 'next/link';
import type { Tool } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  // This is a placeholder for the icon component based on the image.
  // You would likely have a mapping of tool.iconName to actual icon components.
  const IconComponent = tool.iconName ? Icons[tool.iconName as keyof typeof Icons] || Icons.Settings2 : Icons.Settings2;

  return (
    <Link href={tool.path} className="block group">
      <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-all duration-200 ease-in-out hover:border-primary dark:hover:bg-accent/10 hover:bg-accent/5">
        <CardHeader>
          {IconComponent && <IconComponent className="h-10 w-10 text-primary" />}
          <CardTitle className="text-lg font-semibold mt-4 group-hover:text-primary transition-colors">{tool.title}</CardTitle>
          {/* Increased bottom margin */}
          <CardDescription className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4">{tool.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center pt-4">
          <span className="text-primary flex items-center gap-1 group-hover:underline">Open <span className="text-sm">&gt;</span></span>
          {/* Heart icon placeholder */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-muted-foreground group-hover:text-red-500 transition-colors"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </CardFooter>
      </Card>
    </Link>
  );
}
