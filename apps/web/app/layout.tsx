import { Geist, Geist_Mono } from "next/font/google"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import "@workspace/ui/globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@workspace/ui/components/button"
import { Providers } from "@/components/providers"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>
          <AppSidebar />
          <main className="p-4 w-full space-y-4">
            <Button variant="outline" size="icon" asChild>
              <SidebarTrigger />
            </Button>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
