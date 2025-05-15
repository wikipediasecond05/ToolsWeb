
import Link from 'next/link';
import type { Tool } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { getCategoryById } from '@/lib/toolsData';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = tool.iconName ? Icons[tool.iconName as keyof typeof Icons] || Icons.Settings2 : Icons.Settings2;
  const category = getCategoryById(tool.category);

  return (
    <Link href={tool.path} className="block group">
      <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-all duration-200 ease-in-out hover:border-primary dark:hover:bg-accent/10 hover:bg-accent/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            {IconComponent && <IconComponent className="h-7 w-7 text-primary" />}
            <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.title}</CardTitle>
          </div>
          <CardDescription className="text-sm line-clamp-2">{tool.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          {category && <Badge variant="outline">{category.name}</Badge>}
        </CardFooter>
      </Card>
    </Link>
  );
}
