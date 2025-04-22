import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full"> {/* Contenedor Flex que ocupa toda la pantalla */}
        <AppSidebar />
        <main className="flex-1 bg-white"> {/* flex-1 para ocupar el espacio restante */}
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}