import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://simoneclothing.com"
  ),
  title: {
    default: "Simone Clothing",
    template: "%s | Simone Clothing",
  },
  description: "Bold streetwear meets modern minimalism — Shop Simone",
  openGraph: {
    type: "website",
    siteName: "Simone Clothing",
    title: "Simone Clothing",
    description: "Bold streetwear meets modern minimalism — Shop Simone",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simone Clothing",
    description: "Bold streetwear meets modern minimalism — Shop Simone",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-cream text-dark antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
