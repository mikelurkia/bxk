// components/sidebar.tsx
import { Home, Package, ShoppingCart, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMyPerfil, getMyUser, getSession } from "@/modules/auth/auth.repository";
import { getMyShop } from "@/modules/shops/shop.repository";
import LogoutButton from "@/modules/auth/LogoutButton";
import { ThemeSwitcher } from "./theme-switcher";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Productos", icon: Package, href: "/productos" },
  { label: "Tienda", icon: Settings, href: "/tienda" },
];

export async function Sidebar() {

  const session = await getSession();
  const user    = await getMyUser();
  const tienda  = await getMyShop();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Header / Logo */}
      <div className="p-6 flex space-x-4">
        <h2 className="text-xl font-bold tracking-tight">{tienda?.name}</h2>
        <ThemeSwitcher/>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <a href={item.href} key={item.label}>
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </a>
        ))}
      </nav>

      {/* Perfil del Vendedor (Anclado al fondo) */}
      <div className="mt-auto border-t p-4">
        

        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors cursor-pointer">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium leading-none">{tienda?.name}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
          </div>
        </div>
        <div className="space-x-3 flex items-center my-2">
          {tienda && 
            <a href={process.env.NEXT_PUBLIC_URL}>
              <Button variant="outline" size="sm">
                Portal público
              </Button>
            </a>
          }
          {session && <LogoutButton/>}
        </div>
      </div>
    </div>
  );
}