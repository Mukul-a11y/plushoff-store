import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plushoff - Your Trusted Shopping Destination",
  description: "Shop quality products at unbeatable prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
