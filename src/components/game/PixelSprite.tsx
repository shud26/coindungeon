'use client';

interface Props {
  pixels: (number | null)[][];
  size?: number; // pixel cell size in px
  className?: string;
}

export default function PixelSprite({ pixels, size = 4, className = '' }: Props) {
  const rows = pixels.length;
  const cols = pixels[0]?.length ?? 0;

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridTemplateRows: `repeat(${rows}, ${size}px)`,
        imageRendering: 'pixelated',
      }}
    >
      {pixels.flat().map((color, i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            background: color !== null ? `#${color.toString(16).padStart(6, '0')}` : 'transparent',
          }}
        />
      ))}
    </div>
  );
}
