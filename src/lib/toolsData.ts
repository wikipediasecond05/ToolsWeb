
import type { Tool, Category } from '@/types';
import { Icons } from '@/components/icons';

export const categories: Category[] = [
  {
    id: 'text-string',
    name: 'Text & String Tools',
    description: 'Manipulate and analyze text effortlessly.',
    icon: Icons.Type,
    iconName: 'Type',
    path: '/categories/text-string',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Essential utilities for coding and development.',
    icon: Icons.Code,
    iconName: 'Code',
    path: '/categories/developer',
  },
  {
    id: 'design-frontend',
    name: 'Design & Frontend Tools',
    description: 'Optimize and beautify your frontend assets.',
    icon: Icons.Paintbrush,
    iconName: 'Paintbrush',
    path: '/categories/design-frontend',
  },
  {
    id: 'conversion',
    name: 'Conversion Tools',
    description: 'Convert data between various formats.',
    icon: Icons.Shuffle,
    iconName: 'Shuffle',
    path: '/categories/conversion',
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Generate passwords, hashes, and more.',
    icon: Icons.Lock,
    iconName: 'Lock',
    path: '/categories/security',
  },
  {
    id: 'productivity',
    name: 'Productivity Tools',
    description: 'Boost your efficiency with these utilities.',
    icon: Icons.Gauge,
    iconName: 'Gauge',
    path: '/categories/productivity',
  },
];

