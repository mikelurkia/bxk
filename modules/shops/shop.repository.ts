import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PublicShop, Shop } from './shop.schemas';

export async function getPublicShops(): Promise<PublicShop[]> {
  
  const supabase = await createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('shops')
    .select(`
      id,
      name,
      slug,
      description,
      address,
      phone,
      whatsapp,
      instagram
    `)
    .order('name', { ascending: true });

  if (error) {
    console.error('[getPublicShops]', error);
    throw new Error('Error al cargar tiendas');
  }

  return data as PublicShop[] ?? [];
}

export async function getShopPublicBySlug(shopSlug: string): Promise<PublicShop | null> {
  
  const supabase = await createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('shops')
    .select(`
      id,
      name,
      description,
      address,
      phone,
      whatsapp,
      instagram
    `)
    .eq('slug', shopSlug).single();

  if (error) {
    console.error('[getShopPublicBySlug]', error);
    throw new Error('Error al cargar tienda');
  }

  return data as PublicShop;
}

export async function getMyShop() {

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // La consulta a perfiles con RLS devolverá solo el perfil del usuario logueado, con su tienda asociada (si tiene)
  const { data , error } = await supabase.from('profiles').select(`role, shop_id`).eq('id', user.id).single();

  if (error) {
    console.error('[getMyTienda]', error);
    throw new Error('No se ha podido cargar la tienda');
  }

  const { data: tienda , error: errorTienda } = await supabase
    .from('shops')
    .select(`
      *
    `).eq('id', data.shop_id).single();
 
  if (error) {
    console.error('[getMyTienda]', error);
    throw new Error('No se ha podido cargar la tienda');
  }

  return tienda as Shop | null;
}
