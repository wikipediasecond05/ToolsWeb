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
import { Icons } from '@/components/icons';
import type { RelatedToolData } from '@/types';
import Breadcrumb from '@/components/tools/Breadcrumb';
import ShareDialog from '@/components/ui/shareDialog';
import { marked } from 'marked';

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const actualParams = React.use(params);
  const tool = getToolById(actualParams.toolId);
  const allToolsData = getAllTools();

  if (!tool) {
    notFound();
  }

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

  const currentToolForRelated = React.useMemo(() => ({
    id: tool.id,
    title: tool.title,
    path: tool.path,
    iconName: tool.iconName,
  }), [tool]);

  const allToolsForRelated = React.useMemo(() => 
  allToolsData.map(t => ({
    id: t.id,
    title: t.title,
    path: t.path,
    iconName: t.iconName,
  })), [allToolsData]);


  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <PageWrapper>
      <div className="lg:flex lg:gap-8">
        {/* Main Content Column */}
        <div className="lg:w-2/3 space-y-12">
          {/* Header */}
          <header className="mb-12">
            <div className='mb-7 text-sm'>
              <Breadcrumb toolId={tool.id} />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h1 className="flex-1 text-3xl font-bold tracking-tight">{tool.title}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{tool.description}</p>

            <div className='flex justify-start gap-4 mt-6'>
              <ShareDialog />

              <div className='flex gap-3 select-none px-3 py-1 border dark:border-gray-800 border-gray-200 items-center justify-center hover:bg-gray-100 dark:hover:bg-muted transition cursor-pointer rounded-full' onClick={()=>{
                const FAVORITES_KEY = 'NymGram_favorite_tools';

                const storedTools: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');

                if(isFavorite){
                  const updatedTools = storedTools.filter((toolId: string) => toolId !== tool.id);
                  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedTools));
                  setIsFavorite(false);
                }else{
                  storedTools.push(tool.id);
                  localStorage.setItem(FAVORITES_KEY, JSON.stringify(storedTools));
                  setIsFavorite(true);
                }
              }}>
                <Icons.Heart className="h-4 w-4 text-muted-foreground" fill={isFavorite ? 'red' : 'none'} />
                <span className='text-gray-500 dark:text-gray-400 font-semibold text-sm'>Add to Favorites</span>
              </div>
            </div>

          </header>
          
          {renderToolUI()}

          {/* Related Tools & Rating - Mobile & Tablet Only (stacks below tool UI) */}
          <div className="lg:hidden space-y-8 mt-12">
            <RelatedTools currentTool={currentToolForRelated} allTools={allToolsForRelated} />
            <EmojiRating toolId={tool.id} />
          </div>

          <CommentSection toolId={tool.id} />

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
                    <Icons.ListChecks className="h-6 w-6 text-primary" /> {/* Changed Icon */}
                    Use Cases
                  </h2>
                  <ul className="list-none pl-0 space-y-3 text-lg text-muted-foreground leading-relaxed mb-4">
                    {tool.longDescription.useCases.map((useCase, index) => (
                       <li key={index} className="flex items-start">
                        <Icons.CheckCircle className="h-4 w-4 text-primary mr-3 mt-2 flex-shrink-0" />
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(useCase) }}></div>
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
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: marked.parse(tool.longDescription.howItWorks) }}></p>
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
                        <Icons.CheckCircle className="h-4 w-4 text-primary mr-3 mt-2 flex-shrink-0" />
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(tip) }}></div>
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
              <h2 className="flex items-center gap-2 text-2xl font-bold mb-8 text-foreground border-b pb-3">
                <Icons.HelpCircle className="h-6 w-6 text-primary" />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {tool.faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} className='border rounded-md my-4 px-4 py-2' key={index}>
                    <AccordionTrigger className="hover:no-underline text-left text-lg">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
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
