import type { Metadata } from "next";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simone Clothing",
  description: "Shop the latest from Simone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t py-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Simone Clothing. All rights
            reserved.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
