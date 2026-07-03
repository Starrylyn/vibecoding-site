import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Vibecoding 实践分享 — 代码生成艺术',
    template: '%s | Vibecoding 实践分享',
  },
  description:
    '一个关于 vibecoding 实践经验的个人网站。探索用自然语言与 AI 对话式编程的艺术——从工具链选择到实战复盘，记录代码如何开始呼吸。',
  keywords: [
    'vibecoding',
    'AI 编程',
    '代码生成',
    '自然语言编程',
    '提示词工程',
    'LLM',
    '生成式 AI',
    '开发工具',
    '前端开发',
    '高效编程',
  ],
  authors: [{ name: 'Vibecoding 实践者' }],
  openGraph: {
    title: 'Vibecoding 实践分享 — 代码生成艺术',
    description: '探索用自然语言与 AI 对话式编程的艺术',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'Vibecoding 实践分享',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Vibecoding 实践分享',
              description:
                '探索用自然语言与 AI 对话式编程的艺术——从工具链选择到实战复盘，记录代码如何开始呼吸。',
              url: 'https://vibecoding-site-eta.vercel.app',
              inLanguage: 'zh-CN',
              author: {
                '@type': 'Person',
                name: 'Vibecoding 实践者',
              },
              license: 'https://creativecommons.org/licenses/by-sa/4.0/',
            }),
          }}
        />
      </head>
      <body className="sketch-grid-bg">
        {children}
      </body>
    </html>
  );
}
