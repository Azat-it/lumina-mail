import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { Toaster } from "@workspace/ui/components/sonner"
import { Header } from "@/components/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full space-y-4">
        <Header />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  )
}