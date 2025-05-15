
'use server';
/**
 * @fileOverview AI agent that generates alt text for images.
 *
 * - generateImageAltText - A function that generates alt text for an image.
 * - GenerateImageAltTextInput - The input type for the function.
 * - GenerateImageAltTextOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageAltTextInputSchema = z.object({
  imageDataUri: z.string().describe("A Base64 encoded Data URI of the image. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type GenerateImageAltTextInput = z.infer<typeof GenerateImageAltTextInputSchema>;

const GenerateImageAltTextOutputSchema = z.object({
  altText: z.string().describe('Descriptive alt text for the image.'),
});
export type GenerateImageAltTextOutput = z.infer<typeof GenerateImageAltTextOutputSchema>;

export async function generateImageAltText(input: GenerateImageAltTextInput): Promise<GenerateImageAltTextOutput> {
  return generateImageAltTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImageAltTextPrompt',
  input: {schema: GenerateImageAltTextInputSchema},
  output: {schema: GenerateImageAltTextOutputSchema},
  prompt: `Analyze the following image and generate concise, descriptive alt text for web accessibility.
  Focus on the main subject, context, and any important details. Avoid starting with "Image of" or "Picture of".

  Image:
  {{media url=imageDataUri}}

  Generated Alt Text:
  `,
});

const generateImageAltTextFlow = ai.defineFlow(
  {
    name: 'generateImageAltTextFlow',
    inputSchema: GenerateImageAltTextInputSchema,
    outputSchema: GenerateImageAltTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
