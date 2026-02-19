import { Search } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "../locale-switcher";

export default async function Header() {

  return (

    <header className="border-b p-3 flex items-center justify-between">
      <div className="space-x-3 flex items-center">
        {/*<SidebarTrigger />*/}
        <Search className="h-4 w-4" />
      </div>
      <div className="space-x-3 flex items-center">
        <LanguageSwitcher />
        <ThemeSwitcher/>
      </div>
    </header>
  )
}
