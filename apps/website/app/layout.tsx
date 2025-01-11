import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@workspace/ui/globals.css"
import { Header } from "@/components/header";
import Footer from "@/components/footer";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Mail",
  description: "Lumina Mail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased dark`}>
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
