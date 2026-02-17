// components/sidebar.tsx
import { Settings, Infinity, Settings2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMyUser, getSession } from "@/modules/auth/auth.repository";
import { getMyShop } from "@/modules/shops/shop.repository";

const navItems = [
  { label: "Tienda", icon: Store, href: "/opciones/tienda" },
  { label: "Opción 2",  icon: Settings, href: "/productos" },
  { label: "Opción 3",  icon: Settings2, href: "/opciones" },
];

export async function SidebarOpciones() {

  const session = await getSession();
  const user    = await getMyUser();
  const tienda  = await getMyShop();

  return (
    <div className="flex h-screen w-64 flex-col py-4">
      
      <nav className="flex-1 space-y-1 px-1">
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
    </div>
  );
}