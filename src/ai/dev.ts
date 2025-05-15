
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-related-tools.ts';
import '@/ai/flows/commit-message-writer-flow.ts';
import '@/ai/flows/blog-post-idea-generator-flow.ts';
import '@/ai/flows/text-summarizer-flow.ts';
import '@/ai/flows/image-alt-text-generator-flow.ts';
