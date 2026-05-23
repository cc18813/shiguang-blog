import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CyberCursor } from "@/components/ui/CyberCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "逸洛学社",
    template: "%s | 逸洛学社",
  },
  description: "赛博空间中的思想据点。思考、阅读、创造的数字化记录。",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "逸洛学社",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-void-900 text-gray-300 antialiased">
        {/* Ambient neon glows */}
        <div className="ambient-glow" aria-hidden="true" />

        {/* CRT effects */}
        <div className="crt-overlay" aria-hidden="true" />
        <div className="crt-scanline" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />

        {/* Custom cyber cursor */}
        <CyberCursor />

        <Header />
        <main className="py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
