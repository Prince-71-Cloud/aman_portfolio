export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  order: number
  lastUpdated: string
  content: string
}

export const blogs: BlogPost[] = [
  {
    slug: "introduction-to-web-security",
    title: "Introduction to Web Security",
    description: "Learn the fundamentals of web security and common vulnerabilities",
    category: "INTRODUCTION",
    order: 1,
    lastUpdated: "12/10/2025",
    content: `# Introduction to Web Security

Welcome to the Web Security course! In this lesson, we'll cover the basics.

## What is Web Security?

Web security refers to the protective measures taken by organizations to protect their web applications from cyber threats.

## Common Vulnerabilities

- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)

## Getting Started

Make sure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git
- A code editor (VS Code recommended)

\`\`\`bash
# Clone the repository
git clone https://github.com/example/web-security-course
cd web-security-course

# Install dependencies
npm install

# Run the development server
npm run dev
\`\`\`

## Next Steps

In the next class, we'll set up our development environment.`,
  },
  {
    slug: "cookies-overview",
    title: "Cookies Overview",
    description: "Understanding HTTP cookies and their security implications",
    category: "COOKIES",
    order: 2,
    lastUpdated: "12/09/2025",
    content: `# Cookies Overview

Learn about HTTP cookies and how they work.

## What are Cookies?

Cookies are small pieces of data stored by the browser.

## Cookie Attributes

- **HttpOnly**: Prevents JavaScript access
- **Secure**: Only sent over HTTPS
- **SameSite**: Controls cross-site sending

\`\`\`javascript
// Setting a cookie
document.cookie = "sessionId=abc123; HttpOnly; Secure; SameSite=Strict";
\`\`\`

## Security Considerations

Always set proper cookie attributes to prevent attacks.`,
  },
  {
    slug: "xyzzzz",
    title: "xyzzzz",
    description: "Learn markdown syntax guide with headers, emphasis, lists, images, links, blockquotes, tables, and code blocks",
    category: "WHATEVER",
    order: 3,
    lastUpdated: "12/17/2025",
    content: `# Markdown Syntax Guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/image/sample.webp "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`javascript
let message = 'Hello world';
alert(message);
\`\`\`

## Inline code

This web site is using \`markedjs/marked\`.`,
  },
  {
  "slug": "test-2",
  "title": "test 2",
  "description": "xyz",
  "category": "TEST",
  "order": 2,
  "lastUpdated": "12/17/2025",
  "content": "# Markdown syntax guide\n\n## Headers\n\n# This is a Heading h1\n## This is a Heading h2\n###### This is a Heading h6\n\n## Emphasis\n\n*This text will be italic*  \n_This will also be italic_\n\n**This text will be bold**  \n__This will also be bold__\n\n_You **can** combine them_\n\n## Lists\n\n### Unordered\n\n* Item 1\n* Item 2\n* Item 2a\n* Item 2b\n    * Item 3a\n    * Item 3b\n\n### Ordered\n\n1. Item 1\n2. Item 2\n3. Item 3\n    1. Item 3a\n    2. Item 3b\n\n## Images\n\n![This is an alt text.](/image/sample.webp \"This is a sample image.\")\n\n## Links\n\nYou may be using [Markdown Live Preview](https://markdownlivepreview.com/).\n\n## Blockquotes\n\n> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.\n>\n>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.\n\n## Tables\n\n| Left columns  | Right columns |\n| ------------- |:-------------:|\n| left foo      | right foo     |\n| left bar      | right bar     |\n| left baz      | right baz     |\n\n## Blocks of code\n\n```\nlet message = 'Hello world';\nalert(message);\n```\n\n## Inline code\n\nThis web site is using `markedjs/marked`.\n"
}
]

