
'use client';

import React from 'react'; // React must be imported to use React.use
import { notFound } from 'next/navigation';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { getToolById, getAllTools, getCategoryById } from '@/lib/toolsData';
import { ToolPlaceholderUI } from '@/components/tools/ToolPlaceholderUI';
import { LineBreakRemoverTool } from '@/components/tools/LineBreakRemoverTool';
import { TextCaseConverterTool } from '@/components/tools/TextCaseConverterTool';
import { WordCounterTool } from '@/components/tools/WordCounterTool';
import { ColorPickerTool } from '@/components/tools/ColorPickerTool';
import { CSSMinifierTool } from '@/components/tools/CSSMinifierTool';
import { CSVToJSONTool } from '@/components/tools/CSVToJSONTool';
import { MarkdownToHTMLTool } from '@/components/tools/MarkdownToHTMLTool';
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool';
import { HashGeneratorTool } from '@/components/tools/HashGeneratorTool';
import { JSONFormatterTool } from '@/components/tools/JSONFormatterTool';
import { JWTDecoderTool } from '@/components/tools/JWTDecoderTool';
import { UUIDGeneratorTool } from '@/components/tools/UUIDGeneratorTool';
import { TimestampConverterTool } from '@/components/tools/TimestampConverterTool';
import { LoremIpsumGeneratorTool } from '@/components/tools/LoremIpsumGeneratorTool';
import { SentenceCounterTool } from '@/components/tools/SentenceCounterTool';
import { SlopePercentageCalculatorTool } from '@/components/tools/SlopePercentageCalculatorTool';


import { RelatedTools } from '@/components/tools/RelatedTools';
import { EmojiRating } from '@/components/tools/EmojiRating';
import { CommentSection } from '@/components/tools/CommentSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import type { Tool, RelatedToolData } from '@/types';


export default function ToolPage({ params }: { params: { toolId: string } }) {
  const actualParams = React.use(params); // Unwrapping the params Promise
  const tool = getToolById(actualParams.toolId); 
  const allToolsData = getAllTools();

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
      case 'text-case-converter':
        return <TextCaseConverterTool />;
      case 'word-counter':
        return <WordCounterTool />;
      case 'sentence-counter':
        return <SentenceCounterTool />;
      case 'color-picker':
        return <ColorPickerTool />;
      case 'css-minifier':
        return <CSSMinifierTool />;
      case 'csv-to-json':
        return <CSVToJSONTool />;
      case 'markdown-to-html':
        return <MarkdownToHTMLTool />;
      case 'password-generator':
        return <PasswordGeneratorTool />;
      case 'hash-generator':
        return <HashGeneratorTool />;
      case 'json-formatter':
        return <JSONFormatterTool />;
      case 'jwt-decoder':
        return <JWTDecoderTool />;
      case 'uuid-generator':
        return <UUIDGeneratorTool />;
      case 'timestamp-converter':
        return <TimestampConverterTool />;
      case 'lorem-ipsum-generator':
        return <LoremIpsumGeneratorTool />;
      case 'slope-percentage-calculator':
        return <SlopePercentageCalculatorTool />;
      default:
        return <ToolPlaceholderUI toolTitle={tool.title} />;
    }
  };

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
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
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

      <div className="lg:flex lg:gap-8">
        {/* Main Content Column */}
        <div className="lg:w-2/3 space-y-12">
          {renderToolUI()}
          
          {/* Related Tools & Rating - Mobile & Tablet Only (stacks below tool UI) */}
          <div className="lg:hidden space-y-8 mt-12">
            <RelatedTools currentTool={currentToolForRelated} allTools={allToolsForRelated} />
            <EmojiRating toolId={tool.id} />
          </div>
          
          <section>
            <CommentSection toolId={tool.id} />
          </section>

          {/* Long Description */}
          {tool.longDescription && (
            <section className="prose dark:prose-invert max-w-none 
                                prose-headings:font-semibold prose-headings:text-foreground 
                                prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:border-b prose-h2:pb-2
                                prose-p:leading-relaxed prose-p:text-muted-foreground
                                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1
                                prose-li:text-muted-foreground">
              <div className="mb-8">
                <h2 className="!mt-0">Overview</h2> {/* !mt-0 for first heading in prose */}
                <p>{tool.longDescription.overview}</p>
              </div>
              {tool.longDescription.useCases && tool.longDescription.useCases.length > 0 && (
                <div className="mb-8">
                  <h2>Use Cases</h2>
                  <ul>
                    {tool.longDescription.useCases.map((useCase, index) => (
                      <li key={index}>{useCase}</li>
                    ))}
                  </ul>
                </div>
              )}
              {tool.longDescription.howItWorks && (
                <div className="mb-8">
                  <h2>How It Works</h2>
                  <p>{tool.longDescription.howItWorks}</p>
                </div>
              )}
              {tool.longDescription.tips && tool.longDescription.tips.length > 0 && (
                <div className="mb-8">
                  <h2>Tips for Better Usage</h2>
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
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {tool.faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="hover:no-underline text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}
        </div>

        {/* Sidebar Column - Desktop Only */}
        <aside className="hidden lg:block lg:w-1/3 lg:sticky lg:top-24 space-y-8 mt-12 lg:mt-0 self-start">
          <section>
            <RelatedTools currentTool={currentToolForRelated} allTools={allToolsForRelated} />
          </section>
          <section>
            <EmojiRating toolId={tool.id} />
          </section>
        </aside>
      </div>
    </PageWrapper>
  );
}
