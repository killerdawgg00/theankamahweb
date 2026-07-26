import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kelvin Ankamah Adjei — Designer & Developer",
  description: "Independent creative developer building expressive, high-performance digital experiences from Accra, Ghana.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Kelvin Ankamah Adjei — Designer & Developer",
    description: "Expressive digital experiences, engineered with intent.",
    type: "website",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "Kelvin Ankamah Adjei — Designer & Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelvin Ankamah Adjei — Designer & Developer",
    description: "Expressive digital experiences, engineered with intent.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
