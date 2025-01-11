import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@workspace/ui/globals.css"
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { Providers } from "@/components/providers";

const nunito = Nunito({
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.className} antialiased`}>
        <Providers>
          <Header />
          <main className="">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html >
  );
}
