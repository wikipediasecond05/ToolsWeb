
'use server';
/**
 * @fileOverview AI agent that suggests commit messages.
 *
 * - suggestCommitMessage - A function that suggests a commit message.
 * - SuggestCommitMessageInput - The input type for the suggestCommitMessage function.
 * - SuggestCommitMessageOutput - The return type for the suggestCommitMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCommitMessageInputSchema = z.object({
  changeDescription: z.string().describe('A description of the code changes or a code diff.'),
  commitType: z.enum(['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'revert'])
    .describe('The type of commit (e.g., feat, fix, chore).'),
});
export type SuggestCommitMessageInput = z.infer<typeof SuggestCommitMessageInputSchema>;

const SuggestCommitMessageOutputSchema = z.object({
  commitMessage: z.string().describe('The suggested commit message.'),
});
export type SuggestCommitMessageOutput = z.infer<typeof SuggestCommitMessageOutputSchema>;

export async function suggestCommitMessage(input: SuggestCommitMessageInput): Promise<SuggestCommitMessageOutput> {
  return suggestCommitMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCommitMessagePrompt',
  input: {schema: SuggestCommitMessageInputSchema},
  output: {schema: SuggestCommitMessageOutputSchema},
  prompt: `You are an expert at writing Conventional Commits.
  Based on the following description of changes and the commit type, generate a concise and informative commit message.
  The message should follow the Conventional Commits specification (e.g., <type>[optional scope]: <description>).
  Keep the subject line under 50 characters if possible, and provide a brief body if necessary, explaining the 'why' of the change.

  Commit Type: {{{commitType}}}
  Description of Changes:
  {{{changeDescription}}}

  Generate a commit message:
  `,
});

const suggestCommitMessageFlow = ai.defineFlow(
  {
    name: 'suggestCommitMessageFlow',
    inputSchema: SuggestCommitMessageInputSchema,
    outputSchema: SuggestCommitMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
