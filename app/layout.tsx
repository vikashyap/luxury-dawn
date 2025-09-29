import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: 'Last Days of Summer - Coming Soon',
  description: 'Experience the infinite golden-hour scroll as summer fades into memory. A luxury web experience featuring smooth parallax animations and buttery transitions.',
  keywords: ['summer', 'golden hour', 'luxury', 'web experience', 'coming soon', 'parallax', 'scroll animation'],
  authors: [{ name: 'Luxury Dawn' }],
  openGraph: {
    title: 'Last Days of Summer - Coming Soon',
    description: 'Experience the infinite golden-hour scroll as summer fades into memory.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Last Days of Summer - Coming Soon',
    description: 'Experience the infinite golden-hour scroll as summer fades into memory.',
  },
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
