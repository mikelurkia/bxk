import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function getMyUser(){

  const supabase = await createSupabaseServerClient();

  const { data: { user }, } = await supabase.auth.getUser();
  return user;
  
}
export async function getMyPerfil() {

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: perfil, error } = await supabase
    .from('perfiles')
    .select(`
      rol,
      tienda_id,
      tienda:tiendas (
        id,
        nombre,
        slug
      )
    `)
    .eq('id', user?.id)
    .maybeSingle();

  return perfil;


}
