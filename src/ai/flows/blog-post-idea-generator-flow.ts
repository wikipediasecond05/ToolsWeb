
'use server';
/**
 * @fileOverview AI agent that generates blog post ideas.
 *
 * - generateBlogPostIdeas - A function that generates blog post ideas.
 * - GenerateBlogPostIdeasInput - The input type for the function.
 * - GenerateBlogPostIdeasOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostIdeasInputSchema = z.object({
  topic: z.string().describe('The main topic or keyword for the blog posts.'),
  targetAudience: z.string().optional().describe('The intended audience for the blog posts (e.g., beginners, experts, developers).'),
});
export type GenerateBlogPostIdeasInput = z.infer<typeof GenerateBlogPostIdeasInputSchema>;

const GenerateBlogPostIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of 5-7 blog post titles or ideas.'),
});
export type GenerateBlogPostIdeasOutput = z.infer<typeof GenerateBlogPostIdeasOutputSchema>;

export async function generateBlogPostIdeas(input: GenerateBlogPostIdeasInput): Promise<GenerateBlogPostIdeasOutput> {
  return generateBlogPostIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostIdeasPrompt',
  input: {schema: GenerateBlogPostIdeasInputSchema},
  output: {schema: GenerateBlogPostIdeasOutputSchema},
  prompt: `You are an expert content strategist specializing in brainstorming blog post ideas.
  Generate a list of 5-7 engaging and relevant blog post titles or ideas based on the provided topic.
  {{#if targetAudience}}Consider that the target audience is: {{{targetAudience}}}.{{/if}}

  Topic: {{{topic}}}

  Provide creative and compelling ideas.
  `,
});

const generateBlogPostIdeasFlow = ai.defineFlow(
  {
    name: 'generateBlogPostIdeasFlow',
    inputSchema: GenerateBlogPostIdeasInputSchema,
    outputSchema: GenerateBlogPostIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
