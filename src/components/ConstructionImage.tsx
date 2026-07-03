import Image from 'next/image';

interface ConstructionImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ConstructionImage({
  src,
  alt,
  width,
  height,
  className = '',
}: ConstructionImageProps) {
  return (
    <figure className={`sketch-border ${className}`} style={{ margin: '2rem 0' }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      />
      {alt && (
        <figcaption
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--ink-faint)',
            padding: '0.6rem 0.8rem',
            borderTop: '1px solid var(--ink)',
            letterSpacing: '0.04em',
          }}
        >
          // {alt}
        </figcaption>
      )}
    </figure>
  );
}
