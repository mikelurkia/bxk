import Link from "next/link";
import { Github, KeyRound, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import LogoutButton from "@/modules/auth/LogoutButton";
import { getSession } from "@/modules/auth/auth.repository";


export default async function Footer() {
 
  const session = await getSession();

  return (
    <footer className="w-full bg-background">
      <div className="container mx-auto px-4 py-12 md:py-6">        

        <div className="mt-12 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Baxauk. Todos los derechos reservados.</p>
        </div>
      </div>
      
    </footer>
  )
}
