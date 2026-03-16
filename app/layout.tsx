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
  title: 'ClientFlash AI - Attirez Plus de Clients avec une Page Professionnelle en 72 Heures',
  description: 'Arrêtez de lutter avec votre visibilité en ligne. Nous créons une page d\'atterrissage spectaculaire, un texte marketing convaincant et des publications sur les réseaux sociaux qui attirent vos clients idéaux. Livraison en 72 heures.',
  keywords: 'page d\'atterrissage, texte marketing, publications réseaux sociaux, acquisition clients, marketing PME, marketing IA',
  openGraph: {
    title: 'ClientFlash AI - Pages Professionnelles en 72 Heures',
    description: 'Obtenez une page d\'atterrissage professionnelle, un texte marketing et des publications sur les réseaux sociaux créés pour votre entreprise en seulement 72 heures.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
