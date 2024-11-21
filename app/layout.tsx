import type { Metadata } from "next";
import { Manrope } from 'next/font/google'
import "./globals.css";


const font = Manrope({
  weight:['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})


export const metadata: Metadata = {
  title: "Hello Tractor E-Commerce",
  description: "A marketplace for second-hand tractors that’s simple, secure, and scales globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
