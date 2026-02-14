import { getSession } from "@/modules/auth/auth.repository";
import LogoutButton from "@/modules/auth/LogoutButton";
import { Button } from "./ui/button";
import { KeyRound, MessageCircleDashed, MessageCircleQuestionMark } from "lucide-react";
import { getMyShop } from "@/modules/shops/shop.repository";
import { ThemeSwitcher } from "./theme-switcher";


export default async function Header() {

  const session = await getSession();
  const tienda  = await getMyShop();
  
  return (

    <header className="bg-white shadow p-4 mb-6 flex items-center justify-between">

      <div className="flex items-baseline space-x-4">
        {tienda && 
        
        <a href={process.env.NEXT_PUBLIC_APP_URL}>
            <h1 className="flex items-center text-2xl font-bold"><MessageCircleQuestionMark className="mr-2 h-6 w-6" />
              {tienda? tienda?.name : "bxk"}
            </h1>
        </a>
                
        ||

        <a href={process.env.NEXT_PUBLIC_URL}>
            <h1 className="flex items-center text-2xl font-bold"><MessageCircleQuestionMark className="mr-2 h-6 w-6" />
              {tienda? tienda?.name : "bxk"}
            </h1>
        </a>
        }

      </div>
      
      <div className="space-x-3 flex items-center">
        
        {tienda && 
          <a href={process.env.NEXT_PUBLIC_URL}>
            <Button variant="outline" size="sm">
              Portal público
            </Button>
          </a>
        }
        {session && <LogoutButton/>}
        <ThemeSwitcher/>
      </div>

      

    </header>
  )
}
