
import type { Tool, Category } from '@/types';
import { Icons } from '@/components/icons';

export const categories: Category[] = [
  {
    id: 'text-string',
    name: 'Text & String Tools',
    description: 'Manipulate and analyze text effortlessly.',
    icon: Icons.Type,
    path: '/categories/text-string',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Essential utilities for coding and development.',
    icon: Icons.Code,
    path: '/categories/developer',
  },
  {
    id: 'design-frontend',
    name: 'Design & Frontend Tools',
    description: 'Optimize and beautify your frontend assets.',
    icon: Icons.Paintbrush,
    path: '/categories/design-frontend',
  },
  {
    id: 'conversion',
    name: 'Conversion Tools',
    description: 'Convert data between various formats.',
    icon: Icons.Shuffle,
    path: '/categories/conversion',
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Generate passwords, hashes, and more.',
    icon: Icons.Lock,
    path: '/categories/security',
  },
  {
    id: 'productivity',
    name: 'Productivity Tools',
    description: 'Boost your efficiency with these utilities.',
    icon: Icons.Gauge,
    path: '/categories/productivity',
  },
];

export const tools: Tool[] = [
  // Text & String Tools
  {
    id: 'line-break-remover',
    title: 'Line Break Remover',
    description: 'Remove unwanted line breaks from your text.',
    category: 'text-string',
    icon: Icons.Eraser,
    iconName: 'Eraser',
    path: '/tools/line-break-remover',
    longDescription: {
      overview: 'This tool removes all line breaks (newlines) from a given text, merging all lines into a single line or replacing them with spaces.',
      useCases: ['Cleaning up copied text from PDFs or websites.', 'Preparing text for data processing where newlines are problematic.', 'Formatting text for specific input fields that don_t support multi-line input.'],
      howItWorks: 'The tool scans the input text for newline characters (\\n, \\r\\n, \\r) and removes them. You can choose to replace newlines with a single space to maintain word separation.',
      tips: ['Be mindful of text where line breaks are meaningful, like poetry or code.', 'Use the "replace with space" option for prose to avoid merging words.'],
    },
    faqs: [
      { question: 'What types of line breaks does it remove?', answer: 'It removes \\n (Unix/Linux), \\r\\n (Windows), and \\r (old Mac) line breaks.' },
      { question: 'Can I replace line breaks with something else?', answer: 'Currently, it supports removing or replacing with a single space. For more complex replacements, consider a regex tool.' },
    ],
    keywords: ['text', 'line break', 'newline remover', 'remove paragraph']
  },
  {
    id: 'text-case-converter',
    title: 'Text Case Converter',
    description: 'Convert text to uppercase, lowercase, title case, etc.',
    category: 'text-string',
    icon: Icons.CaseSensitive,
    iconName: 'CaseSensitive',
    path: '/tools/text-case-converter',
    keywords: ['text', 'case converter', 'uppercase', 'lowercase', 'title case']
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words and characters in your text.',
    category: 'text-string',
    icon: Icons.Calculator,
    iconName: 'Calculator',
    path: '/tools/word-counter',
    keywords: ['text', 'word count', 'character count']
  },
  // Developer Tools
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Format and validate JSON data with ease.',
    category: 'developer',
    icon: Icons.FileJson,
    iconName: 'FileJson',
    path: '/tools/json-formatter',
     longDescription: {
      overview: 'A tool to beautify and validate JSON (JavaScript Object Notation) data. It helps in making JSON readable and ensures it adheres to the correct syntax.',
      useCases: ['Debugging API responses.', 'Formatting configuration files.', 'Ensuring JSON data is valid before processing.'],
      howItWorks: 'Paste your JSON data into the input field. The tool will then parse it, format it with consistent indentation and spacing, and highlight any syntax errors if it_s invalid.',
      tips: ['Use the validation feature to catch errors early.', 'Formatted JSON is easier to read and understand, especially for nested structures.']
    },
    faqs: [
      { question: 'What does "valid JSON" mean?', answer: 'Valid JSON follows specific syntax rules, like using double quotes for keys and string values, and having correctly matched brackets and braces.'},
      { question: 'Can it handle large JSON files?', answer: 'Performance depends on the browser, but it should handle moderately sized JSON data efficiently.'}
    ],
    keywords: ['json', 'formatter', 'validator', 'developer tools', 'api']
  },
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUIDs).',
    category: 'developer',
    icon: Icons.Fingerprint,
    iconName: 'Fingerprint',
    path: '/tools/uuid-generator',
    keywords: ['uuid', 'guid', 'generator', 'unique identifier']
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    description: 'Decode JSON Web Tokens (JWTs).',
    category: 'developer',
    icon: Icons.FileLock2,
    iconName: 'FileLock2',
    path: '/tools/jwt-decoder',
    keywords: ['jwt', 'decoder', 'json web token', 'authentication']
  },
  // Design & Frontend Tools
  {
    id: 'css-minifier',
    title: 'CSS Minifier',
    description: 'Minify CSS code to reduce file size.',
    category: 'design-frontend',
    icon: Icons.Shrink,
    iconName: 'Shrink',
    path: '/tools/css-minifier',
    keywords: ['css', 'minifier', 'optimizer', 'frontend']
  },
  {
    id: 'color-picker',
    title: 'Color Picker',
    description: 'Pick colors and get their codes (HEX, RGB, HSL).',
    category: 'design-frontend',
    icon: Icons.Palette,
    iconName: 'Palette',
    path: '/tools/color-picker',
    keywords: ['color picker', 'hex code', 'rgb', 'hsl', 'design']
  },
  // Conversion Tools
  {
    id: 'csv-to-json',
    title: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON format.',
    category: 'conversion',
    icon: Icons.Replace,
    iconName: 'Replace',
    path: '/tools/csv-to-json',
    keywords: ['csv', 'json', 'converter', 'data transformation']
  },
  {
    id: 'markdown-to-html',
    title: 'Markdown to HTML Converter',
    description: 'Convert Markdown text to HTML.',
    category: 'conversion',
    icon: Icons.FileCode,
    iconName: 'FileCode',
    path: '/tools/markdown-to-html',
    keywords: ['markdown', 'html', 'converter', 'text formatting']
  },
  // Security Tools
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Create strong and secure passwords.',
    category: 'security',
    icon: Icons.KeyRound,
    iconName: 'KeyRound',
    path: '/tools/password-generator',
    keywords: ['password generator', 'security', 'strong password']
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA1, SHA256 hashes.',
    category: 'security',
    icon: Icons.Hash,
    iconName: 'Hash',
    path: '/tools/hash-generator',
    keywords: ['hash generator', 'md5', 'sha1', 'sha256', 'security']
  },
  // Productivity Tools
  {
    id: 'timestamp-converter',
    title: 'Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates.',
    category: 'productivity',
    icon: Icons.Clock,
    iconName: 'Clock',
    path: '/tools/timestamp-converter',
    keywords: ['timestamp converter', 'unix time', 'date conversion']
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your designs.',
    category: 'productivity',
    icon: Icons.ClipboardType,
    iconName: 'ClipboardType',
    path: '/tools/lorem-ipsum-generator',
    keywords: ['lorem ipsum', 'placeholder text', 'text generator']
  },
];

export const getToolById = (id: string): Tool | undefined => tools.find(tool => tool.id === id);
export const getToolsByCategory = (categoryId: string): Tool[] => tools.filter(tool => tool.category === categoryId);
export const getCategoryById = (id: string): Category | undefined => categories.find(category => category.id === id);
export const getAllTools = (): Tool[] => tools;
export const getAllCategories = (): Category[] => categories;
