'use server';

import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getMyShop } from './shop.repository';
import { updateShopSchema, UpdateFormState } from './shop.schemas';

export async function updateMyShopAction(_: any, formData: FormData): Promise<UpdateFormState> {

  const supabase = await createSupabaseServerClient();

  const rawData = {
    name: formData.get('name'),
    description: formData.get('description'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    whatsapp: formData.get('whatsapp'),
    instagram: formData.get('instagram'),
    active: formData.get('active') === 'on' ? true : false,
    slug: slugify(formData.get('name') as string, { lower: true }),
  };

  const validatedFields = updateShopSchema.safeParse(rawData);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Error de validación",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  // Resolver la tienda del usuario (RLS decide)
  const tienda = await getMyShop();

  if (!tienda) {
    return {
      success: false,
      message: "No tienes ninguna tienda asociada a tu cuenta",
      errors: undefined,
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  const { error } = await supabase
    .from('shops')
    .update({
      name: validatedFields.data.name,
      description : validatedFields.data.description,
      address: validatedFields.data.address,
      phone: validatedFields.data.phone,
      whatsapp: validatedFields.data.whatsapp,
      instagram: validatedFields.data.instagram,
      active: validatedFields.data.active,
    }).eq('id', tienda.id);

  if (error) {
    console.error('[updateMyShop]', error);
    throw new Error('No se ha podido actualizar la tienda');
  }

    // ✅ NUEVO: Obtener los datos actualizados del servidor
  const updatedShop = await getMyShop();

  return {
    success: true,
    message: "Tienda actualizada correctamente",
    errors: undefined,
    inputs: updatedShop as any, // Devolvemos lo que escribió el usuario
  };
  
}
