import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Vedic Wisdom | Property-Specific Spatial Vastu & Classical Vedic Advisory',
  description: 'Property-Specific Spatial Vastu & Classical Vedic Advisory (Practical, Logical & Non-Structural). Ethical, non-demolition directional consultations and classical Vedic astrological guidance for homes, apartments, and commercial workplaces.',
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