export const tools: Tool[] = [
  // Text & String Tools
  {
    id: 'line-break-remover',
    title: 'Line Break Remover',
    description: 'Efficiently remove or replace line breaks and optionally clean up whitespace from your text.',
    category: 'text-string',
    icon: Icons.Eraser,
    iconName: 'Eraser',
    path: '/tools/line-break-remover',
    longDescription: {
      overview: 'The Line Break Remover is a versatile tool designed to clean and reformat text by managing line breaks (newlines) and whitespace. Whether you need to consolidate text into a single line, replace line breaks with spaces, or tidy up messy formatting, this tool provides the flexibility to do so. It also offers options to remove empty lines and trim leading/trailing spaces from each line for a thoroughly cleaned output.',
      useCases: [
        'Consolidating text copied from PDFs, emails, or websites that often contain unwanted line breaks.',
        'Preparing text data for import into spreadsheets or databases where specific line formatting is required.',
        'Formatting code snippets or log files by removing unnecessary newlines.',
        'Creating single-line strings from multi-line text for use in configuration files or scripts.',
        'Cleaning up user-generated content that might have inconsistent line breaks and spacing.',
        'Standardizing text formatting before further processing or analysis.'
      ],
      howItWorks: 'The tool processes your input text based on the selected options: First, if "Trim Leading/Trailing Spaces from Each Line" is checked, it removes whitespace from the beginning and end of every line. Next, if "Remove Empty Lines" is chosen, it eliminates any lines that become empty after trimming or were originally empty. Finally, it addresses the line breaks themselves: if you choose "Space" as a separator, all remaining line breaks are replaced with a single space. If "None" is selected, line breaks are completely removed, joining all text into a continuous string. The processed text is then displayed in the output area.',
      tips: [
        'For prose or paragraphs, using the "Space" separator is generally recommended to maintain readability and word separation.',
        'When dealing with lists or data where each item is on a new line, consider if removing line breaks entirely ("None" separator) is appropriate, or if you need a different separator for subsequent processing.',
        'The "Remove Empty Lines" option is particularly useful for cleaning up text with many blank lines between paragraphs.',
        'Use "Trim Leading/Trailing Spaces" to ensure consistency, especially if the text comes from various sources with different spacing habits.',
        'Always preview the output to ensure it meets your expectations, especially with complex text structures.'
      ],
    },
    faqs: [
      { question: 'What types of line breaks does the tool handle?', answer: 'It handles standard line break characters including \\n (LF - Unix/Linux/macOS), \\r\\n (CRLF - Windows), and \\r (CR - older Mac systems).' },
      { question: 'How does "Remove Empty Lines" work with "Trim Spaces"?', answer: 'If both are checked, lines are first trimmed. If a line becomes empty after trimming (i.e., it only contained spaces), it will then be removed by the "Remove Empty Lines" option.' },
      { question: 'Can I replace line breaks with something other than a single space or nothing?', answer: 'Currently, the tool supports replacing line breaks with a single space or removing them entirely. For custom separators, you might need a more advanced text manipulation tool or a find-and-replace utility with regex capabilities.' },
      { question: 'Is there a limit to the amount of text I can process?', answer: 'While there_s no hard limit, performance may degrade with extremely large text inputs as all processing happens in your browser. For very large files, consider a dedicated text editor or command-line tools.'},
      { question: 'Does this tool send my text to a server?', answer: 'No, all processing is done client-side within your browser. Your text is not uploaded or stored anywhere.'}
    ],
    keywords: ['text', 'line break remover', 'newline remover', 'remove paragraph breaks', 'whitespace cleaner', 'text formatting', 'join lines']
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
    description: 'Minify CSS code to reduce file size and improve load times.',
    category: 'design-frontend',
    icon: Icons.Shrink,
    iconName: 'Shrink',
    path: '/tools/css-minifier',
    longDescription: {
      overview: 'The CSS Minifier tool helps you reduce the file size of your CSS code by removing unnecessary characters without affecting its functionality. This includes comments, whitespace (spaces, tabs, newlines), and other redundant elements. Minified CSS files load faster in browsers, leading to improved website performance and a better user experience.',
      useCases: [
        'Optimizing CSS files for production websites to reduce load times.',
        'Preparing CSS for deployment where smaller file sizes are crucial.',
        'Cleaning up development CSS that may contain many comments and extra spacing.',
        'Reducing bandwidth consumption for users accessing your website.',
        'Improving scores on website performance analysis tools like Google PageSpeed Insights.'
      ],
      howItWorks: 'Paste your CSS code into the input area. The tool uses a series of regular expressions to: 1. Remove all CSS comments (/* ... */). 2. Remove unnecessary whitespace, such as multiple spaces, tabs, and line breaks between selectors and properties, or around braces and colons. 3. Condense CSS rules where possible. The resulting minified CSS is then displayed in the output area, ready to be copied and used.',
      tips: [
        'Always keep a backup of your original, unminified CSS for easier maintenance and readability.',
        'Test your website thoroughly after replacing your CSS with the minified version to ensure no visual or functional regressions have occurred.',
        'While this tool provides good minification, for complex projects or advanced optimization, consider build tools like Webpack or Parcel with plugins like `cssnano` or `csso` which can perform more sophisticated transformations.',
        'Minification is just one part of CSS optimization. Also consider techniques like code splitting, critical CSS, and using efficient selectors.'
      ],
    },
    faqs: [
      { question: 'Will minifying CSS break my website?', answer: 'Generally, no. Minification aims to remove only characters that are not needed for the CSS to function. However, poorly written or very complex CSS might occasionally have issues if the minifier is too aggressive or if there are syntax errors in the original CSS. Always test after minifying.' },
      { question: 'How much can I expect my CSS file size to reduce?', answer: 'This varies greatly depending on the original CSS. Files with many comments and a lot of whitespace will see a more significant reduction. Reductions of 10-50% are common.' },
      { question: 'Can this tool minify CSS with preprocessor syntax (like SASS or LESS)?', answer: 'No, this tool expects standard CSS. You should compile your SASS/LESS to CSS first, and then minify the resulting CSS file.' },
      { question: 'Does this tool handle CSS variables (custom properties)?', answer: 'Yes, it should preserve CSS custom properties as they are valid CSS syntax.' },
      { question: 'Is my CSS code sent to a server?', answer: 'No, all minification is performed client-side within your browser. Your code remains private.' }
    ],
    keywords: ['css', 'minifier', 'optimizer', 'frontend', 'stylesheet', 'code compression', 'reduce file size', 'website performance']
  },
  {
    id: 'color-picker',
    title: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB, and HSL formats.',
    category: 'design-frontend',
    icon: Icons.Palette,
    iconName: 'Palette',
    path: '/tools/color-picker',
    longDescription: {
      overview: 'The Color Picker & Converter tool allows designers and developers to easily select colors using a visual interface and instantly get their corresponding HEX, RGB, and HSL values. It also provides the ability to copy these values to the clipboard for use in web projects, design software, or any other application where color codes are needed.',
      useCases: [
        'Selecting colors for website design and development.',
        'Finding HEX, RGB, or HSL equivalents for a chosen color.',
        'Matching brand colors or creating color palettes.',
        'Quickly grabbing color codes for CSS, graphic design tools, or presentations.',
        'Experimenting with different color shades and variations.'
      ],
      howItWorks: 'Use the built-in color selector (often provided by your browser) to choose a color. As you select a color, the tool will automatically display its HEX (Hexadecimal), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness) representations. Each format has a "Copy" button next to it, allowing you to easily copy the desired code to your clipboard.',
      tips: [
        'HEX codes are commonly used in HTML and CSS for web development.',
        'RGB values are useful when you need to define colors with specific red, green, and blue intensities.',
        'HSL values can be more intuitive for adjusting hue, saturation, and lightness of a color.',
        'The visual color preview helps confirm you have the exact shade you want before copying the codes.'
      ],
    },
    faqs: [
      { question: 'What color formats does this tool support?', answer: 'It supports HEX (e.g., #RRGGBB), RGB (e.g., rgb(R, G, B)), and HSL (e.g., hsl(H, S%, L%)).' },
      { question: 'How do I use the color picker?', answer: 'Click on the color input field (it usually looks like a colored square). Your browser_s native color selection dialog will appear, allowing you to pick a color visually or by inputting values directly if supported.' },
      { question: 'Are the color conversions accurate?', answer: 'Yes, the conversions between HEX, RGB, and HSL are based on standard color model formulas to ensure accuracy.' },
      { question: 'Can I input a color code to see the color?', answer: 'Currently, this tool focuses on picking a color visually and then displaying its codes. For converting from a code to a visual color, you might need a different tool or adjust the color picker to match the code if your browser_s picker allows it.' },
      { question: 'Is my chosen color saved anywhere?', answer: 'No, the color selection and conversions happen in your browser. The tool does not store your color choices on any server.' }
    ],
    keywords: ['color picker', 'hex code', 'rgb converter', 'hsl converter', 'design tool', 'web color', 'css color', 'palette']
  },
  // Conversion Tools
  {
    id: 'csv-to-json',
    title: 'CSV to JSON Converter',
    description: 'Convert CSV (Comma Separated Values) data to JSON format easily.',
    category: 'conversion',
    icon: Icons.Replace,
    iconName: 'Replace',
    path: '/tools/csv-to-json',
    longDescription: {
      overview: 'The CSV to JSON Converter transforms your CSV data into a structured JSON format. This is useful for data interchange, API interactions, or when you need to work with CSV data in applications that primarily consume JSON. The tool provides options for handling headers, delimiters, and data type conversions.',
      useCases: [
        'Converting spreadsheet exports (saved as CSV) into JSON for web applications.',
        'Preparing CSV datasets for import into NoSQL databases or systems that use JSON.',
        'Transforming data for use with APIs that expect JSON input.',
        'Simplifying the process of reading and manipulating CSV data in JavaScript environments.',
        'Quickly structuring flat CSV files into a more hierarchical JSON representation.'
      ],
      howItWorks: 'Paste your CSV data into the input text area. Configure the options: specify if the first row of your CSV contains headers (column names), define the delimiter used in your CSV (e.g., comma, semicolon, tab), and choose whether to attempt automatic conversion of numbers and boolean values. The tool parses each line of the CSV, splitting it into fields based on the delimiter. If headers are used, these become the keys in the resulting JSON objects. Each subsequent row is converted into a JSON object, and these objects are collected into a JSON array. The "Convert numbers and booleans" option will try to interpret values like "123", "true", "false" as their native types rather than strings.',
      tips: [
        'Ensure your CSV data is well-formed. Inconsistent delimiters or unescaped quotes within fields can lead to parsing errors.',
        'If your CSV uses a delimiter other than a comma (e.g., semicolon, tab), make sure to specify it in the "Delimiter" option. For tab, use `\\t`.',
        'The "First row is header" option is crucial for meaningful JSON keys. If unchecked, generic keys like "column1", "column2" might be used, or the first row will be treated as data.',
        'When "Convert numbers and booleans" is enabled, values like "123", "3.14", "true", "false" will be converted. Other values remain strings. Empty fields become `null` if converting types, or empty strings otherwise.',
        'For very large CSV files, browser performance might be a limitation. Consider server-side tools or specialized libraries for huge datasets.'
      ],
    },
    faqs: [
      { question: 'What is CSV?', answer: 'CSV stands for Comma Separated Values. It_s a plain text file format used to store tabular data, where each line is a data record and each record consists of one or more fields, separated by commas (or other delimiters).' },
      { question: 'What is JSON?', answer: 'JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write and easy for machines to parse and generate. It_s commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page).' },
      { question: 'How does the tool handle commas or newlines within CSV fields?', answer: 'The parser is designed to correctly handle fields enclosed in double quotes. If a field value contains a comma, newline, or double quotes, it should be enclosed in double quotes (e.g., "value, with comma"). Double quotes within a quoted field should be escaped by doubling them (e.g., "field with ""quotes""").' },
      { question: 'What if my CSV has a different number of columns in some rows?', answer: 'The tool will attempt to parse it, but the resulting JSON objects might have missing or extra keys for those inconsistent rows, depending on the header. It_s best to ensure your CSV is consistently structured.' },
      { question: 'Is my data uploaded to a server?', answer: 'No, all CSV parsing and JSON conversion happen directly in your browser. Your data is not sent to any server, ensuring privacy.' }
    ],
    keywords: ['csv to json', 'converter', 'data transformation', 'parser', 'json array', 'csv data', 'spreadsheet to json']
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
