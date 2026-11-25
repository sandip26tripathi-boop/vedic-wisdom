import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vedic Wisdom — Harmonizing Global Spaces & Destinies | 0% Demolition Astro-Vastu & Academy',
  description: 'Global Astro-Vastu consultancy, Vedic research center, and online academy founded by Sandeep K. Tripathi. Specializing in 0% Demolition non-invasive space corrections, KP Astrology Kundli synchronization, and certified international training.',
  keywords: [
    'Astro-Vastu',
    'Vedic Wisdom',
    'Sandeep K Tripathi',
    '0% Demolition Vastu',
    'KP Astrology Vastu',
    'MahaVastu',
    'Bhopal Vastu Consultant',
    'Global Vastu Audit',
    'Non-Invasive Vastu'
  ],
  authors: [{ name: 'Sandeep K. Tripathi' }],
};

export const viewport: Viewport = {
  themeColor: '#FAF4E6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-amber-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
