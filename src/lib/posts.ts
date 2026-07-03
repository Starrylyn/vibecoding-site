import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface PostData extends PostMeta {
  content: string;
}

function parseFrontmatter(fileContents: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContents };
  }

  const frontmatterStr = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Remove surrounding quotes
    if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    // Parse array syntax: [item1, item2]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''));
    }

    data[key] = value;
  });

  return { data, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = parseFrontmatter(fileContents);
      const slug = filename.replace(/\.md$/, '');

      return {
        slug,
        title: (data.title as string) || 'Untitled',
        date: (data.date as string) || '',
        excerpt: (data.excerpt as string) || '',
        tags: (data.tags as string[]) || [],
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = parseFrontmatter(fileContents);

  return {
    slug,
    title: (data.title as string) || 'Untitled',
    date: (data.date as string) || '',
    excerpt: (data.excerpt as string) || '',
    tags: (data.tags as string[]) || [],
    content,
  };
}

export function renderMarkdown(content: string): string {
  let html = '';
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        html += `<div class="sketch-code-block"><pre><code>${escapeHtml(codeContent.trim())}</code></pre></div>\n`;
        codeContent = '';
        inCodeBlock = false;
        codeLanguage = '';
      } else {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = null;
      }
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = null;
      }
      const quoteContent = parseInline(line.slice(2));
      html += `<blockquote><p>${quoteContent}</p></blockquote>\n`;
      continue;
    }

    // Horizontal rule
    if (line.match(/^(---|\*\*\*|___)$/)) {
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = null;
      }
      html += '<hr>\n';
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (inList) {
        html += `</${listType}>\n`;
        inList = false;
        listType = null;
      }
      const level = headingMatch[1].length;
      const text = parseInline(headingMatch[2]);
      html += `<h${level}>${text}</h${level}>\n`;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      if (!inList || listType !== 'ul') {
        if (inList) html += `</${listType}>\n`;
        html += '<ul>\n';
        inList = true;
        listType = 'ul';
      }
      const text = parseInline(line.replace(/^[-*]\s+/, ''));
      html += `<li>${text}</li>\n`;
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) html += `</${listType}>\n`;
        html += '<ol>\n';
        inList = true;
        listType = 'ol';
      }
      const text = parseInline(olMatch[2]);
      html += `<li>${text}</li>\n`;
      continue;
    }

    // Paragraph
    if (inList) {
      html += `</${listType}>\n`;
      inList = false;
      listType = null;
    }
    const text = parseInline(line);
    html += `<p>${text}</p>\n`;
  }

  if (inList) {
    html += `</${listType}>\n`;
  }

  return html;
}

function parseInline(text: string): string {
  let result = text;

  // Bold: **text**
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* (but not **)
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  // Inline code: `text`
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Links: [text](url)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
