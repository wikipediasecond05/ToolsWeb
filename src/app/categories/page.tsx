
import { PageWrapper } from '@/components/layout/PageWrapper';
import { CategoryCard } from '@/components/categories/CategoryCard';
import { getAllCategories } from '@/lib/toolsData';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tool Categories', // Changed: Removed APP_NAME
  description: `Browse all tool categories available on ${APP_NAME}. Find tools for text manipulation, development, design, and more.`,
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <PageWrapper>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Tool Categories</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore tools organized by category to quickly find what you need.
        </p>
      </div>
      
      {/* <!-- AdSense Placeholder: Top of Categories List --> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      {/* <!-- AdSense Placeholder: Bottom of Categories List --> */}
    </PageWrapper>
  );
}
