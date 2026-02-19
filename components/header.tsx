import { getSession } from "@/modules/auth/auth.repository";
import LogoutButton from "@/modules/auth/LogoutButton";
import { Button } from "./ui/button";
import { KeyRound, MessageCircleQuestionMark } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./locale-switcher";


export default async function Header() {

  const session = await getSession();
  
  return (
    <header className="bg-card shadow p-4 mb-6 flex items-center justify-between">

      <div className="flex items-baseline space-x-4">
        <a href={process.env.NEXT_PUBLIC_URL}><h1 className="flex items-center text-2xl font-bold"><MessageCircleQuestionMark className="mr-2 h-6 w-6" />bxk</h1></a>
        {session && <span className="text-sm">{session.user.email}</span>}
      </div>
      
      <div className="space-x-3 flex items-center">
        <a href={process.env.NEXT_PUBLIC_APP_URL}>
          <Button variant="default" size="sm">
            <KeyRound className="mx-1 h-4 w-4" />Panel de vendedor
          </Button>
        </a>
        {session && <LogoutButton/>}
        <LanguageSwitcher />
        <ThemeSwitcher/>
      </div>

    </header>
  )
}
