
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
  {
    id: 'math-physics',
    name: 'Math & Physics Tools',
    description: 'Calculators and utilities for mathematical and physical computations.',
    icon: Icons.Sigma,
    iconName: 'Sigma',
    path: '/categories/math-physics',
  }
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
    description: 'Easily convert text between various cases like uppercase, lowercase, title case, sentence case, and more.',
    category: 'text-string',
    icon: Icons.CaseSensitive,
    iconName: 'CaseSensitive',
    path: '/tools/text-case-converter',
    longDescription: {
      overview: 'The Text Case Converter is a handy utility for quickly changing the capitalization of your text. It supports a variety of common case formats, making it useful for writers, developers, and anyone who needs to standardize or alter text casing for different contexts.',
      useCases: [
        'Formatting headlines or titles (Title Case, Sentence case).',
        'Standardizing data entry (UPPERCASE, lowercase).',
        'Converting text for programming variable names (camelCase, PascalCase, snake_case, kebab-case).',
        'Cleaning up text that has inconsistent capitalization.',
        'Preparing text for specific style guide requirements.'
      ],
      howItWorks: 'Paste your text into the input area. Click on the button corresponding to the desired case format (e.g., "UPPERCASE", "lowercase", "Title Case"). The tool will process the input text and display the converted text in the output area. You can then copy the result.',
      tips: [
        '"Title Case" typically capitalizes the first letter of each word, except for minor words like "a", "an", "the", "and", "but", "or", "for", "nor", unless they are the first or last word. Our implementation uses a simpler rule: capitalize the first letter of every word.',
        '"Sentence case" capitalizes only the first letter of the first word in each sentence. The tool uses basic punctuation (., !, ?) to determine sentence breaks.',
        'Programming cases (Camel, Pascal, Snake, Kebab) often rely on spaces or existing capitalization to determine word boundaries for conversion.'
      ],
    },
    faqs: [
      { question: 'What is "Title Case"?', answer: 'Title Case capitalizes the first letter of each word. Our implementation capitalizes every word for simplicity.' },
      { question: 'What is "Sentence case"?', answer: 'Sentence case capitalizes the first letter of each sentence. It identifies sentences based on common punctuation like periods, question marks, and exclamation marks.' },
      { question: 'How do camelCase, PascalCase, snake_case, and kebab-case work?', answer: 'These are common programming case styles. camelCase starts with a lowercase letter and subsequent words are capitalized (e.g., `myVariableName`). PascalCase capitalizes every word (e.g., `MyClassName`). snake_case separates words with underscores, all lowercase (e.g., `my_variable_name`). kebab-case separates words with hyphens, all lowercase (e.g., `my-css-class`).' },
      { question: 'Is my text sent to a server?', answer: 'No, all case conversions are performed client-side in your browser.' }
    ],
    keywords: ['text case', 'case converter', 'uppercase', 'lowercase', 'title case', 'sentence case', 'camelcase', 'pascalcase', 'snakecase', 'kebabcase', 'capitalization']
  },
  {
    id: 'word-counter',
    title: 'Word & Character Counter',
    description: 'Count words, characters, sentences, and paragraphs in your text with detailed statistics.',
    category: 'text-string',
    icon: Icons.Calculator,
    iconName: 'Calculator',
    path: '/tools/word-counter',
    longDescription: {
      overview: 'The Word Counter tool provides detailed statistics about your text, including the number of words, characters (with and without spaces), sentences, and paragraphs. It_s useful for writers, students, editors, and anyone needing to analyze text length and structure.',
      useCases: [
        'Checking if text meets specific length requirements (e.g., for essays, articles, tweets).',
        'Analyzing readability and complexity based on sentence and paragraph counts.',
        'Tracking writing progress.',
        'Optimizing content for SEO by monitoring word and character counts.',
        'Proofreading and editing by getting a quick overview of text structure.'
      ],
      howItWorks: 'Paste or type your text into the input area. As you type, the tool automatically updates the counts for words, characters (with and without spaces), sentences, and paragraphs. Words are typically counted based on spaces and punctuation. Characters are counted including and excluding spaces. Sentences are estimated based on common terminal punctuation (., !, ?). Paragraphs are usually identified by double line breaks.',
      tips: [
        'The accuracy of sentence and paragraph counts depends on the heuristics used. For example, abbreviations with periods might be counted as multiple sentences by a simple counter.',
        'Character counts can be important for platforms with strict limits, like Twitter or SMS messages.',
        'Use the "Characters (without spaces)" count for a more precise measure of actual textual content.'
      ],
    },
    faqs: [
      { question: 'How are words counted?', answer: 'Words are generally counted by splitting the text by spaces and common punctuation. Different tools might have slightly different rules.' },
      { question: 'How are sentences counted?', answer: 'Sentences are typically counted based on the presence of terminal punctuation like periods (.), question marks (?), and exclamation marks (!), often followed by a space or the end of the text.' },
      { question: 'How are paragraphs counted?', answer: 'Paragraphs are usually identified by one or more blank lines (double line breaks) between blocks of text.' },
      { question: 'Is my text sent to a server for counting?', answer: 'No, all counting operations are performed client-side within your browser. Your text remains private.' }
    ],
    keywords: ['word count', 'character count', 'sentence count', 'paragraph count', 'text analysis', 'statistics', 'writing tool']
  },
  {
    id: 'sentence-counter',
    title: 'Sentence Counter & Text Analyzer',
    description: 'Analyze text for sentences, syllables, words, characters, reading time, and top keywords.',
    category: 'text-string',
    icon: Icons.ListCollapse,
    iconName: 'ListCollapse',
    path: '/tools/sentence-counter',
    longDescription: {
      overview: 'The Sentence Counter & Text Analyzer provides a comprehensive breakdown of your text. It counts not only sentences but also words, characters, syllables, estimates reading time, and identifies the most frequently used keywords. This tool is ideal for writers, editors, students, and SEO specialists looking to gain deeper insights into their content.',
      useCases: [
        'Assessing content readability and complexity.',
        'Optimizing articles for specific reading levels or engagement times.',
        'Identifying key themes and topics within a text through keyword analysis.',
        'Ensuring content meets stylistic or length requirements for publications or platforms.',
        'Analyzing speeches or presentations for pacing and clarity.',
        'Educational purposes, to understand text structure and composition.'
      ],
      howItWorks: 'Paste your text into the provided area. The tool automatically analyzes it to provide: Sentence Count (based on terminal punctuation), Word Count, Character Count (total characters), Syllable Count (using a heuristic for English words), estimated Reading Time (based on an average reading speed), and a list of Top Keywords (excluding common stop words). All calculations are performed client-side.',
      tips: [
        'Syllable counts and reading time are estimations and can vary based on individual words and reader speed.',
        'Keyword analysis can help you understand if your text effectively focuses on the intended topics.',
        'For more precise SEO keyword analysis, consider specialized SEO tools, as this provides a basic frequency count.',
        'The definition of a "sentence" relies on common punctuation like periods, question marks, and exclamation marks.'
      ],
    },
    faqs: [
      { question: 'How is sentence count determined?', answer: 'Sentences are primarily identified by terminal punctuation marks such as periods (.), question marks (?), and exclamation marks (!), followed by a space or new line. Abbreviations or other uses of periods might affect accuracy.' },
      { question: 'How is syllable count estimated?', answer: 'Syllables are estimated using a common heuristic for English words. This involves counting vowel groups and applying rules for common endings (like silent "e") and letter combinations. It_s an approximation and may not be perfect for all words, especially complex or uncommon ones.' },
      { question: 'What is the basis for reading time estimation?', answer: 'Reading time is typically estimated based on an average reading speed of around 200-250 words per minute. The tool uses this average to calculate the estimated time in seconds or minutes.' },
      { question: 'How are "Top Keywords" identified?', answer: 'The text is broken into words, converted to lowercase, and common "stop words" (like "the", "is", "a") are removed. The frequency of the remaining words is then counted, and the most frequent ones are displayed.' },
      { question: 'Is this tool suitable for very long texts?', answer: 'While it can handle substantial text, extremely large inputs (many megabytes) might cause browser performance to slow down as all analysis is done client-side.'}
    ],
    keywords: ['sentence count', 'syllable counter', 'reading time', 'text analysis', 'keyword density', 'writing tool', 'content analysis', 'seo']
  },
  // Developer Tools
  {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'Format, beautify, and validate your JSON data to ensure it_s readable and error-free.',
    category: 'developer',
    icon: Icons.FileJson,
    iconName: 'FileJson',
    path: '/tools/json-formatter',
    longDescription: {
      overview: 'The JSON Formatter & Validator is an essential tool for developers working with JSON (JavaScript Object Notation). It takes raw JSON data and pretty-prints it with consistent indentation, making it easy to read and understand complex structures. Additionally, it validates the JSON against syntax rules, immediately highlighting any errors.',
      useCases: [
        'Debugging API responses by making the JSON output human-readable.',
        'Formatting JSON configuration files for clarity and maintainability.',
        'Validating user-inputted JSON or JSON received from external sources.',
        'Learning or teaching JSON structure by visualizing its formatted layout.',
        'Ensuring JSON data is syntactically correct before sending it to an API or processing it in an application.'
      ],
      howItWorks: 'Paste your JSON string into the input text area. Click the "Format & Validate" button. The tool attempts to parse the input using `JSON.parse()`. If the JSON is valid, it_s then re-formatted using `JSON.stringify(parsedData, null, 2)` which adds 2-space indentation. The beautified JSON is displayed in the output area. If the input is not valid JSON, an error message indicating the issue (often with a line or character reference) is shown.',
      tips: [
        'Always validate JSON from untrusted sources before processing it in your applications.',
        'Formatted JSON is significantly easier to navigate, especially for deeply nested objects or long arrays.',
        'The error messages from the validator can help pinpoint syntax issues like missing commas, incorrect quotes, or mismatched brackets.',
        'For extremely large JSON files, browser performance might be a consideration as processing is client-side.'
      ],
    },
    faqs: [
      { question: 'What does "valid JSON" mean?', answer: 'Valid JSON strictly adheres to its syntax rules: keys must be double-quoted strings, string values must be double-quoted, objects are enclosed in curly braces `{}`, arrays in square brackets `[]`, and elements are separated by commas. No trailing commas are allowed.' },
      { question: 'What indentation level is used for formatting?', answer: 'The tool uses a standard 2-space indentation for pretty-printing the JSON.' },
      { question: 'Is my JSON data sent to any server?', answer: 'No, all formatting and validation operations are performed client-side within your browser. Your data remains private.' },
      { question: 'Can I format minified JSON?', answer: 'Yes, as long as it_s valid JSON (even if it_s all on one line without spaces), the tool can parse and reformat it.' },
      { question: 'What happens if my JSON has comments?', answer: 'Standard JSON does not support comments. If your input contains comments (e.g., `//` or `/* */`), the validator will treat it as invalid JSON.' }
    ],
    keywords: ['json', 'formatter', 'validator', 'beautifier', 'linter', 'pretty print', 'developer tools', 'api', 'data format']
  },
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate universally unique identifiers (UUIDs / GUIDs) version 4.',
    category: 'developer',
    icon: Icons.Fingerprint,
    iconName: 'Fingerprint',
    path: '/tools/uuid-generator',
    longDescription: {
      overview: 'The UUID Generator creates Version 4 UUIDs (Universally Unique Identifiers), also known as GUIDs (Globally Unique Identifiers). These are 128-bit numbers used to uniquely identify information in computer systems without requiring a central coordinating authority. Version 4 UUIDs are generated using random or pseudo-random numbers.',
      useCases: [
        'Assigning unique primary keys to database records.',
        'Generating unique transaction IDs or session identifiers.',
        'Creating unique IDs for objects or resources in distributed systems.',
        'Labeling assets or entities where uniqueness is critical.',
        'Any scenario requiring a globally unique identifier with an extremely low probability of collision.'
      ],
      howItWorks: 'When you click the "Generate UUID" button, the tool utilizes the `crypto.randomUUID()` method provided by modern web browsers. This method generates a cryptographically strong random Version 4 UUID, conforming to RFC 4122. The generated UUID is then displayed in the output field.',
      tips: [
        'Version 4 UUIDs are the most common type and are suitable for most general-purpose unique ID needs.',
        'The probability of collision for v4 UUIDs is astronomically low, making them practically unique.',
        'UUIDs are typically represented as a 32-character hexadecimal string, often with hyphens: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.'
      ],
    },
    faqs: [
      { question: 'What version of UUID is generated by this tool?', answer: 'This tool generates Version 4 UUIDs, which are based on random numbers.' },
      { question: 'Are the generated UUIDs truly unique?', answer: 'While not mathematically guaranteed to be unique across every system in the universe for all time, the probability of two independently generated v4 UUIDs colliding is so infinitesimally small that they are considered practically unique for most applications.' },
      { question: 'How are v4 UUIDs generated?', answer: 'They are generated using random or pseudo-random numbers. The `crypto.randomUUID()` browser API leverages a cryptographically secure random number generator.' },
      { question: 'Is my generated UUID stored anywhere?', answer: 'No, the UUID is generated client-side in your browser and is not sent to or stored on any server.' },
      { question: 'Can I generate other versions of UUIDs (e.g., v1, v3, v5)?', answer: 'Currently, this tool focuses on generating v4 UUIDs, which are the most commonly used random UUIDs. Generating other versions typically requires different inputs (like MAC addresses for v1 or names/namespaces for v3/v5) and more complex logic.' }
    ],
    keywords: ['uuid', 'guid', 'generator', 'unique identifier', 'id generator', 'developer tools', 'random id']
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    description: 'Decode JSON Web Tokens (JWTs) to inspect their header and payload.',
    category: 'developer',
    icon: Icons.FileLock2,
    iconName: 'FileLock2',
    path: '/tools/jwt-decoder',
    longDescription: {
      overview: 'The JWT Decoder allows you to easily inspect the contents of a JSON Web Token (JWT). JWTs are compact, URL-safe means of representing claims to be transferred between two parties. This tool breaks down a JWT into its three constituent parts: Header, Payload, and Signature. It then Base64Url decodes the Header and Payload sections and pretty-prints the resulting JSON, allowing you to view the claims and metadata within the token. Note: This tool *only decodes* the token; it *does not validate the signature*. ',
      useCases: [
        'Debugging authentication and authorization flows in web applications.',
        'Understanding the claims (e.g., user ID, roles, expiration time) contained within a JWT.',
        'Verifying the structure and content of JWTs issued by an identity provider or your own auth server.',
        'Learning about the structure of JSON Web Tokens.',
        'Quickly inspecting tokens during development or testing phases.'
      ],
      howItWorks: 'Paste the full JWT string into the input area. Click the "Decode JWT" button. The tool first splits the JWT string by the period (`.`) character into three segments. The first segment is the Base64Url-encoded Header, and the second is the Base64Url-encoded Payload. These segments are then decoded from Base64Url to their original JSON string representations. Finally, these JSON strings are parsed and pretty-printed for display. The third segment, the Signature, is displayed as is, as it cannot be decoded without the secret or public key.',
      tips: [
        '**Security Warning:** Never paste JWTs containing sensitive production credentials or personal information into untrusted online tools. While this tool operates client-side, it_s a good general security practice.',
        'This tool does not validate the JWT_s signature. Signature validation requires the secret key (for HMAC algorithms) or the public key (for RSA/ECDSA algorithms) used to sign the token, which is not handled by this decoder.',
        'Common claims in a JWT payload include `iss` (issuer), `sub` (subject), `aud` (audience), `exp` (expiration time), `nbf` (not before time), `iat` (issued at time), and `jti` (JWT ID).',
        'The header typically contains the token type (`typ`, usually "JWT") and the signing algorithm (`alg`, e.g., "HS256", "RS256").'
      ],
    },
    faqs: [
      { question: 'What is a JSON Web Token (JWT)?', answer: 'A JWT is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.' },
      { question: 'Does this tool verify the signature of the JWT?', answer: 'No, this tool only decodes the header and payload. It does not perform signature validation. To validate the signature, you need the corresponding secret or public key.' },
      { question: 'What are the three parts of a JWT?', answer: 'A JWT consists of three parts separated by dots (.): the Header, the Payload, and the Signature. The Header and Payload are Base64Url encoded JSON objects. The Signature is used to verify the token_s authenticity.' },
      { question: 'Why is my JWT decoding to strange characters or failing?', answer: 'Ensure you are pasting the complete and unmodified JWT string. JWTs use Base64Url encoding, which is slightly different from standard Base64. The tool handles this, but corrupted or incomplete tokens will fail to decode properly.' },
      { question: 'Is my JWT data sent to a server?', answer: 'No, all decoding operations are performed client-side within your browser. Your JWT data remains private.' }
    ],
    keywords: ['jwt', 'decoder', 'json web token', 'authentication', 'token inspector', 'developer tools', 'security']
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
      howItWorks: 'Paste your CSV data into the input text area. Configure the options: specify if the first row of your CSV contains headers (column names), define the delimiter used in your CSV (e.g., comma, semicolon, tab), and choose whether to attempt automatic conversion of numbers and boolean values. The tool parses each line of the CSV, splitting it into fields based on the delimiter. If headers are used, these become the keys in the resulting JSON objects. Each subsequent row is converted into a JSON object, and these objects are collected into a JSON array. The "Convert numbers and booleans" option will try to interpret values like "123", "3.14", "true", "false" as their native types rather than strings.',
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
    description: 'Convert Markdown text to HTML and see a live preview.',
    category: 'conversion',
    icon: Icons.FileCode,
    iconName: 'FileCode',
    path: '/tools/markdown-to-html',
    longDescription: {
      overview: 'The Markdown to HTML Converter allows you to write or paste Markdown text and instantly see its HTML equivalent. It also provides a live preview of how the HTML will be rendered in a browser. This tool is perfect for web developers, content creators, and anyone needing to quickly convert Markdown for web use.',
      useCases: [
        'Writing blog posts or articles in Markdown and converting them to HTML for web publishing.',
        'Creating documentation or README files in Markdown and generating HTML versions.',
        'Quickly prototyping HTML structure using Markdown syntax.',
        'Learning how Markdown syntax translates to HTML elements.',
        'Converting user-generated Markdown content into displayable HTML in web applications.'
      ],
      howItWorks: 'Enter your Markdown text in the input area on the left. As you type or after you click the "Convert" button, the tool processes the Markdown and generates the corresponding HTML code in the output area on the right. Simultaneously, a live preview below the output area will render this HTML, showing you what the final content will look like. The conversion handles common Markdown elements like headings, paragraphs, bold and italic text, links, images, lists (ordered and unordered), blockquotes, and code blocks (inline and fenced).',
      tips: [
        'Use the live preview to check your formatting as you write.',
        'This converter uses a basic set of regular expressions for conversion. For highly complex Markdown or specific extensions (like GFM tables), a more advanced parser might be needed.',
        'The generated HTML is unstyled. You will need to apply your own CSS to make it visually appealing on your website.',
        'Remember that image paths in Markdown will be relative to where the HTML is ultimately displayed unless you use absolute URLs.',
        'For security, if you are displaying user-generated Markdown that has been converted to HTML, ensure proper sanitization to prevent XSS attacks. This tool is primarily for client-side conversion and preview.'
      ],
    },
    faqs: [
      { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language with plain-text-formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name.' },
      { question: 'Which Markdown features are supported?', answer: 'This tool supports common Markdown features: headings (#, ##, ...), bold (**text** or __text__), italic (*text* or _text_), links ([text](url)), images (![alt](url)), unordered lists (*, -, +), ordered lists (1.), blockquotes (>), inline code (`code`), and fenced code blocks (```).' },
      { question: 'Can I convert HTML back to Markdown with this tool?', answer: 'No, this tool only converts Markdown to HTML. For HTML to Markdown conversion, you would need a different utility.' },
      { question: 'Is the HTML output perfectly standard?', answer: 'The tool aims to generate standard HTML5. However, due to the simplified nature of the regex-based parser, extremely complex or malformed Markdown might not convert perfectly. Always review the output.' },
      { question: 'Does this tool send my Markdown to a server?', answer: 'No, all conversion and rendering happen client-side in your browser. Your data remains private.' }
    ],
    keywords: ['markdown', 'html', 'converter', 'text formatting', 'live preview', 'markup']
  },
  // Security Tools
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Create strong, secure, and customizable passwords instantly.',
    category: 'security',
    icon: Icons.KeyRound,
    iconName: 'KeyRound',
    path: '/tools/password-generator',
    longDescription: {
      overview: 'The Password Generator helps you create strong, random passwords tailored to your security needs. You can customize the length and include or exclude uppercase letters, lowercase letters, numbers, and symbols. Strong passwords are crucial for protecting your online accounts and sensitive information.',
      useCases: [
        'Generating unique passwords for new online accounts (email, social media, banking, etc.).',
        'Creating secure passphrases for Wi-Fi networks or encrypted files.',
        'Updating existing weak passwords to stronger ones.',
        'Providing users with a tool to generate strong passwords within an application or website.',
        'Educating users on password strength and complexity.'
      ],
      howItWorks: 'Specify the desired length for your password using the slider or input field. Then, select the character sets you want to include: uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and symbols (e.g., !@#$%^&amp;*). Click the "Generate Password" button, and the tool will create a random password based on your criteria. The generated password appears in a read-only field, and you can easily copy it to your clipboard.',
      tips: [
        'Aim for a password length of at least 12-16 characters for good security. Longer is generally better.',
        'Include a mix of character types (uppercase, lowercase, numbers, symbols) to significantly increase password strength.',
        'Avoid using easily guessable information like names, dates, or common words.',
        'Use a unique password for each important account. A password manager can help you store and manage them.',
        'Regularly update critical passwords, especially if you suspect a breach.'
      ],
    },
    faqs: [
      { question: 'How random are the generated passwords?', answer: 'The passwords are generated using cryptographically secure random number generation available in the browser (window.crypto.getRandomValues), ensuring a high degree of randomness.' },
      { question: 'Is it safe to use an online password generator?', answer: 'This tool generates passwords client-side, meaning the password is created in your browser and not sent over the internet or stored on our servers. This makes it safe to use. However, always ensure you are on the correct website (check the URL) when using any online security tool.' },
      { question: 'What is the maximum password length I can generate?', answer: 'The tool typically supports lengths up to 128 characters, which is more than sufficient for most purposes.' },
      { question: 'Which symbols are included?', answer: 'The symbols set generally includes common special characters like !@#$%^&amp;*()_+-=[]{}|;:,.<>/?~`.' },
      { question: 'Can I save the generated passwords here?', answer: 'No, this tool does not store your generated passwords. You should copy the password and store it securely, preferably in a reputable password manager.' }
    ],
    keywords: ['password generator', 'security', 'strong password', 'random password', 'secure password', 'passphrase']
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate cryptographic hashes (SHA-256, SHA-384, SHA-512) from text input.',
    category: 'security',
    icon: Icons.Hash,
    iconName: 'Hash',
    path: '/tools/hash-generator',
    longDescription: {
      overview: 'The Hash Generator tool allows you to compute cryptographic hash values for any text input using various secure algorithms like SHA-256, SHA-384, and SHA-512. Hashing is a one-way process that converts input data into a fixed-size string of characters, which is unique to that specific input. It_s widely used for data integrity verification, password storage, and digital signatures.',
      useCases: [
        'Verifying the integrity of downloaded files by comparing their computed hash with a known hash value.',
        'Creating checksums for data to detect accidental modifications.',
        'Understanding how hashing algorithms work by seeing the output for different inputs.',
        'Securely storing representations of passwords (though salting and key derivation functions are also crucial for this).',
        'Generating unique identifiers based on content.'
      ],
      howItWorks: 'Enter the text you want to hash into the input area. Select the desired hashing algorithm (SHA-256, SHA-384, or SHA-512) from the options. Click the "Generate Hash" button. The tool uses the Web Crypto API in your browser to compute the hash. The resulting hash value (in hexadecimal format) will be displayed for the selected algorithm. You can then copy this hash value to your clipboard.',
      tips: [
        'Even a small change in the input text will result in a completely different hash value.',
        'Hashing is a one-way function; you cannot reverse a hash to get the original input text.',
        'SHA-256, SHA-384, and SHA-512 are considered secure hashing algorithms. Older algorithms like MD5 and SHA-1 are no longer recommended for security-critical applications due to known vulnerabilities.',
        'The output hash is typically represented as a hexadecimal string.',
        'For password hashing in real applications, always use a strong, slow hashing algorithm combined with salting and preferably a key derivation function (KDF) like Argon2 or scrypt.'
      ],
    },
    faqs: [
      { question: 'What is a cryptographic hash function?', answer: 'A cryptographic hash function is a mathematical algorithm that maps data of arbitrary size to a bit array of a fixed size (the hash). It is a one-way function, meaning it is infeasible to invert or reverse the computation.' },
      { question: 'Why are MD5 and SHA-1 not offered?', answer: 'MD5 and SHA-1 are considered cryptographically broken and insecure for most modern applications due to collision vulnerabilities. We offer stronger, currently secure algorithms like SHA-256 and above.' },
      { question: 'How does the Web Crypto API work for hashing?', answer: 'The browser_s Web Crypto API provides `crypto.subtle.digest()`, which takes an algorithm identifier and input data (as an ArrayBuffer) and returns a Promise that resolves to the hash digest, also as an ArrayBuffer. This is then typically converted to a hex string for display.' },
      { question: 'Is my input text sent to a server?', answer: 'No, all hashing is performed client-side within your browser using the Web Crypto API. Your input text remains private.' },
      { question: 'Can I hash files with this tool?', answer: 'Currently, this tool is designed for text input. Hashing files would require file reading capabilities, which could be added as a future enhancement.' }
    ],
    keywords: ['hash generator', 'sha256', 'sha384', 'sha512', 'md5', 'sha1', 'security', 'cryptography', 'checksum']
  },
  // Productivity Tools
  {
    id: 'timestamp-converter',
    title: 'Timestamp Converter',
    description: 'Convert Unix timestamps to human-readable dates and vice-versa.',
    category: 'productivity',
    icon: Icons.Clock,
    iconName: 'Clock',
    path: '/tools/timestamp-converter',
    longDescription: {
      overview: 'The Timestamp Converter tool facilitates easy conversion between Unix timestamps (also known as Epoch time) and human-readable date and time formats. It supports both seconds and milliseconds precision for Unix timestamps and allows conversion in both directions.',
      useCases: [
        'Developers working with APIs or databases that store time as Unix timestamps.',
        'Debugging time-related issues by converting timestamps to understandable dates.',
        'Converting specific dates and times to Unix timestamps for use in scripts or applications.',
        'Understanding log files or data exports that use epoch time.',
        'Learning about how Unix time works and its representation.'
      ],
      howItWorks: 'To convert a Unix timestamp to a date: Enter the timestamp value in the "Unix Timestamp" field. Select whether it_s in "Seconds" or "Milliseconds". Click "To Date". The tool will calculate the corresponding human-readable date and time (in your local timezone) and display it. To convert a date to a Unix timestamp: Enter the date and time in the "Human-Readable Date" input (or use the date/time picker). Click "To Timestamp". The tool will convert this date to a Unix timestamp (in seconds, by default) and display it.',
      tips: [
        'Unix time is the number of seconds (or milliseconds) that have elapsed since January 1, 1970, at 00:00:00 Coordinated Universal Time (UTC).',
        'Be mindful of whether your timestamp is in seconds or milliseconds, as this is a common source of errors.',
        'The human-readable date output is typically displayed in your browser_s local timezone.',
        'When converting from a date to a timestamp, the resulting timestamp is usually UTC-based.'
      ],
    },
    faqs: [
      { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp is the total number of seconds that have elapsed since 00:00:00 UTC on January 1, 1970, not counting leap seconds. Some systems use milliseconds instead of seconds.' },
      { question: 'Are timezones handled?', answer: 'When converting from a timestamp to a human-readable date, the output is generally displayed in your local browser timezone. When converting from a date to a timestamp, the JavaScript `Date` object typically works with UTC internally for timestamp generation.' },
      { question: 'Can I input a date string manually?', answer: 'Yes, you can type a date string into the date input field. The browser will attempt to parse it. For best results, use a common format like YYYY-MM-DDTHH:mm.' },
      { question: 'Why is my converted date off by a few hours?', answer: 'This is almost always due to timezone differences. Unix timestamps are timezone-agnostic (based on UTC), while human-readable dates are often interpreted in a local timezone.' }
    ],
    keywords: ['timestamp converter', 'unix time', 'date conversion', 'epoch time', 'datetime', 'productivity']
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text (Lorem Ipsum) for your designs and mockups.',
    category: 'productivity',
    icon: Icons.ClipboardType,
    iconName: 'ClipboardType',
    path: '/tools/lorem-ipsum-generator',
    longDescription: {
      overview: 'The Lorem Ipsum Generator creates placeholder text, commonly known as "Lorem Ipsum," which is used in design mockups, wireframes, and prototypes. This text simulates real content, allowing designers and developers to focus on layout and visual appearance without being distracted by the actual meaning of the text.',
      useCases: [
        'Filling text areas in website or application mockups.',
        'Creating sample content for print layouts or presentations.',
        'Testing typography and font choices in a design.',
        'Providing placeholder content during early stages of development before real content is available.',
        'Quickly generating blocks of text of varying lengths (paragraphs, sentences, words).'
      ],
      howItWorks: 'Select the type of content you want to generate (e.g., paragraphs, sentences, or words). Enter the desired quantity (e.g., 5 paragraphs, 10 sentences). Click the "Generate" button. The tool will then produce the specified amount of Lorem Ipsum text in the output area, ready for you to copy and use.',
      tips: [
        'Lorem Ipsum is intentionally non-sensical Latin-like text to avoid distracting from the visual design.',
        'Generating by paragraphs is good for large text blocks, while sentences or words can be useful for shorter elements like captions or headings.',
        'Adjust the quantity to fit the space you need to fill in your design.'
      ],
    },
    faqs: [
      { question: 'What is Lorem Ipsum?', answer: 'Lorem Ipsum is dummy text used in the design and publishing industries. It_s derived from a passage by Cicero, but heavily altered to be nonsensical. Its purpose is to allow focus on the visual elements of a design.' },
      { question: 'Why use Lorem Ipsum instead of just repeating "text text text"?', answer: 'Lorem Ipsum has a more natural-looking distribution of letters and word lengths compared to simple repetition, making it a better visual placeholder for actual content.' },
      { question: 'Can I generate Lorem Ipsum in other languages?', answer: 'This specific tool generates standard Lorem Ipsum, which is Latin-like. Generating placeholder text in other languages would require different source texts.' },
      { question: 'Is the generated text always the same?', answer: 'The tool uses a predefined block of Lorem Ipsum text and selects portions of it based on your request. For a small number of words/sentences, it might appear repetitive, but for paragraphs, it typically shuffles sentences to create variety.' }
    ],
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text', 'text generator', 'design mockups', 'prototyping', 'content placeholder']
  },
  // Math & Physics Tools
  {
    id: 'slope-percentage-calculator',
    title: 'Slope Percentage Calculator',
    description: 'Calculate slope percentage from rise and run, or angle of inclination.',
    category: 'math-physics',
    icon: Icons.Sigma,
    iconName: 'Sigma',
    path: '/tools/slope-percentage-calculator',
    longDescription: {
      overview: 'The Slope Percentage Calculator helps you determine the steepness of a slope. You can input the vertical rise and horizontal run, or directly input the angle of inclination. The tool provides the slope as a percentage and visualizes it with a diagram.',
      useCases: [
        'Civil engineering and construction for road grades, ramps, and drainage.',
        'Landscaping and surveying to determine land inclination.',
        'Accessibility calculations for ramps (e.g., ADA compliance).',
        'Mathematics and physics education to understand slope concepts.',
        'DIY projects involving inclines or declines.'
      ],
      howItWorks: 'You can calculate the slope percentage in two ways: 1. **Using Rise and Run**: Enter the vertical rise (change in height) and the horizontal run (change in distance). The slope percentage is calculated as (Rise / Run) * 100. The angle of inclination is also derived. 2. **Using Angle of Inclination**: Enter the angle in degrees or radians. The tool converts the angle to radians if necessary, then calculates the slope as tan(angle_in_radians), and the slope percentage as tan(angle_in_radians) * 100. The "Solution" tab shows the primary result (slope percentage) and a diagram. The "Steps" tab shows the formula used.',
      tips: [
        'Ensure Rise and Run are in the same units for accurate calculations.',
        'A 100% slope corresponds to a 45-degree angle (where rise equals run).',
        'A slope of 0% is a flat, horizontal surface.',
        'Pay attention to the "deg" (degrees) or "rad" (radians) setting when inputting an angle.'
      ],
    },
    faqs: [
      { question: 'What is slope percentage?', answer: 'Slope percentage represents the ratio of vertical rise to horizontal run, multiplied by 100. It indicates how steep an incline or decline is.' },
      { question: 'How do I convert an angle in degrees to slope percentage?', answer: 'First, convert the angle from degrees to radians (angle_in_radians = angle_in_degrees * π / 180). Then, calculate tan(angle_in_radians). Finally, multiply by 100 to get the percentage.' },
      { question: 'What if my run is zero?', answer: 'If the run is zero and the rise is non-zero, the slope is technically undefined (vertical). The calculator will indicate an error or infinite slope.' },
      { question: 'Can I calculate a negative slope (decline)?', answer: 'Yes, if the "rise" is negative (representing a drop in elevation), the slope percentage will be negative, indicating a decline.' }
    ],
    keywords: ['slope calculator', 'percentage slope', 'rise over run', 'gradient', 'angle of inclination', 'math', 'engineering', 'construction']
  },
];

export const getToolById = (id: string): Tool | undefined => tools.find(tool => tool.id === id);
export const getToolsByCategory = (categoryId: string): Tool[] => tools.filter(tool => tool.category === categoryId);
export const getCategoryById = (id: string): Category | undefined => categories.find(category => category.id === id);
export const getAllTools = (): Tool[] => tools;
export const getAllCategories = (): Category[] => categories;
