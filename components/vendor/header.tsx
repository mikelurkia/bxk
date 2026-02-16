import { getSession } from "@/modules/auth/auth.repository";
import LogoutButton from "@/modules/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import { KeyRound, MessageCircleDashed, MessageCircleQuestionMark } from "lucide-react";
import { getMyShop } from "@/modules/shops/shop.repository";
import { ThemeSwitcher } from "@/components/theme-switcher";


export default async function Header() {

  return (

    <header className="shadow p-3 flex items-center justify-between">
      <div className="space-x-3 flex items-center">
        Buscador
      </div>
      <div className="space-x-3 flex items-center">
        <ThemeSwitcher/>
      </div>
    </header>
  )
}
