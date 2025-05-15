

import { notFound } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { getToolById, getAllTools, getCategoryById } from '@/lib/toolsData';
import { ToolPlaceholderUI } from '@/components/tools/ToolPlaceholderUI';
import { LineBreakRemoverTool } from '@/components/tools/LineBreakRemoverTool';
import { RelatedTools } from '@/components/tools/RelatedTools';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';
import { APP_NAME, APP_DOMAIN } from '@/lib/constants';
import { Icons } from '@/components/icons';
import type { Tool, RelatedToolData } from '@/types';

type ToolPageProps = {
  params: { toolId: string };
};

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolById(params.toolId);
  if (!tool) {
    return {
      title: `Tool Not Found | ${APP_NAME}`,
    };
  }
  return {
    title: `${tool.title} | ${APP_NAME}`,
    description: tool.description,
    keywords: tool.keywords ? tool.keywords.join(', ') : tool.title,
    openGraph: {
        title: `${tool.title} | ${APP_NAME}`,
        description: tool.description,
        url: `https://${APP_DOMAIN}/tools/${tool.id}`,
        // images: [{ url: `https://${APP_DOMAIN}/og-tool-${tool.id}.png` }], // Example for specific OG image
    }
  };
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolById(params.toolId);
  const allToolsData = getAllTools(); // For related tools suggestions

  if (!tool) {
    notFound();
  }

  const category = getCategoryById(tool.category);
  const IconComponent = tool.iconName ? Icons[tool.iconName as keyof typeof Icons] || Icons.Settings2 : Icons.Settings2;

  const renderToolUI = () => {
    if (!tool) return null;
    switch (tool.id) {
      case 'line-break-remover':
        return <LineBreakRemoverTool />;
      // Add cases for other tools here as they are implemented
      // case 'another-tool-id':
      //   return <AnotherToolComponent />;
      default:
        return <ToolPlaceholderUI toolTitle={tool.title} />;
    }
  };

  // Prepare plain data for RelatedTools client component
  const currentToolForRelated: RelatedToolData = {
    id: tool.id,
    title: tool.title,
    path: tool.path,
    iconName: tool.iconName,
  };
  const allToolsForRelated: RelatedToolData[] = allToolsData.map(t => ({
    id: t.id,
    title: t.title,
    path: t.path,
    iconName: t.iconName,
  }));


  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-3">
            <IconComponent className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{tool.title}</h1>
          </div>
          <p className="text-lg text-muted-foreground">{tool.description}</p>
          {category && (
            <Link href={category.path} className="mt-2 inline-block">
              <Badge variant="secondary">{category.name}</Badge>
            </Link>
          )}
        </header>

        {/* Tool UI */}
        <div className="my-8">
          {renderToolUI()}
        </div>
        
        {/* <!-- AdSense Placeholder: Below Tool UI --> */}

        {tool.longDescription && (
           <section className="my-12 prose dark:prose-invert max-w-none 
                               prose-headings:font-semibold prose-headings:text-foreground 
                               prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8
                               prose-p:leading-relaxed prose-p:text-muted-foreground
                               prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1
                               prose-li:text-muted-foreground">
            <div className="mb-8">
              <h2 className="border-b pb-2">Overview</h2>
              <p>{tool.longDescription.overview}</p>
            </div>
            <div className="mb-8">
              <h2 className="border-b pb-2">Use Cases</h2>
              <ul>
                {tool.longDescription.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h2 className="border-b pb-2">How It Works</h2>
              <p>{tool.longDescription.howItWorks}</p>
            </div>
            {tool.longDescription.tips && tool.longDescription.tips.length > 0 && (
              <div className="mb-8">
                <h2 className="border-b pb-2">Tips for Better Usage</h2>
                <ul>
                  {tool.longDescription.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* FAQs */}
        {tool.faqs && tool.faqs.length > 0 && (
          <section className="my-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {tool.faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             {/* <!-- AdSense Placeholder: Within FAQs --> */}
          </section>
        )}

        {/* Related Tools */}
        <RelatedTools currentTool={currentToolForRelated} allTools={allToolsForRelated} />
        
        {/* <!-- AdSense Placeholder: Bottom of Page / Sidebar area --> */}
      </div>
    </PageWrapper>
  );
}
