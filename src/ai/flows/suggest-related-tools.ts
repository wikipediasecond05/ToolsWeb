'use server';
/**
 * @fileOverview AI agent that suggests related tools based on the tool the user is currently using.
 *
 * - suggestRelatedTools - A function that suggests related tools.
 * - SuggestRelatedToolsInput - The input type for the suggestRelatedTools function.
 * - SuggestRelatedToolsOutput - The return type for the suggestRelatedTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedToolsInputSchema = z.object({
  currentTool: z.string().describe('The name of the tool the user is currently using.'),
  allTools: z.array(z.string()).describe('A list of all available tools.'),
});
export type SuggestRelatedToolsInput = z.infer<typeof SuggestRelatedToolsInputSchema>;

const SuggestRelatedToolsOutputSchema = z.object({
  relatedTools: z
    .array(z.string())
    .describe('A list of tools related to the current tool.'),
});
export type SuggestRelatedToolsOutput = z.infer<typeof SuggestRelatedToolsOutputSchema>;

export async function suggestRelatedTools(input: SuggestRelatedToolsInput): Promise<SuggestRelatedToolsOutput> {
  return suggestRelatedToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedToolsPrompt',
  input: {schema: SuggestRelatedToolsInputSchema},
  output: {schema: SuggestRelatedToolsOutputSchema},
  prompt: `You are an expert at suggesting related tools for developers and digital professionals.

  Given the current tool the user is using, suggest other tools from the list of all tools that might be helpful to them.
  Only suggest tools that have a clear and direct relationship to the current tool. If there are no related tools, return an empty array.

  Current tool: {{{currentTool}}}
  All tools: {{#each allTools}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  `,
});

const suggestRelatedToolsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedToolsFlow',
    inputSchema: SuggestRelatedToolsInputSchema,
    outputSchema: SuggestRelatedToolsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
