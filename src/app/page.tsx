import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import SketchHeader from '@/components/SketchHeader';
import SketchFooter from '@/components/SketchFooter';

export const metadata: Metadata = {
  title: 'Vibecoding 实践分享 — 代码生成艺术',
  description:
    '探索用自然语言与 AI 对话式编程的艺术。记录代码如何开始呼吸。',
};

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <SketchHeader />
      <main className="sketch-layout sketch-fade-in">
        {/* Hero */}
        <section className="sketch-hero">
          <h1>
            当代码开始呼吸
            <br />
            记录 Vibecoding 实践
          </h1>
          <p className="sketch-hero-sub">
            用自然语言描述意图，让 AI 生成代码——
            这不是放弃编程，这是在升级编程的抽象层级。
            这里记录我的实践、工具和思考。
          </p>
        </section>

        {/* Posts */}
        <section>
          <div className="sketch-section-label">
            // 文章 · {posts.length} 篇
          </div>

          {posts.length === 0 ? (
            <div className="sketch-empty">
              <p>还没有文章。</p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
                在 content/posts/ 目录添加 .md 文件即可
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="sketch-post-card"
              >
                <div className="sketch-post-date">{post.date}</div>
                <h2 className="sketch-post-title">{post.title}</h2>
                <p className="sketch-post-excerpt">{post.excerpt}</p>
                <div className="sketch-post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="sketch-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </section>
      </main>
      <SketchFooter />
    </>
  );
}
