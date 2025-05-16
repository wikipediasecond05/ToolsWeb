
import { notFound } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { getCategoryById, getToolsByCategory, getAllCategories } from '@/lib/toolsData';
import { ToolCard } from '@/components/tools/ToolCard';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { Icons } from '@/components/icons';
import type { SerializableToolData, Tool } from '@/types';

type CategoryToolsPageProps = {
  params: { categoryId: string };
};

export async function generateMetadata({ params }: CategoryToolsPageProps): Promise<Metadata> {
  const category = getCategoryById(params.categoryId);
  if (!category) {
    return {
      title: `Category Not Found | ${APP_NAME}`, // Keep APP_NAME for "Not Found"
    };
  }
  return {
    title: category.name,
    description: `Browse all tools in the ${category.name} category on ${APP_NAME}. ${category.description}`,
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default function CategoryToolsPage({ params }: CategoryToolsPageProps) {
  const category = getCategoryById(params.categoryId);
  
  if (!category) {
    notFound();
  }
  
  const toolsInCategoryFull = getToolsByCategory(params.categoryId);
  const IconComponent = category.iconName ? Icons[category.iconName as keyof typeof Icons] || Icons.Component : Icons.Component;

  // Transform tools to be serializable
  const toolsIncategory: SerializableToolData[] = toolsInCategoryFull.map(tool => {
    const { icon, ...serializableTool } = tool as Tool; // Cast to Tool to satisfy Omit
    return serializableTool;
  });

  return (
    <PageWrapper>
      <div className="mb-12 text-center">
        <div className="flex justify-center items-center gap-3 mb-3">
          <IconComponent className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
        </div>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>
      
      {/* <!-- AdSense Placeholder: Top of Tool List for Category --> */}

      {toolsIncategory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toolsIncategory.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No tools found in this category yet.</p>
      )}
      {/* <!-- AdSense Placeholder: Bottom of Tool List for Category --> */}
    </PageWrapper>
  );
}
