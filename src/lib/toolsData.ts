
import type { Tool, Category } from '@/types';
import { Icons } from '@/components/icons';

export const categories: Category[] = [
  {
    id: 'text-string',
    name: 'String Tools',
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
    name: 'Design Tools',
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
    id: 'calculator',
    name: 'Calculator Tools',
    description: 'Perform various calculations with ease.',
    icon: Icons.Calculator, 
    iconName: 'Calculator',
    path: '/categories/calculator',
  },
  {
    id: 'ai-powered',
    name: 'AI-Powered Tools',
    description: 'Leverage artificial intelligence for various tasks.',
    icon: Icons.Sparkles,
    iconName: 'Sparkles',
    path: '/categories/ai-powered',
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
      howItWorks: 'Paste your text into the input area. Select your desired options: Check "Remove Empty Lines" to eliminate blank lines. Check "Trim Leading/Trailing Spaces from Each Line" to remove whitespace from the start and end of each line. Choose a "Separator" from the dropdown: "Space" replaces line breaks with a single space, while "None" removes them completely. Click the "Remove" button to process. The cleaned text will appear in the output area.',
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
  {
    id: 'url-slug-generator',
    title: 'URL Slug Generator',
    description: 'Create SEO-friendly URL slugs from your titles or any string with various customization options.',
    category: 'text-string',
    icon: Icons.Link,
    iconName: 'Link',
    path: '/tools/url-slug-generator',
    longDescription: {
      overview: 'The URL Slug Generator helps you convert any text, such as an article title or blog post heading, into a clean, URL-friendly, and SEO-friendly slug. Slugs are the part of a URL that identifies a specific page in a human-readable way. This tool provides options to lowercase the text, choose a separator (dash or underscore), and remove special characters, stop words, or numbers.',
      useCases: [
        'Generating slugs for blog posts, articles, or product pages.',
        'Creating user-friendly and descriptive URLs for better SEO.',
        'Standardizing URL formats across a website.',
        'Converting titles with special characters or spaces into valid URL components.',
        'Shortening long titles into concise slugs while retaining keywords.'
      ],
      howItWorks: 'Enter your text (e.g., "My Awesome Blog Post Title!") into the input field. Choose your desired separator (dash "-" or underscore "_"). Select options like "Lowercase", "Remove Special Characters", "Remove Stop Words", and "Remove Numbers". The tool processes the text in real-time: it converts to lowercase (if selected), removes unwanted characters and words based on your choices, replaces spaces and multiple separators with your chosen single separator, and removes any leading/trailing separators. The resulting slug is displayed instantly and can be copied.',
      tips: [
        'Dashes (-) are generally preferred by search engines over underscores (_) as word separators in URLs.',
        'Keeping slugs concise while including main keywords can be beneficial for SEO.',
        'Always remove special characters to ensure URL validity across all browsers and systems.',
        'Removing stop words (like "a", "the", "is") can make slugs shorter without losing much meaning, but use this option judiciously.',
        'Test your generated slugs to ensure they are unique and make sense in the context of your website structure.'
      ],
    },
    faqs: [
      { question: 'What is a URL slug?', answer: 'A URL slug is the part of a URL that identifies a particular page on a website in an easy-to-read form. It’s the part of the URL that comes after the domain name and any directory paths, typically derived from the page title.' },
      { question: 'Why are dashes preferred over underscores in slugs?', answer: 'Search engines like Google have historically treated hyphens as word separators, while underscores were sometimes treated as joiners (making "word_one" look like "wordone"). Using dashes ensures words are recognized individually.' },
      { question: 'What are "stop words"?', answer: 'Stop words are common words (like "the", "is", "at", "a") that search engines often ignore. Removing them can make slugs shorter and more focused on important keywords, but it_s not always necessary or desired.' },
      { question: 'How does "Remove Special Characters" work?', answer: 'This option typically removes any character that is not a letter (a-z, A-Z), a number (0-9), or a space (which is then converted to your chosen separator). It helps create clean, universally accepted URL slugs.' },
      { question: 'Is my input text sent to a server?', answer: 'No, all slug generation is performed client-side within your browser. Your input remains private.' }
    ],
    keywords: ['url slug', 'slug generator', 'seo friendly url', 'permalink generator', 'text to slug', 'slugify', 'url optimization']
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
  {
    id: 'cronjob-expression-generator',
    title: 'Cronjob Expression Generator',
    description: 'Easily create and understand cron job expressions for scheduling tasks.',
    category: 'developer',
    icon: Icons.CalendarClock,
    iconName: 'CalendarClock',
    path: '/tools/cronjob-expression-generator',
    longDescription: {
      overview: 'The Cronjob Expression Generator helps you build and interpret cron expressions, which are used to schedule tasks to run periodically at fixed times, dates, or intervals. This tool provides input fields for each component of a cron expression (minute, hour, day of month, month, day of week) and generates both the expression and a human-readable summary of when the job will run. It also includes common presets for quick scheduling.',
      useCases: [
        'Scheduling automated backups or maintenance scripts.',
        'Setting up recurring tasks like sending out email reports or data synchronization.',
        'Automating system administration tasks.',
        'Learning the syntax of cron expressions.',
        'Generating expressions for use in crontab files or task schedulers in various applications and frameworks.'
      ],
      howItWorks: 'Input values for Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6, where 0 or 7 can be Sunday). You can use `*` for "every", numbers for specific values, comma-separated lists (e.g., `1,15,30`), ranges (e.g., `1-5`), or step values (e.g., `*/15` for every 15th unit). The tool combines these into a standard cron expression (e.g., `*/15 * * * *`). A human-readable explanation is generated (e.g., "Every 15 minutes"). You can also click on common presets to populate the fields and see the corresponding expression and explanation.',
      tips: [
        'The five fields in a standard cron expression are: Minute, Hour, Day of Month, Month, Day of Week.',
        '`*` means "any value" or "every".',
        '`*/n` means "every n-th unit". For example, `*/5` in the minute field means every 5 minutes.',
        '`1,2,3` means "at units 1, 2, and 3".',
        '`1-5` means "from unit 1 through unit 5".',
        'For Day of Week, both 0 and 7 typically represent Sunday. Some systems vary.',
        'Be careful when specifying both Day of Month and Day of Week, as it usually means the job runs if *either* condition is met, not necessarily both (behavior can vary slightly between cron implementations).'
      ],
    },
    faqs: [
      { question: 'What does `* * * * *` mean?', answer: 'This is the most common cron expression and means "run every minute of every hour of every day of every month of every day of the week".' },
      { question: 'How do I schedule a task for 2:30 AM every day?', answer: 'You would use: `30 2 * * *` (At minute 30 past hour 2 on every day-of-month on every month on every day-of-week).' },
      { question: 'Can I schedule tasks for specific years?', answer: 'Standard cron (5-field format) does not include a year field. Some extended cron versions or specific schedulers might, but this tool focuses on the common 5-field format.' },
      { question: 'What if I put `*` for Day of Month and `1` (Monday) for Day of Week?', answer: 'This generally means the job will run every Monday, regardless of the day of the month, AND every day of the month (if Day of Week was also `*`). The behavior of combining Day of Month and Day of Week can sometimes be tricky. It_s often best to use `*` in one if you_re specifying the other.' },
      { question: 'Is my cron expression validated for correctness?', answer: 'The tool provides a basic structure and helps generate the expression. Full logical validation (e.g., "February 30th") is complex and not fully implemented. The human-readable explanation should help you verify if the generated schedule matches your intent.' }
    ],
    keywords: ['cron', 'cronjob', 'scheduler', 'task scheduling', 'cron expression', 'crontab', 'developer tools', 'automation']
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
  {
    id: 'css-gradient-generator',
    title: 'CSS Gradient Generator',
    description: 'Visually create linear and radial CSS gradients and copy the generated code.',
    category: 'design-frontend',
    icon: Icons.Palette, 
    iconName: 'Palette',
    path: '/tools/css-gradient-generator',
    longDescription: {
      overview: 'The CSS Gradient Generator provides an interactive way to design beautiful linear and radial gradients for your web projects. Adjust colors, positions, angles, and types to create the perfect gradient, then copy the generated CSS directly.',
      useCases: [
        'Designing backgrounds for website sections or elements.',
        'Creating visually appealing buttons or UI components.',
        'Generating gradients for text effects (using background-clip).',
        'Experimenting with color combinations and gradient styles quickly.',
        'Learning how CSS gradients work and their syntax.'
      ],
      howItWorks: 'Choose between linear and radial gradient types. For linear gradients, set an angle. For radial gradients, define the shape and position. Add multiple color stops, specifying the color and its position (0% to 100%). The tool provides a live preview of the gradient as you make changes. Once satisfied, copy the generated CSS code (e.g., `background-image: linear-gradient(...)`).',
      tips: [
        'Use at least two color stops for a gradient.',
        'Experiment with different angles for linear gradients to achieve various effects.',
        'Radial gradients can be circular or elliptical. Adjust the position (e.g., `circle at center top`) for different looks.',
        'Smooth transitions are often achieved by having color stops closer together for sharper changes, or further apart for softer blends.',
        'Modern browsers have excellent support for CSS gradients.'
      ],
    },
    faqs: [
      { question: 'What types of gradients can I create?', answer: 'You can create linear gradients (progressing in a straight line) and radial gradients (radiating from a central point).' },
      { question: 'How many color stops can I add?', answer: 'The tool allows adding multiple color stops to create complex gradients. We recommend at least two.' },
      { question: 'Is the generated CSS cross-browser compatible?', answer: 'The tool generates standard CSS gradient syntax, which is well-supported by all modern browsers. For very old browsers, fallbacks might be needed, but the tool focuses on current standards.' },
      { question: 'Can I save my created gradients?', answer: 'Currently, the tool doesn_t have a save feature. You should copy the generated CSS for use in your projects.'}
    ],
    keywords: ['css gradient', 'gradient generator', 'linear gradient', 'radial gradient', 'web design', 'css background', 'ui design']
  },
  {
    id: 'css-box-shadow-generator',
    title: 'CSS Box Shadow Generator',
    description: 'Interactively create and customize CSS box shadows with a live preview.',
    category: 'design-frontend',
    icon: Icons.BoxSelect,
    iconName: 'BoxSelect',
    path: '/tools/css-box-shadow-generator',
    longDescription: {
      overview: 'The CSS Box Shadow Generator allows you to visually design complex box shadows for your HTML elements. Adjust offsets, blur, spread, color, and choose between outset and inset shadows, all while seeing a live preview. Copy the generated CSS for easy implementation.',
      useCases: [
        'Adding depth and dimension to UI elements like cards, buttons, and modals.',
        'Creating subtle or dramatic shadow effects for visual hierarchy.',
        'Designing modern interfaces with layered looks.',
        'Learning the `box-shadow` CSS property and its parameters.',
        'Quickly prototyping different shadow styles.'
      ],
      howItWorks: 'Use sliders and input fields to control: Horizontal Offset (how far the shadow extends to the right), Vertical Offset (how far down), Blur Radius (how much the shadow is blurred), Spread Radius (how much the shadow expands), and Shadow Color (including opacity). A checkbox allows you to toggle the `inset` property, making the shadow appear inside the element. The live preview updates instantly. The generated `box-shadow` CSS rule is displayed for copying.',
      tips: [
        'Subtle shadows often look more professional than very dark or large ones.',
        'Multiple box shadows can be layered by comma-separating them for more complex effects (this tool focuses on generating a single shadow layer).',
        'The `inset` keyword creates an inner shadow, which can be used for pressed button effects or carved-out looks.',
        'Adjusting the alpha channel of the shadow color is key to controlling its intensity and how it blends with the background.'
      ],
    },
    faqs: [
      { question: 'What do the different box-shadow parameters mean?', answer: '`offset-x`: horizontal position. `offset-y`: vertical position. `blur-radius`: higher values mean more blur. `spread-radius`: positive values expand the shadow, negative values shrink it. `color`: the shadow_s color. `inset`: changes the shadow from an outer (outset) shadow to an inner shadow.' },
      { question: 'Can I create multiple shadow layers with this tool?', answer: 'This tool is designed to help you generate a single, well-configured box-shadow rule. To create multiple layers, you would generate each shadow individually and then combine them in your CSS, separated by commas.' },
      { question: 'How do I control the shadow_s opacity?', answer: 'Use the color picker for the shadow color, which should allow you to set an alpha (opacity) value (e.g., using RGBA or HSLA). The opacity slider also directly controls this.'},
      { question: 'Does this tool work for `text-shadow` too?', answer: 'No, this tool is specifically for `box-shadow`. The `text-shadow` property has a similar syntax but applies to text characters.'}
    ],
    keywords: ['css box shadow', 'shadow generator', 'ui design', 'css effects', 'depth effect', 'web design']
  },
  {
    id: 'css-border-radius-generator',
    title: 'CSS Border Radius Generator',
    description: 'Easily generate CSS for rounded corners with individual controls for each corner.',
    category: 'design-frontend',
    icon: Icons.Square,
    iconName: 'Square',
    path: '/tools/css-border-radius-generator',
    longDescription: {
      overview: 'The CSS Border Radius Generator helps you create elements with rounded corners. You can control the radius of each corner individually (top-left, top-right, bottom-right, bottom-left) or all at once, and see a live preview of how it affects a sample element. The tool then generates the necessary `border-radius` CSS.',
      useCases: [
        'Creating rounded buttons, cards, and other UI elements.',
        'Designing organic or uniquely shaped containers.',
        'Achieving specific corner effects like a single rounded corner or pill shapes.',
        'Learning how the `border-radius` CSS property works with its shorthand and individual corner syntaxes.',
        'Quickly generating CSS for complex rounded shapes.'
      ],
      howItWorks: 'Use the input fields or sliders provided for "All Corners" or for each of the four corners: Top-Left, Top-Right, and Bottom-Right, Bottom-Left. You can also select the unit (px or %). As you adjust these values, the live preview of a sample box will update to show the effect. The tool will generate the corresponding `border-radius` CSS rule, which you can then copy.',
      tips: [
        'You can use different units like `px`, `%`, or `em` for border-radius values. The tool supports px and %.',
        'To create a circle from a square element, set the border-radius to 50%.',
        'For pill-shaped buttons, use a large radius value (e.g., `9999px`) on a rectangular element.',
        'The `border-radius` property can accept one, two, three, or four values to control all corners or specific combinations.',
      ],
    },
    faqs: [
      { question: 'What units can I use for border-radius?', answer: 'This tool allows you to use pixels (`px`) and percentages (`%`).' },
      { question: 'How do I make a perfect circle?', answer: 'For a square element, set its `border-radius` to `50%` using the "%" unit setting.' },
      { question: 'Can I set different horizontal and vertical radii for a corner (elliptical corners)?', answer: 'The standard `border-radius` property allows this by using a slash (e.g., `border-top-left-radius: 20px / 40px;`). This version of the tool focuses on a single radius value per corner for simplicity.' },
      { question: 'What is the shorthand for `border-radius`?', answer: '`border-radius: value;` (all corners), `border-radius: top-left-and-bottom-right top-right-and-bottom-left;` (two values), `border-radius: top-left top-right-and-bottom-left bottom-right;` (three values), or `border-radius: top-left top-right bottom-right bottom-left;` (four values).' }
    ],
    keywords: ['css border radius', 'rounded corners', 'css shapes', 'ui design', 'web design', 'css generator']
  },
  {
    id: 'svg-wave-generator',
    title: 'SVG Wave Generator',
    description: 'Create and customize SVG wave shapes for backgrounds or section separators.',
    category: 'design-frontend',
    icon: Icons.Waves,
    iconName: 'Waves',
    path: '/tools/svg-wave-generator',
    longDescription: {
      overview: 'The SVG Wave Generator allows you to interactively design unique SVG wave patterns. Adjust parameters like amplitude (waviness), complexity (number of crests), color, and opacity to create custom wave shapes. These generated SVGs can be used as backgrounds, section dividers, or decorative elements in your web projects. You can then download the generated SVG file or copy its code.',
      useCases: [
        'Creating visually interesting section separators on web pages.',
        'Designing unique backgrounds for hero sections or footers.',
        'Adding dynamic and fluid visual elements to websites.',
        'Generating custom SVG assets for graphic design projects.',
        'Learning about SVG path generation for wave-like shapes.'
      ],
      howItWorks: 'This tool focuses on generating sine-wave based shapes. Use the sliders to control "Amplitude" (height of the wave) and "Complexity" (number of wave cycles across the width). Pick a "Fill Color" and adjust the "Opacity". You can also "Flip" the wave vertically or horizontally. A "Randomize" button generates a new wave configuration. The live preview updates instantly. Click "Download SVG" to save the generated wave as an .svg file or copy the SVG code from the textarea.',
      tips: [
        'Start with a lower complexity (e.g., 1-3 waves) and moderate amplitude for smooth, gentle waves.',
        'Experiment with high complexity and low amplitude for subtle, textured patterns.',
        'The generated SVG is a filled shape. The wave forms the top edge, and the shape extends to the bottom of its viewbox, making it suitable for placing at the top or bottom of sections.',
        'Flipping the wave vertically can change whether the crests point up or down from its baseline.',
        'The generated SVG code can be directly embedded in your HTML or used in CSS via `url()`.',
        'Ensure the conceptual `viewBox` dimensions in the tool match how you intend to use the SVG for predictable scaling.'
      ],
    },
    faqs: [
      { question: 'What type of waves can I generate?', answer: 'Currently, this tool specializes in generating sine-wave based shapes. Support for square or triangle waves may be added in the future.' },
      { question: 'How is the "Complexity" parameter related to frequency?', answer: 'Higher "Complexity" values mean more wave cycles (higher frequency) across the width of the SVG, resulting in more crests and troughs.' },
      { question: 'Can I create multiple overlapping waves or layers?', answer: 'This tool generates a single wave shape at a time. To create layered effects, you would generate multiple SVGs and position them using CSS or an SVG editor.' },
      { question: 'Is the downloaded SVG optimized?', answer: 'The generated SVG is fairly clean. For further optimization, you could run it through an SVG minifier tool.'},
      { question: 'How does the horizontal flip work?', answer: 'The current horizontal flip simply reverses the order of the points used to draw the wave. For a symmetrical sine wave, this might not produce a visually distinct horizontal flip without further transformation logic.'}
    ],
    keywords: ['svg wave', 'wave generator', 'svg shape', 'css background', 'section separator', 'web design', 'vector graphics']
  },
  {
    id: 'svg-blob-generator',
    title: 'SVG Blob Generator',
    description: 'Create unique, organic SVG blob shapes for your designs.',
    category: 'design-frontend',
    icon: Icons.Shapes,
    iconName: 'Shapes',
    path: '/tools/svg-blob-generator',
    longDescription: {
      overview: 'The SVG Blob Generator allows you to interactively design smooth, organic, blob-like shapes. Adjust parameters like complexity (number of anchor points) and "edges" (irregularity/organic-ness) to create unique vector graphics. These blobs can be used as decorative backgrounds, abstract design elements, or even as part of illustrations.',
      useCases: [
        'Creating abstract backgrounds for websites or presentations.',
        'Designing unique hero section shapes or section dividers.',
        'Generating organic elements for logos or icons.',
        'Adding a playful and modern touch to UI designs.',
        'Learning about SVG path generation for curved and irregular shapes.'
      ],
      howItWorks: 'Use the "Complexity" slider to set the number of anchor points that define the blob_s general form (more points can lead to more "lobes"). The "Edges" slider controls how much each point_s radius can deviate from a perfect circle, making the blob more or less irregular/organic. Pick a "Fill Color". A "Randomize" button will generate new settings for a fresh blob. The live preview updates instantly. You can copy the full SVG code or download the blob as an .svg file.',
      tips: [
        'Low complexity (e.g., 3-5 points) with moderate edge variation often yields pleasing, simple blobs.',
        'Higher complexity can create more intricate, "lumpy" shapes.',
        'Setting "Edges" to 0 will result in a shape closer to a regular polygon (with smoothed corners). Setting it high will make the blob more unpredictable and "wobbly".',
        'The "Randomize" button is great for quickly exploring different blob possibilities.',
        'SVG blobs are vector graphics, so they scale perfectly without losing quality.'
      ],
    },
    faqs: [
      { question: 'How is the "blob" shape generated?', answer: 'It_s created by first calculating a set of anchor points around a central origin. Each point_s distance from the center (radius) is randomized based on the "Edges" setting. These anchor points are then connected using smooth cubic Bezier curves to create the organic, flowing outline.' },
      { question: 'Can I control the exact position of each point?', answer: 'This tool focuses on generative creation through parameters. For fine-grained manual control over each point and curve, you would typically use a vector graphics editor like Inkscape or Adobe Illustrator.' },
      { question: 'Are the blobs always filled shapes?', answer: 'Yes, this generator creates filled SVG paths. You can modify the SVG code later if you need only an outline (stroke) or want to apply other SVG effects.'},
      { question: 'What does the "seed" do?', answer: 'The seed is an internal random number used in the generation process. Changing the seed (which the "Randomize" button does) results in a different blob shape even if other parameters are the same.'}
    ],
    keywords: ['svg blob', 'blob generator', 'organic shape', 'svg graphics', 'web design', 'generative art', 'vector shape']
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
  {
    id: 'rgb-to-hex-converter',
    title: 'RGB to HEX Converter',
    description: 'Convert RGB color values (e.g., rgb(255, 165, 0)) to their HEX code equivalent (e.g., #FFA500).',
    category: 'conversion',
    icon: Icons.Palette, 
    iconName: 'Palette',
    path: '/tools/rgb-to-hex-converter',
    longDescription: {
      overview: 'This tool allows you to easily convert color values from the RGB (Red, Green, Blue) format to its corresponding hexadecimal (HEX) code. This is essential for web designers, developers, and anyone working with digital colors who needs to switch between these common color representations.',
      useCases: [
        'Translating RGB values from design software to CSS-compatible HEX codes.',
        'Ensuring color consistency across different platforms or tools that might use varying formats.',
        'Quickly finding the HEX equivalent of an RGB color for use in HTML, CSS, or graphic design applications.',
        'Learning how RGB and HEX color codes relate to each other.'
      ],
      howItWorks: 'Enter the Red, Green, and Blue values (each from 0 to 255) into their respective input fields. The tool will automatically calculate and display the hexadecimal representation (e.g., #RRGGBB). A preview of the color will also be displayed.',
      tips: [
        'Each RGB component (Red, Green, Blue) must be a number between 0 and 255.',
        'The HEX code consists of a # symbol followed by six hexadecimal digits (0-9 and A-F). The first two digits represent Red, the next two Green, and the last two Blue.',
        'For example, rgb(255, 0, 0) is pure red, which converts to #FF0000.'
      ],
    },
    faqs: [
      { question: 'What is RGB?', answer: 'RGB is an additive color model in which red, green, and blue light are added together in various ways to reproduce a broad array of colors. Each component can range from 0 to 255.' },
      { question: 'What is HEX color code?', answer: 'A HEX color code is a hexadecimal way to represent a color in RGB format by combining three values: the amounts of red, green, and blue. It_s commonly used in HTML and CSS.' },
      { question: 'Can I input RGB values with alpha (RGBA)?', answer: 'This tool focuses on converting standard RGB to HEX. For RGBA to HEXA (HEX with alpha), you would need a different conversion.' }
    ],
    keywords: ['rgb to hex', 'color converter', 'web colors', 'css colors', 'hex code', 'rgb values', 'design tool']
  },
  {
    id: 'hex-to-rgb-converter',
    title: 'HEX to RGB Converter',
    description: 'Convert HEX color codes (e.g., #FFA500) to their RGB value equivalent (e.g., rgb(255, 165, 0)).',
    category: 'conversion',
    icon: Icons.Palette, 
    iconName: 'Palette',
    path: '/tools/hex-to-rgb-converter',
    longDescription: {
      overview: 'This tool allows you to easily convert hexadecimal (HEX) color codes into their corresponding RGB (Red, Green, Blue) values. This is useful for web designers, developers, and anyone needing to translate colors between these standard formats.',
      useCases: [
        'Converting HEX codes from CSS or design mockups to RGB values for use in programming or other design tools.',
        'Understanding the specific red, green, and blue components of a HEX color.',
        'Quickly translating colors for different digital media requirements.',
        'Learning the relationship between HEX and RGB color representations.'
      ],
      howItWorks: 'Enter a 3-digit (e.g., #F00) or 6-digit (e.g., #FF0000) hexadecimal color code into the input field (the # symbol is optional). The tool automatically parses the HEX code, extracts the red, green, and blue components, and converts them to their decimal (0-255) equivalents. The resulting RGB values (e.g., rgb(255, 0, 0)) are displayed, along with a visual preview of the color.',
      tips: [
        'HEX codes can be 3 digits (e.g., #ABC expands to #AABBCC) or 6 digits (e.g., #RRGGBB). Both are accepted.',
        'The # symbol at the beginning of the HEX code is optional for input.',
        'Each pair of hexadecimal digits (or single digit in the 3-digit format) corresponds to one of the color components (Red, Green, Blue).'
      ],
    },
    faqs: [
      { question: 'How does a 3-digit HEX code work?', answer: 'A 3-digit HEX code like #RGB is a shorthand where each digit is duplicated. For example, #F0A becomes #FF00AA.' },
      { question: 'What if I enter an invalid HEX code?', answer: 'The tool will attempt to parse valid HEX characters (0-9, A-F). If the input is not a valid 3 or 6-digit HEX code, it will likely result in an error or an incorrect color display.' },
      { question: 'Can this tool handle HEX codes with alpha (HEXA)?', answer: 'This tool focuses on standard 3 or 6-digit HEX codes for opaque colors. For HEX codes with an alpha channel (e.g., #RRGGBBAA), you would need a tool that specifically supports RGBA conversion.' }
    ],
    keywords: ['hex to rgb', 'color converter', 'web colors', 'css colors', 'rgb values', 'hex code', 'design tool']
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
    keywords: ['hash generator', 'sha256', 'sha384', 'sha512', 'security', 'cryptography', 'checksum']
  },
  {
    id: 'md5-hash-generator',
    title: 'MD5 Hash Generator',
    description: 'Generate MD5 hashes from text input. Note: MD5 is not secure for cryptographic purposes.',
    category: 'security',
    icon: Icons.Hash,
    iconName: 'Hash',
    path: '/tools/md5-hash-generator',
    longDescription: {
      overview: 'The MD5 Hash Generator computes the MD5 hash for any given text input. MD5 is an older hashing algorithm that produces a 128-bit (16-byte) hash value, typically expressed as a 32-digit hexadecimal number. While widely used in the past, MD5 is no longer considered secure for cryptographic applications like password storage or digital signatures due to known vulnerabilities.',
      useCases: [
        'Verifying file integrity (checksums) where strong collision resistance is not critical.',
        'Use in legacy systems that specifically require MD5.',
        'Educational purposes to understand how MD5 works.',
        'Generating unique identifiers for non-security-critical data.',
      ],
      howItWorks: 'Enter the text you want to hash into the input area. Click the "Generate MD5 Hash" button. The tool uses a client-side JavaScript implementation of the MD5 algorithm to compute the hash. The resulting MD5 hash value (as a 32-character hexadecimal string) will be displayed. You can then copy this hash value to your clipboard.',
      tips: [
        'MD5 is fast but has known collision vulnerabilities, meaning different inputs can produce the same hash.',
        'For security-sensitive applications, use stronger hashing algorithms like SHA-256 or above.',
        'Even a minor change in the input text will result in a significantly different MD5 hash.',
      ],
    },
    faqs: [
      { question: 'Is MD5 secure?', answer: 'No, MD5 is not considered secure for cryptographic purposes such as password hashing or ensuring data authenticity against malicious attacks. It has known collision vulnerabilities. However, it can still be used for non-cryptographic checksums to detect accidental data corruption.' },
      { question: 'What is an MD5 hash used for today?', answer: 'It_s sometimes used for file integrity checks (checksums) in non-security-critical contexts, in some legacy systems, or for educational purposes to demonstrate hashing concepts. For new security applications, stronger algorithms like SHA-256 are recommended.' },
      { question: 'Why isn_t MD5 available in the Web Crypto API?', answer: 'Modern browser APIs like Web Crypto focus on providing secure cryptographic primitives. Due to MD5_s known vulnerabilities, it is generally excluded from these standard APIs to discourage its use in new security-sensitive applications.' },
      { question: 'Is my input text sent to a server?', answer: 'No, all MD5 hashing with this tool is performed client-side within your browser. Your input text remains private.' }
    ],
    keywords: ['md5 hash', 'md5 generator', 'hash', 'checksum', 'security', 'cryptography', 'legacy hash']
  },
  {
    id: 'base64-encoder-decoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode text strings to Base64 or decode Base64 strings back to their original text.',
    category: 'security',
    icon: Icons.Binary,
    iconName: 'Binary',
    path: '/tools/base64-encoder-decoder',
    longDescription: {
      overview: 'The Base64 Encoder/Decoder tool allows you to convert text to Base64 encoding and decode Base64 strings back to plain text. Base64 is a common encoding scheme used to represent binary data in an ASCII string format, often used in data transmission or storage where binary data is not well-supported.',
      useCases: [
        'Encoding data for use in URLs, HTML, or CSS where certain characters might be problematic.',
        'Decoding Base64 strings found in API responses, configuration files, or email attachments.',
        'Obfuscating simple text (though Base64 is not encryption and is easily reversible).',
        'Transmitting binary data (like images) as text in JSON or XML payloads.'
      ],
      howItWorks: 'For encoding, enter your plain text into the input area and click "Encode to Base64". The tool uses the browser_s `btoa()` function (after UTF-8 encoding the input). For decoding, paste a Base64 string into the input area and click "Decode from Base64". The tool uses `atob()` (and then UTF-8 decodes the result). The result appears in the output area. Clear and Copy buttons are provided.',
      tips: [
        'Base64 is an encoding scheme, not an encryption method. It does not provide security for sensitive data.',
        'Ensure the input for decoding is a valid Base64 string. Invalid characters will cause decoding errors.',
        'This tool handles UTF-8 characters for encoding and decoding, making it suitable for a wide range of text inputs.'
      ],
    },
    faqs: [
      { question: 'What is Base64 encoding?', answer: 'Base64 is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation.' },
      { question: 'Is Base64 secure for passwords?', answer: 'No, Base64 is easily reversible and should never be used for storing or transmitting sensitive information like passwords securely. Use proper hashing and encryption for security.' },
      { question: 'Why does `atob()` sometimes throw an error?', answer: 'The `atob()` function will throw an error if the input string is not a valid Base64 encoded string (e.g., contains characters not in the Base64 alphabet or has incorrect padding). Our tool attempts to handle common UTF-8 scenarios, but malformed Base64 will still fail.' }
    ],
    keywords: ['base64', 'encoder', 'decoder', 'text encoding', 'ascii', 'binary to text', 'security utilities']
  },
  {
    id: 'url-encoder-decoder',
    title: 'URL Encoder/Decoder',
    description: 'Encode text for safe inclusion in URLs (percent-encoding) or decode percent-encoded URLs.',
    category: 'security',
    icon: Icons.Link, 
    iconName: 'Link', 
    path: '/tools/url-encoder-decoder',
    longDescription: {
      overview: 'The URL Encoder/Decoder tool helps you convert strings into a format suitable for use in URLs (percent-encoding) and decode such URLs back into their original form. This is essential because URLs can only contain a limited set of characters; special characters need to be encoded.',
      useCases: [
        'Encoding query parameters for URLs to ensure special characters (like spaces, &, ?, =) are handled correctly.',
        'Decoding URLs to understand the original parameters or path segments.',
        'Preparing text to be part of a URL path segment.',
        'Working with web APIs that require URL-encoded data.'
      ],
      howItWorks: 'For encoding, enter your text into the input area and click "Encode URL". The tool uses `encodeURIComponent()`, which encodes all characters except for A-Z a-z 0-9 - _ . ! ~ * \' ( ). For decoding, paste a percent-encoded URL or string segment and click "Decode URL". The tool uses `decodeURIComponent()`. The result appears in the output area.',
      tips: [
        '`encodeURIComponent()` is generally preferred for encoding query string parameters as it encodes more characters than `encodeURI()`.',
        'Percent-encoding replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits corresponding to the character_s ASCII value.',
        'Spaces are typically encoded as `%20` or sometimes `+` (though `encodeURIComponent` uses `%20`).'
      ],
    },
    faqs: [
      { question: 'What is URL encoding (percent-encoding)?', answer: 'URL encoding, also known as percent-encoding, is a mechanism for encoding information in a Uniform Resource Identifier (URI) under certain circumstances. It involves replacing reserved or non-ASCII characters with a % symbol followed by two hexadecimal digits that represent the character_s ASCII code.' },
      { question: 'When should I use `encodeURIComponent()` vs `encodeURI()`?', answer: '`encodeURI()` is intended for encoding a full URI and does not encode characters like :, /, #, ?, &. `encodeURIComponent()` is for encoding URI components (like query parameters or path segments) and encodes more characters, making it generally safer for individual parts of a URL.' },
      { question: 'What happens if I try to decode a non-URL-encoded string?', answer: '`decodeURIComponent()` will generally return the string as is if there are no %-encoded sequences. If it encounters invalid % sequences, it might throw an error.' }
    ],
    keywords: ['url encoder', 'url decoder', 'percent encoding', 'uri component', 'web development', 'query string']
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
      howItWorks: 'To convert a Unix timestamp to a date: Enter the timestamp value in the "Unix Timestamp" field. Select whether it_s in "Seconds" or "Milliseconds". Click "Convert to Date". The tool will calculate the corresponding human-readable date and time (in your local timezone) and display it. To convert a date to a Unix timestamp: Enter the date and time in the "Human-Readable Date" input (or use the date/time picker). Click "Convert to Timestamp". The tool will convert this date to a Unix timestamp (in seconds, by default) and display it.',
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
  {
    id: 'playback-speed-calculator',
    title: 'Playback Speed Calculator',
    description: 'Calculate new video/audio duration based on playback speed and see time saved.',
    category: 'productivity',
    icon: Icons.Timer,
    iconName: 'Timer',
    path: '/tools/playback-speed-calculator',
    longDescription: {
      overview: 'The Playback Speed Calculator helps you determine the actual time it will take to watch a video or listen to audio content at different playback speeds. It also shows you how much time you will save (or lose) compared to watching at normal (1x) speed.',
      useCases: [
        'Estimating how long a lecture or tutorial will take at 1.5x or 2x speed.',
        'Planning study sessions or content consumption time more effectively.',
        'Calculating time saved when listening to podcasts or audiobooks at faster speeds.',
        'Understanding the impact of slower speeds (e.g., 0.5x) for detailed analysis or transcription.',
        'Comparing time differences between various playback speed options.'
      ],
      howItWorks: 'Enter the original duration of the content in hours, minutes, and seconds. Then, input the desired playback speed (e.g., 1.5 for 1.5x, 2 for 2x). You can also use the preset speed buttons. The tool calculates the total original duration in seconds, divides it by the playback speed to get the new duration in seconds, and then converts this new duration back into hours, minutes, and seconds. The time saved is the difference between the original and new durations.',
      tips: [
        'Ensure your input for hours, minutes, and seconds are positive numbers. Minutes and seconds should ideally be less than 60 for standard input, but the tool will normalize it.',
        'Playback speed must be a positive number. A speed of 1 means normal speed, less than 1 is slower, and greater than 1 is faster.',
        'The "time saved" can be negative if you choose a playback speed less than 1x, indicating it will take longer.',
        'Use the preset buttons for common speeds, or type a custom speed directly.'
      ],
    },
    faqs: [
      { question: 'What if I only have minutes and seconds for the original duration?', answer: 'Simply leave the "hours" field as 0 or empty.' },
      { question: 'Can I input a playback speed like 1.25x?', answer: 'Yes, the custom speed input accepts decimal values.' },
      { question: 'How is "time saved" calculated?', answer: 'Time saved is the original duration minus the new estimated duration. If the new duration is longer (speed < 1x), the "time saved" will be negative, meaning additional time spent.' },
      { question: 'Does this work for any video or audio platform?', answer: 'This calculator works for any media as long as you know its original length and the playback speed you intend to use. It_s independent of the platform (YouTube, Netflix, podcasts, etc.).' }
    ],
    keywords: ['playback speed', 'video duration', 'audio duration', 'time calculator', 'speed watching', 'podcast speed', 'time saver']
  },
  {
    id: 'audiobook-speed-calculator',
    title: 'Audiobook Speed Calculator',
    description: 'Calculate new audiobook listening time based on playback speed and see time saved.',
    category: 'productivity',
    icon: Icons.BookText,
    iconName: 'BookText',
    path: '/tools/audiobook-speed-calculator',
    longDescription: {
      overview: 'The Audiobook Speed Calculator helps you estimate how long it will take to listen to an audiobook at different playback speeds. It also calculates the total time you can save by listening at a faster pace, or the extra time it might take if you slow it down.',
      useCases: [
        'Planning how quickly you can finish an audiobook based on your preferred listening speed.',
        'Fitting audiobooks into your schedule by understanding the adjusted listening time.',
        'Comparing listening times for different speeds (e.g., 1.25x vs. 1.5x).',
        'Motivating yourself by seeing how much time you can save by slightly increasing listening speed.',
        'Calculating time needed for slower speeds if you are taking notes or learning from the audiobook.'
      ],
      howItWorks: 'Input the original length of the audiobook in hours, minutes, and seconds. Then, enter your desired playback speed (e.g., 1.0 for normal speed, 1.5 for 50% faster, 0.75 for 25% slower). The calculator will display the new total listening time and the amount of time saved (or added if speed < 1x). You can use preset speed buttons or enter a custom speed.',
      tips: [
        'Many audiobook apps offer playback speeds from 0.5x up to 3x or more.',
        'Start with small speed increments (e.g., 1.1x or 1.2x) and gradually increase as you get comfortable.',
        'Complex material or dense narration might be harder to comprehend at very high speeds.',
        'The "Time Saved" feature is great for seeing the cumulative benefit of listening at faster speeds over multiple audiobooks.'
      ],
    },
    faqs: [
      { question: 'How accurate is the listening time calculation?', answer: 'The calculation is mathematically precise based on the inputs. The actual comprehension and enjoyment can vary per individual at different speeds.' },
      { question: 'Can I use decimal speeds like 1.3x?', answer: 'Yes, the custom speed input allows for decimal values.' },
      { question: 'What does "Time Saved" mean if it_s negative?', answer: 'A negative "Time Saved" indicates that the new listening time is longer than the original, which happens if you choose a playback speed less than 1x (slower than normal).' },
      { question: 'Does the calculator account for pauses or breaks I take?', answer: 'No, it calculates the continuous listening time based on the audiobook_s original length and the selected speed.' }
    ],
    keywords: ['audiobook speed', 'listening time', 'playback calculator', 'time saved', 'productivity', 'reading speed', 'audio content']
  },
   {
    id: 'sleep-cycle-calculator',
    title: 'Sleep Cycle Calculator',
    description: 'Calculate optimal wake-up or bedtimes based on natural sleep cycles.',
    category: 'productivity',
    icon: Icons.Bed,
    iconName: 'Bed',
    path: '/tools/sleep-cycle-calculator',
    longDescription: {
      overview: 'The Sleep Cycle Calculator helps you determine the best times to wake up or go to bed to feel refreshed. By aligning your sleep with natural 90-minute sleep cycles, you can avoid waking up groggy from deep sleep. Input when you plan to go to bed (or want to wake up) and how long it typically takes you to fall asleep, and the calculator will suggest several optimal times.',
      useCases: [
        'Planning your bedtime to wake up feeling more rested for work or school.',
        'Determining the best time to go to sleep if you have a fixed wake-up time.',
        'Optimizing sleep schedules for better energy levels throughout the day.',
        'Understanding how sleep cycles work and their impact on wakefulness.',
        'Finding the ideal number of sleep cycles for your personal needs (typically 5-6 cycles for adults).',
        'Adjusting sleep times when traveling or dealing with schedule changes.'
      ],
      howItWorks: 'Choose your calculation mode: "I plan to sleep at..." or "I want to wake up at...". If sleeping at a certain time, enter your planned bedtime and the estimated time it takes you to fall asleep. The tool will calculate several potential wake-up times based on completing full 90-minute sleep cycles. If waking up at a certain time, enter your desired wake-up time and fall asleep duration. The tool will suggest optimal bedtimes. Results for 5 or 6 sleep cycles (7.5 to 9 hours of sleep) are often highlighted as recommended for adults.',
      tips: [
        'Most adults need 7-9 hours of sleep, which corresponds to 5-6 full sleep cycles.',
        'The average sleep cycle is 90 minutes, but this can vary slightly from person to person.',
        'Experiment with the suggested times to find what works best for your body.',
        'Consistency in your sleep schedule, even on weekends, can significantly improve sleep quality.',
        'Factors like caffeine, alcohol, stress, and screen time before bed can affect how quickly you fall asleep and the quality of your sleep cycles.'
      ],
    },
    faqs: [
      { question: 'What is a sleep cycle?', answer: 'A sleep cycle consists of several stages of sleep, including light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. Each full cycle typically lasts about 90 minutes.' },
      { question: 'Why is it better to wake up at the end of a sleep cycle?', answer: 'Waking up at the end of a cycle, when you are in a lighter stage of sleep, generally makes you feel more refreshed and less groggy than if you wake up abruptly during deep sleep or REM sleep.' },
      { question: 'How accurate is the 90-minute cycle assumption?', answer: 'While 90 minutes is a good average, individual sleep cycles can range from 70 to 120 minutes. This calculator uses the 90-minute average as a guideline.' },
      { question: 'What if I don_t know how long it takes me to fall asleep?', answer: 'The average time is 10-20 minutes. You can start with 15 minutes and adjust based on your experience. If you fall asleep very quickly or take much longer, update the slider accordingly.' },
      { question: 'Does this calculator consider REM sleep specifically?', answer: 'While it_s called "Calculate REM Sleep Cycles" in some contexts, it more broadly calculates based on full 90-minute sleep cycles, which include REM stages. The goal is to complete full cycles.'}
    ],
    keywords: ['sleep calculator', 'sleep cycle', 'wake up time', 'bedtime calculator', 'rem sleep', 'sleep schedule', 'productivity', 'health']
  },
  // Calculator Tools
  {
    id: 'slope-percentage-calculator',
    title: 'Slope Percentage Calculator',
    description: 'Calculate slope percentage from rise and run, or angle of inclination.',
    category: 'calculator', 
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
    keywords: ['slope calculator', 'percentage slope', 'rise over run', 'gradient', 'angle of inclination', 'math', 'engineering', 'construction', 'calculator']
  },
  {
    id: 'temperature-converter',
    title: 'Temperature Converter',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin scales.',
    category: 'calculator',
    icon: Icons.Thermometer,
    iconName: 'Thermometer',
    path: '/tools/temperature-converter',
    longDescription: {
      overview: 'The Temperature Converter allows for quick and easy conversion between the three most common temperature scales: Celsius (°C), Fahrenheit (°F), and Kelvin (K). Input a temperature in one scale, and the tool will instantly display its equivalent in the other two scales.',
      useCases: [
        'Converting weather forecasts from one unit to another (e.g., Fahrenheit to Celsius).',
        'Scientific calculations where temperature needs to be in Kelvin.',
        'Cooking and baking, for converting recipe temperatures.',
        'Understanding temperature references in international contexts or historical texts.'
      ],
      howItWorks: 'Enter a temperature value into any of the input fields (Celsius, Fahrenheit, or Kelvin). As you type, the other fields will automatically update with the converted values based on standard conversion formulas. For example, if you type "0" in Celsius, Fahrenheit will show "32" and Kelvin will show "273.15".',
      tips: [
        'Celsius is commonly used in most parts of the world and in science.',
        'Fahrenheit is primarily used in the United States.',
        'Kelvin is the base unit of thermodynamic temperature in the International System of Units (SI) and is often used in scientific contexts.'
      ],
    },
    faqs: [
      { question: 'What are the formulas for conversion?', answer: 'C to F: (C * 9/5) + 32. F to C: (F - 32) * 5/9. C to K: C + 273.15. K to C: K - 273.15. F to K: (F - 32) * 5/9 + 273.15. K to F: (K - 273.15) * 9/5 + 32.' },
      { question: 'What is absolute zero?', answer: 'Absolute zero is 0 K, which is -273.15 °C or -459.67 °F. It_s the lowest possible temperature where nothing could be colder.' }
    ],
    keywords: ['temperature converter', 'celsius to fahrenheit', 'fahrenheit to celsius', 'kelvin converter', 'temp conversion', 'weather', 'science', 'calculator']
  },
  {
    id: 'length-converter',
    title: 'Length Converter',
    description: 'Convert lengths and distances between various units like meters, kilometers, feet, miles, and inches.',
    category: 'calculator',
    icon: Icons.Ruler,
    iconName: 'Ruler',
    path: '/tools/length-converter',
    longDescription: {
      overview: 'The Length Converter enables easy conversion of measurements between different units of length, including metric (meters, kilometers) and imperial/US customary units (feet, miles, inches). Input a value in one unit and select the "from" and "to" units to see the conversion.',
      useCases: [
        'Converting distances for travel planning (e.g., kilometers to miles).',
        'DIY projects requiring measurements in different units.',
        'Understanding specifications or plans that use varying length units.',
        'Educational purposes for learning about different measurement systems.'
      ],
      howItWorks: 'Enter the value you wish to convert in the "Value" input field. Select the unit you are converting "From" using the first dropdown. Select the unit you want to convert "To" using the second dropdown. The converted value will be displayed automatically. The tool uses standard conversion factors to perform the calculations.',
      tips: [
        'Common conversions: 1 inch = 2.54 cm, 1 foot = 12 inches, 1 mile = 5280 feet, 1 kilometer = 1000 meters.',
        'Ensure you select the correct "From" and "To" units for an accurate conversion.',
        'The tool typically uses a base unit (like meters) internally for all calculations to maintain precision.'
      ],
    },
    faqs: [
      { question: 'What units can I convert between?', answer: 'The tool typically supports meters (m), kilometers (km), feet (ft), miles (mi), and inches (in). More units could be added.' },
      { question: 'How accurate are the conversions?', answer: 'Conversions are based on standard, internationally recognized conversion factors, ensuring high accuracy.' }
    ],
    keywords: ['length converter', 'distance converter', 'metric to imperial', 'imperial to metric', 'meters to feet', 'miles to kilometers', 'unit conversion', 'calculator']
  },
  // AI Powered Tools
  {
    id: 'ai-commit-message-writer',
    title: 'AI Commit Message Writer',
    description: 'Generate conventional commit messages using AI based on your code changes or description.',
    category: 'ai-powered',
    icon: Icons.GitCommit,
    iconName: 'GitCommit',
    path: '/tools/ai-commit-message-writer',
    longDescription: {
      overview: 'The AI Commit Message Writer helps you craft well-formatted and descriptive commit messages. Provide a description of your changes or a code diff, select a commit type (feat, fix, chore, etc.), and let AI suggest a suitable commit message following conventional standards.',
      useCases: [
        'Speeding up the process of writing commit messages.',
        'Ensuring consistency in commit message formatting across a project.',
        'Helping new developers learn conventional commit standards.',
        'Generating starting points for commit messages when unsure how to phrase changes.',
      ],
      howItWorks: 'Enter a description of your code changes or a summary of the diff into the text area. Select the type of commit (e.g., "feat" for new feature, "fix" for bug fix). Click "Generate Message". The AI will process your input and suggest a commit message. Review and copy the suggestion.',
      tips: [
        'The more detailed your description or diff, the better the AI_s suggestion will be.',
        'Always review AI-generated messages to ensure accuracy and relevance before committing.',
        'Use specific commit types to clearly communicate the nature of the changes.',
      ],
    },
    faqs: [
      { question: 'What are conventional commit messages?', answer: 'Conventional Commits is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. The convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.' },
      { question: 'Is the generated message always perfect?', answer: 'AI suggestions are a starting point. They may not always be perfect and should be reviewed and edited if necessary. The quality depends on the input and the AI model_s understanding.' },
      { question: 'Is my code diff sent to a server?', answer: 'Yes, the input you provide (description or diff) is sent to the AI model for processing to generate the commit message.' },
    ],
    keywords: ['ai', 'commit message', 'git', 'developer tools', 'conventional commits', 'version control'],
  },
  {
    id: 'ai-blog-post-idea-generator',
    title: 'AI Blog Post Idea Generator',
    description: 'Get AI-powered suggestions for blog post titles and topics.',
    category: 'ai-powered',
    icon: Icons.Lightbulb,
    iconName: 'Lightbulb',
    path: '/tools/ai-blog-post-idea-generator',
    longDescription: {
      overview: 'Stuck for blog ideas? The AI Blog Post Idea Generator helps you brainstorm engaging titles and topics. Input a general theme or keyword and specify your target audience, and the AI will provide a list of creative suggestions to kickstart your content creation.',
      useCases: [
        'Overcoming writer_s block for blog content.',
        'Exploring new angles for existing topics.',
        'Tailoring content ideas to specific audience segments.',
        'Generating a list of potential titles for A/B testing.',
      ],
      howItWorks: 'Enter your primary topic or keyword. Optionally, describe your target audience. Click "Generate Ideas". The AI will analyze your input and generate a list of potential blog post titles or ideas.',
      tips: [
        'Try different phrasings for your topic to get diverse suggestions.',
        'Specifying a target audience can lead to more focused and relevant ideas.',
        'Use the generated ideas as inspiration; you can refine or combine them.',
      ],
    },
    faqs: [
      { question: 'How many ideas will it generate?', answer: 'The tool typically generates a list of 5-7 ideas per request, but this can vary.' },
      { question: 'Are the ideas unique?', answer: 'AI generates ideas based on patterns and information it has learned. While it aims for creativity, some suggestions might be similar to existing content online. Always add your unique perspective.' },
      { question: 'Is my input topic sent to a server?', answer: 'Yes, your topic and target audience description are sent to the AI model to generate ideas.' },
    ],
    keywords: ['ai', 'blog ideas', 'content creation', 'writing assistant', 'topic generator', 'title generator'],
  },
  {
    id: 'ai-text-summarizer',
    title: 'AI Text Summarizer',
    description: 'Quickly summarize long articles, documents, or text passages using AI.',
    category: 'ai-powered',
    icon: Icons.ScanLine,
    iconName: 'ScanLine',
    path: '/tools/ai-text-summarizer',
    longDescription: {
      overview: 'The AI Text Summarizer condenses lengthy text into a concise summary. Paste your text, choose a desired summary length (short, medium, or long), and let the AI extract the key points for you. Useful for quickly understanding the gist of an article or document.',
      useCases: [
        'Getting the main points of a long news article or research paper.',
        'Summarizing meeting notes or reports.',
        'Creating abstracts or executive summaries.',
        'Quickly reviewing content before deciding to read it in full.',
      ],
      howItWorks: 'Paste the text you want to summarize into the input area. Select your preferred summary length (short, medium, or long). Click "Summarize". The AI will process the text and generate a summary based on your length preference.',
      tips: [
        'The quality of the summary can depend on the clarity and structure of the original text.',
        '"Short" summaries provide a very brief overview, while "Long" summaries retain more detail.',
        'AI summaries are helpful but always cross-reference with the original text for critical information.',
      ],
    },
    faqs: [
      { question: 'What is the maximum text length it can summarize?', answer: 'While there_s a limit, it_s generally quite generous for typical articles or documents. Very extremely long texts might be truncated or result in less coherent summaries. It_s best to test with your specific content.' },
      { question: 'Does it work for all languages?', answer: 'The AI model is primarily trained on English, so summaries for English text will be most accurate. Performance may vary for other languages.' },
      { question: 'Is my text sent to a server?', answer: 'Yes, the input text is sent to the AI model for processing to generate the summary.' },
    ],
    keywords: ['ai', 'text summarizer', 'summarization', 'content condensation', 'article summary', 'document summary'],
  },
  {
    id: 'ai-image-alt-text-generator',
    title: 'AI Image Alt Text Generator',
    description: 'Upload an image to generate descriptive alt text using AI for better accessibility and SEO.',
    category: 'ai-powered',
    icon: Icons.Image,
    iconName: 'Image',
    path: '/tools/ai-image-alt-text-generator',
    longDescription: {
      overview: 'The AI Image Alt Text Generator helps you create descriptive alternative text (alt text) for your images. Alt text is crucial for web accessibility, allowing screen readers to describe images to visually impaired users, and also helps search engines understand image content for better SEO. Upload an image file to get an AI-generated suggestion.',
      useCases: [
        'Making website images accessible to users with visual impairments.',
        'Improving SEO by providing search engines with context about images.',
        'Generating alt text for large batches of images more quickly.',
        'Ensuring compliance with accessibility standards (WCAG).',
      ],
      howItWorks: 'Click the "Choose Image" button to select an image file (PNG, JPG, GIF, WebP, etc.) from your computer. Once uploaded, a preview of the image will be displayed. Click "Generate Alt Text". The tool then sends the image data (as a Base64 Data URI) to an AI model, which analyzes the visual content and suggests descriptive alt text. Review the generated alt text for accuracy and context before using it. Max file size: 5MB.',
      tips: [
        'Good alt text is concise yet descriptive, conveying the purpose or content of the image.',
        'Avoid starting alt text with "Image of..." or "Picture of..." as it_s usually redundant.',
        'For complex images like charts or graphs, the AI might provide a general description; you may need to add more specific details manually.',
        'Ensure uploaded images are not excessively large (e.g., under 5MB) for better performance and to stay within potential API limits.',
      ],
    },
    faqs: [
      { question: 'What image file types are supported?', answer: 'Common web image formats like PNG, JPEG, GIF, and WEBP are generally supported, as the browser reads the file and converts it to a Data URI.' },
      { question: 'How accurate is the AI-generated alt text?', answer: 'AI can generate surprisingly good descriptions, but it_s not perfect. Always review and edit the alt text to ensure it accurately represents the image and its context on your page. Context is key for good alt text.' },
      { question: 'Is there a file size limit for uploads?', answer: 'Yes, for performance and to manage data transfer to the AI model, there is a file size limit, currently set at around 5MB. The tool will provide an error if the file is too large.' },
      { question: 'Is my image data sent to a server?', answer: 'Yes, after you upload the image, its data (converted to a Base64 Data URI format) is sent to the AI model for processing to generate the alt text.' },
    ],
    keywords: ['ai', 'alt text', 'image accessibility', 'seo', 'image description', 'wcag', 'image upload'],
  },
];

export const getToolById = (id: string): Tool | undefined => tools.find(tool => tool.id === id);
export const getToolsByCategory = (categoryId: string): Tool[] => tools.filter(tool => tool.category === categoryId);
export const getCategoryById = (id: string): Category | undefined => categories.find(category => category.id === id);
export const getAllTools = (): Tool[] => tools;
export const getAllCategories = (): Category[] => categories;

// Function to get serializable tool data (omitting the icon function)
export const getSerializableTool = (tool: Tool): Omit<Tool, 'icon'> => {
  const { icon, ...serializableTool } = tool;
  return serializableTool;
};

export const getSerializableTools = (toolsList: Tool[]): Omit<Tool, 'icon'>[] => {
  return toolsList.map(tool => {
    const { icon, ...serializableTool } = tool;
    return serializableTool;
  });
};
