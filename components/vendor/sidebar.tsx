
import { Home, Package, ShoppingCart, Settings, User, Infinity, ChevronDown, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMyUser, getSession } from "@/modules/auth/auth.repository";
import { getMyShop } from "@/modules/shops/shop.repository";
import LogoutButton from "@/modules/auth/LogoutButton";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Collapsible } from "radix-ui";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Productos", icon: Package, href: "/productos" },
  { label: "Opciones",  icon: Settings, href: "/opciones/tienda" },
];

export async function VendorSidebar() {

  const session = await getSession();
  const user    = await getMyUser();
  const tienda  = await getMyShop();

  return (

    <Sidebar collapsible="icon" variant="inset" className="border-r">
      <SidebarHeader className="flex flex-col items-center gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <h3 className="text-xl font-bold tracking-tight">{tienda?.name}</h3>
          </SidebarMenuItem>
        </SidebarMenu>
        
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-auto">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium leading-none">{tienda?.name}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}