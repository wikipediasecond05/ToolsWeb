
'use server';
/**
 * @fileOverview AI agent that summarizes text.
 *
 * - summarizeText - A function that summarizes text.
 * - SummarizeTextInput - The input type for the function.
 * - SummarizeTextOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextInputSchema = z.object({
  textToSummarize: z.string().describe('The text to be summarized.'),
  summaryLength: z.enum(['short', 'medium', 'long']).describe('The desired length of the summary: "short" (1-2 sentences), "medium" (3-5 sentences), or "long" (a concise paragraph).'),
});
export type SummarizeTextInput = z.infer<typeof SummarizeTextInputSchema>;

const SummarizeTextOutputSchema = z.object({
  summary: z.string().describe('The generated summary of the text.'),
});
export type SummarizeTextOutput = z.infer<typeof SummarizeTextOutputSchema>;

export async function summarizeText(input: SummarizeTextInput): Promise<SummarizeTextOutput> {
  return summarizeTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextPrompt',
  input: {schema: SummarizeTextInputSchema},
  output: {schema: SummarizeTextOutputSchema},
  prompt: `You are an expert text summarizer.
  Read the following text and provide a summary.
  The desired summary length is: {{{summaryLength}}}.
  - If "short", provide a 1-2 sentence summary.
  - If "medium", provide a 3-5 sentence summary.
  - If "long", provide a concise paragraph (around 5-7 sentences).

  Focus on extracting the key points and main ideas.

  Text to Summarize:
  ---
  {{{textToSummarize}}}
  ---

  Generated Summary:
  `,
});

const summarizeTextFlow = ai.defineFlow(
  {
    name: 'summarizeTextFlow',
    inputSchema: SummarizeTextInputSchema,
    outputSchema: SummarizeTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
