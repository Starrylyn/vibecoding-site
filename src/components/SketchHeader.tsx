import Link from 'next/link';

export default function SketchHeader() {
  return (
    <header className="sketch-header">
      <div className="sketch-header-inner">
        <Link href="/" className="sketch-logo">
          Vibecoding
        </Link>
        <nav className="sketch-nav">
          <Link href="/">首页</Link>
          <Link href="/about">关于</Link>
        </nav>
      </div>
    </header>
  );
}
