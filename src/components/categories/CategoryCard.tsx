import Link from 'next/link';
import type { Category } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icons } from '@/components/icons';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon ? Icons[category.icon as keyof typeof Icons] || Icons.Component : Icons.Component;
  
  return (
    <Link href={category.path} className="block group">
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 ease-in-out hover:border-primary">
        <CardHeader className="flex flex-row items-center gap-4">
          {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
          <div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">{category.name}</CardTitle>
            <CardDescription className="text-sm">{category.description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
