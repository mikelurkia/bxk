import { getSession } from "@/modules/auth/auth.repository";
import LogoutButton from "@/modules/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import { KeyRound, MessageCircleDashed, MessageCircleQuestionMark, Search } from "lucide-react";
import { getMyShop } from "@/modules/shops/shop.repository";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SidebarTrigger } from "../ui/sidebar";


export default async function Header() {

  return (

    <header className="border-b p-3 flex items-center justify-between">
      <div className="space-x-3 flex items-center">
        {/*<SidebarTrigger />*/}
        <Search className="h-4 w-4" />
      </div>
      <div className="space-x-3 flex items-center">
        <ThemeSwitcher/>
      </div>
    </header>
  )
}
