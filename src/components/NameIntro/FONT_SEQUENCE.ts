export type FontFrame = {
  fontFamily: string;
  fontWeight: number;
  fontStyle?: 'normal' | 'italic';
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase';
  fontStretch?: string;       // for variable width axes
  fillMode?: 'solid' | 'outline'; // outline = stroke only, no fill
  glitch?: boolean;           // triggers RGB-split on this frame
};

export const FONT_SEQUENCE: FontFrame[] = [
  { fontFamily: 'JetBrains Mono',      fontWeight: 500, letterSpacing: '0em' },
  { fontFamily: 'Playfair Display',    fontWeight: 700, fontStyle: 'italic' },
  { fontFamily: 'Archivo Black',       fontWeight: 400, textTransform: 'uppercase', glitch: true },
  { fontFamily: 'Cormorant Garamond',  fontWeight: 300, fontStyle: 'italic' },
  { fontFamily: 'Sora',                fontWeight: 800, letterSpacing: '-0.02em' },
  { fontFamily: 'IBM Plex Mono',       fontWeight: 300, fillMode: 'outline' },
  { fontFamily: 'Anton',               fontWeight: 400, textTransform: 'uppercase', glitch: true },
  { fontFamily: 'Fraunces',            fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.01em' },
  { fontFamily: 'Space Grotesk',       fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase' },
  { fontFamily: 'Bodoni Moda',         fontWeight: 700 },
  { fontFamily: 'Unbounded',           fontWeight: 200, fontStretch: '125%', glitch: true },
  { fontFamily: 'Zilla Slab',          fontWeight: 600, fontStyle: 'italic' },
  { fontFamily: 'JetBrains Mono',      fontWeight: 800, fillMode: 'outline' },
  { fontFamily: 'Fraunces',            fontWeight: 300, letterSpacing: '0.05em' },
  { fontFamily: 'Archivo Black',       fontWeight: 400, glitch: true },
  { fontFamily: 'Cormorant Garamond',  fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' },
  { fontFamily: 'Space Grotesk',       fontWeight: 700, fontStretch: '80%' },
  { fontFamily: 'Playfair Display',    fontWeight: 900 },
  { fontFamily: 'Sora',                fontWeight: 200, fillMode: 'outline', glitch: true },
  { fontFamily: 'Anton',               fontWeight: 400, letterSpacing: '-0.02em' },
  // --- Phase B: settling, slower gaps ---
  { fontFamily: 'Unbounded',           fontWeight: 600, fontStretch: '100%' },
  { fontFamily: 'Fraunces',            fontWeight: 500, fontStyle: 'italic' },
  { fontFamily: 'Space Grotesk',       fontWeight: 500 },
  // --- Phase C: lock-in — replace with YOUR actual hero font/weight ---
  { fontFamily: 'var(--font-geist-sans), Arial, sans-serif', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em' },
];
