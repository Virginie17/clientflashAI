import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ClientFlash AI - Landing Page Professionnelle en 72h',
  description: 'Transformez votre activité avec une page web professionnelle, textes marketing et posts Instagram. Livraison garantie en 72h. Coachs, esthéticiennes, thérapeutes : lancez-vous dès demain !',
  keywords: 'landing page, page professionnelle, marketing digital, coach sportif, esthéticienne, thérapeute, acquisition clients, textes marketing, posts Instagram, web design',
  authors: [{ name: 'ClientFlash AI' }],
  creator: 'ClientFlash AI',
  publisher: 'ClientFlash AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://clientflash-ai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ClientFlash AI - Landing Page Professionnelle en 72h',
    description: 'Obtenez une page web complète, textes marketing et posts Instagram créés par IA en seulement 72h. Service pour coachs, esthéticiennes, thérapeutes et professionnels.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'ClientFlash AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ClientFlash AI - Landing Page Professionnelle en 72h',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClientFlash AI - Landing Page en 72h',
    description: 'Page web professionnelle + marketing + posts Instagram en 72h seulement',
    images: ['/og-image.jpg'],
    creator: '@clientflash_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
