import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function useProtectedRoute(requiredRole?: "admin" | "vendor") {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      if (requiredRole) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role !== requiredRole) {
          router.push("/");
        }
      }
    }

    checkAuth();
  }, [router, requiredRole, supabase]);
}