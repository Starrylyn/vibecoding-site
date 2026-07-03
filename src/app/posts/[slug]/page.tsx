import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, renderMarkdown } from '@/lib/posts';
import SketchHeader from '@/components/SketchHeader';
import SketchFooter from '@/components/SketchFooter';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: '文章未找到' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = renderMarkdown(post.content);

  return (
    <>
      <SketchHeader />
      <main className="sketch-layout sketch-fade-in">
        <article>
          <header className="sketch-article-header">
            <div className="sketch-article-date">{post.date}</div>
            <h1 className="sketch-article-title">{post.title}</h1>
            <div className="sketch-article-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="sketch-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className="sketch-article-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        <hr />

        <nav style={{ marginTop: '1.5rem' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--ink-light)',
            }}
          >
            ← 返回首页
          </Link>
        </nav>
      </main>
      <SketchFooter />
    </>
  );
}
