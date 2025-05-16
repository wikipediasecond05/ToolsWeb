'use client'; 

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ToolCard } from '@/components/tools/ToolCard';
import { getAllTools, getAllCategories, getCategoryById } from '@/lib/toolsData';
import type { Tool, Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ToolsPage() {
  const searchParams = useSearchParams();
  const initialCategoryFilter = searchParams.get('category') || 'all';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter);
  const [sortBy, setSortBy] = useState('title'); // 'title' or 'category'

  const allTools = useMemo(() => getAllTools(), []);
  const categories = useMemo(() => getAllCategories(), []);

  useEffect(() => {
    const searchFromUrl = searchParams.get('search') || '';
    setSearchTerm(searchFromUrl);
    setCategoryFilter(initialCategoryFilter);
  }, [searchParams, initialCategoryFilter]);

  const filteredTools = useMemo(() => {
    let tools = allTools;

    if (categoryFilter !== 'all') {
      tools = tools.filter(tool => tool.category === categoryFilter);
    }

    if (searchTerm) {
      tools = tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.keywords && tool.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (sortBy === 'title') {
      tools.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'category') {
      tools.sort((a, b) => {
        const catA = getCategoryById(a.category)?.name || '';
        const catB = getCategoryById(b.category)?.name || '';
        return catA.localeCompare(catB);
      });
    }
    
    return tools;
  }, [allTools, searchTerm, categoryFilter, sortBy]);

  const toolsByCategory = useMemo(() => {
    if (categoryFilter !== 'all' || searchTerm) { 
      return { 'Filtered Results': filteredTools };
    }
    return filteredTools.reduce((acc, tool) => {
      const categoryName = getCategoryById(tool.category)?.name || 'Uncategorized';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(tool);
      return acc;
    }, {} as Record<string, Tool[]>);
  }, [filteredTools, categoryFilter, searchTerm]);


  return (
    <PageWrapper>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">All Tools</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover our comprehensive suite of tools designed for developers and digital professionals.
        </p>
      </div>
      
      {/* <!-- AdSense Placeholder: Top of Tools List --> */}

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          aria-label="Search tools"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]" aria-label="Filter by category">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Sort by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Sort by Title</SelectItem>
            <SelectItem value="category">Sort by Category</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {Object.keys(toolsByCategory).length === 0 && (searchTerm || categoryFilter !== 'all') && (
         <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No tools found matching your criteria.</p>
         </div>
      )}

      {Object.entries(toolsByCategory).map(([categoryName, toolsList]) => (
        toolsList.length > 0 && (
          <section key={categoryName} className="mb-12">
            {(categoryFilter === 'all' && !searchTerm) && ( 
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{categoryName}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {toolsList.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )
      ))}
      {/* <!-- AdSense Placeholder: Bottom of Tools List / Sidebar --> */}
    </PageWrapper>
  );
}
