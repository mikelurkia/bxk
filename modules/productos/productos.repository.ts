import { createSupabaseServerClient } from '@/lib/supabase/server';
import { OwnerProduct, PublicProduct } from './products.schemas';

export async function getProductsDashboard(shopId: string): Promise<OwnerProduct[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      name,
      description,
      slug,
      id,
      active,
      created_at
    `)
    .eq('shop_id', shopId);

  if (error) throw error;

  return data as OwnerProduct[] ?? [];
}

export async function getProductDashboardBySlug(shopId: string, productSlug: string): Promise<OwnerProduct | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      slug,
      active,
      created_at
    `)
    .eq('shop_id', shopId)
    .eq('slug', productSlug)
    .single();

  if (error) throw error;

  return data as OwnerProduct;
}  

export async function getProductDashboardById(productoId: string): Promise<OwnerProduct | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      *
    `)
    .eq('id', productoId)
    .single();

  if (error) throw error;

  return data as OwnerProduct;
}

export async function getProductsPublic(tiendaId: string): Promise<PublicProduct[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      name,
      description,
      slug
    `)
    .eq('tienda_id', tiendaId);

  if (error) throw error;

  return data as PublicProduct[] ?? []

}

export async function getProductPublicBySlug(shopId: string, productSlug: string): Promise<PublicProduct | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('products')
    .select(`
      name,
      description,
      slug      
    `)
    .eq('shop_id', shopId)
    .eq('slug', productSlug)
    .maybeSingle();

  if (error) throw error;

  return data as PublicProduct;
  
}
