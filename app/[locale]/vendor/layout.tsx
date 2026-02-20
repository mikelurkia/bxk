import "@/app/globals.css";
import Header from "@/components/vendor/header";
import { VendorSidebar } from "@/components/vendor/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <SidebarProvider>
      <VendorSidebar/>
      <main className="flex-1">
        <Header/>
        <div className="mx-auto p-4 flex-1 flex-grow gap-6 w-full">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
