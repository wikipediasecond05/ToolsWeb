
'use client';

import React from 'react';
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
import { MD5HashGeneratorTool } from '@/components/tools/MD5HashGeneratorTool';
import { JSONFormatterTool } from '@/components/tools/JSONFormatterTool';
import { JWTDecoderTool } from '@/components/tools/JWTDecoderTool';
import { UUIDGeneratorTool } from '@/components/tools/UUIDGeneratorTool';
import { TimestampConverterTool } from '@/components/tools/TimestampConverterTool';
import { LoremIpsumGeneratorTool } from '@/components/tools/LoremIpsumGeneratorTool';
import { SentenceCounterTool } from '@/components/tools/SentenceCounterTool';
import { SlopePercentageCalculatorTool } from '@/components/tools/SlopePercentageCalculatorTool';
import { PlaybackSpeedCalculatorTool } from '@/components/tools/PlaybackSpeedCalculatorTool';
import { AudiobookSpeedCalculatorTool } from '@/components/tools/AudiobookSpeedCalculatorTool';
import { SleepCycleCalculatorTool } from '@/components/tools/SleepCycleCalculatorTool';
import { AiCommitMessageWriterTool } from '@/components/tools/AiCommitMessageWriterTool';
import { AiBlogPostIdeaGeneratorTool } from '@/components/tools/AiBlogPostIdeaGeneratorTool';
import { AiTextSummarizerTool } from '@/components/tools/AiTextSummarizerTool';
import { AiImageAltTextGeneratorTool } from '@/components/tools/AiImageAltTextGeneratorTool';
import { CSSGradientGeneratorTool } from '@/components/tools/CSSGradientGeneratorTool';
import { CSSBoxShadowGeneratorTool } from '@/components/tools/CSSBoxShadowGeneratorTool';
import { CSSBorderRadiusGeneratorTool } from '@/components/tools/CSSBorderRadiusGeneratorTool';
import { SvgWaveGeneratorTool } from '@/components/tools/SvgWaveGeneratorTool';
import { SvgBlobGeneratorTool } from '@/components/tools/SvgBlobGeneratorTool'; 
import { TemperatureConverterTool } from '@/components/tools/TemperatureConverterTool';
import { LengthConverterTool } from '@/components/tools/LengthConverterTool';
import { Base64EncoderDecoderTool } from '@/components/tools/Base64EncoderDecoderTool';
import { UrlEncoderDecoderTool } from '@/components/tools/UrlEncoderDecoderTool';
import { RgbToHexConverterTool } from '@/components/tools/RgbToHexConverterTool';
import { HexToRgbConverterTool } from '@/components/tools/HexToRgbConverterTool';
import { CronjobExpressionGeneratorTool } from '@/components/tools/CronjobExpressionGeneratorTool';
import { URLSlugGeneratorTool } from '@/components/tools/URLSlugGeneratorTool';


import { RelatedTools } from '@/components/tools/RelatedTools';
import { EmojiRating } from '@/components/tools/EmojiRating';
import { CommentSection } from '@/components/tools/CommentSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import type { RelatedToolData } from '@/types';


export default function ToolPage({ params }: { params: { toolId: string } }) {
  const actualParams = React.use(params);
  const tool = getToolById(actualParams.toolId);
  const allToolsData = getAllTools();

  if (!tool) {
    notFound();
  }

  const category = getCategoryById(tool.category);
  const ToolIconComponent = tool.iconName ? Icons[tool.iconName as keyof typeof Icons] || Icons.Settings2 : Icons.Settings2;

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
      case 'url-slug-generator':
        return <URLSlugGeneratorTool />;
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
      case 'md5-hash-generator':
        return <MD5HashGeneratorTool />;
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
      case 'playback-speed-calculator':
        return <PlaybackSpeedCalculatorTool />;
      case 'audiobook-speed-calculator':
        return <AudiobookSpeedCalculatorTool />;
      case 'sleep-cycle-calculator':
        return <SleepCycleCalculatorTool />;
      case 'ai-commit-message-writer':
        return <AiCommitMessageWriterTool />;
      case 'ai-blog-post-idea-generator':
        return <AiBlogPostIdeaGeneratorTool />;
      case 'ai-text-summarizer':
        return <AiTextSummarizerTool />;
      case 'ai-image-alt-text-generator':
        return <AiImageAltTextGeneratorTool />;
      case 'css-gradient-generator':
        return <CSSGradientGeneratorTool />;
      case 'css-box-shadow-generator':
        return <CSSBoxShadowGeneratorTool />;
      case 'css-border-radius-generator':
        return <CSSBorderRadiusGeneratorTool />;
      case 'svg-wave-generator':
        return <SvgWaveGeneratorTool />;
      case 'svg-blob-generator':
        return <SvgBlobGeneratorTool />;
      case 'temperature-converter':
        return <TemperatureConverterTool />;
      case 'length-converter':
        return <LengthConverterTool />;
      case 'base64-encoder-decoder':
        return <Base64EncoderDecoderTool />;
      case 'url-encoder-decoder':
        return <UrlEncoderDecoderTool />;
      case 'rgb-to-hex-converter':
        return <RgbToHexConverterTool />;
      case 'hex-to-rgb-converter':
        return <HexToRgbConverterTool />;
      case 'cronjob-expression-generator':
        return <CronjobExpressionGeneratorTool />;
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
          <ToolIconComponent className="h-10 w-10 text-primary" />
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
            <section className="space-y-6">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground mb-4 mt-8 border-b pb-2">
                  <Icons.Info className="h-6 w-6 text-primary" />
                  Overview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">{tool.longDescription.overview}</p>
              </div>
              {tool.longDescription.useCases && tool.longDescription.useCases.length > 0 && (
                <div>
                  <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground mb-4 mt-8 border-b pb-2">
                    <Icons.CheckCircle className="h-6 w-6 text-primary" />
                    Use Cases
                  </h2>
                  <ul className="list-none pl-0 space-y-3 text-lg text-muted-foreground leading-relaxed mb-4">
                    {tool.longDescription.useCases.map((useCase, index) => (
                       <li key={index} className="flex items-start">
                        <Icons.CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>{useCase}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tool.longDescription.howItWorks && (
                <div>
                  <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground mb-4 mt-8 border-b pb-2">
                    <Icons.Settings2 className="h-6 w-6 text-primary" />
                    How It Works
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">{tool.longDescription.howItWorks}</p>
                </div>
              )}
              {tool.longDescription.tips && tool.longDescription.tips.length > 0 && (
                <div>
                  <h2 className="flex items-center gap-2 text-2xl font-semibold text-foreground mb-4 mt-8 border-b pb-2">
                    <Icons.Lightbulb className="h-6 w-6 text-primary" />
                    Tips for Better Usage
                  </h2>
                  <ul className="list-none pl-0 space-y-3 text-lg text-muted-foreground leading-relaxed mb-4">
                    {tool.longDescription.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Icons.Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>{tip}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* FAQs */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section className="pt-6">
              <h2 className="flex items-center gap-2 text-3xl font-bold mb-8 text-foreground border-b pb-3">
                <Icons.HelpCircle className="h-7 w-7 text-primary" />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {tool.faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="hover:no-underline text-left text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
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

