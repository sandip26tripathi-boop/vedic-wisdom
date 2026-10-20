import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Vedic Wisdom | Scientific Spatial Vastu & High-Precision Predictive Astrology',
  description: 'Harmonizing Spaces, Decoding Destinies — Mathematical Precision Meets Vedic Sciences.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden w-full max-w-full m-0 p-0 relative">
        {children}
      </body>
    </html>
  );
}
