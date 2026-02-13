'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { getProductPublicBySlug } from './productos.repository';
import { createProductSchema, updateProductSchema, FormState } from './products.schemas';

export async function createProductAction(_: any, formData: FormData): Promise<FormState> {
  
  const supabase = await createSupabaseServerClient();

  const rawData = {
    name: formData.get('name'),
    description: formData.get('description'),
    slug: slugify(formData.get('name') as string, { lower: true }),
    active: formData.get('active') === 'on' ? true : false,
  };

  const validatedFields = createProductSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Error de validación",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Usuario no autenticado'] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  const { data: profile } = await supabase.from('profiles').select('shop_id').eq('id', user.id).single();

  if (!profile) {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Perfil no encontrado'] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }
  
  // Validación extra: el slug debe ser único por tienda
  const existing = await getProductPublicBySlug(profile.shop_id, validatedFields.data.slug);
  if (existing) {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Ya existe un producto con ese slug'] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  const { error } = await supabase.from('products').insert({
    shop_id: profile.shop_id,
    name: validatedFields.data.name,
    description: validatedFields.data.description,
    slug: validatedFields.data.slug,
    active: validatedFields.data.active,
  });

  if (error?.code === '23505') {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Ya existe un producto con ese slug'] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    }
  }
  
  if (error) {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['No se pudo crear el producto'] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  revalidatePath('/products');

  return {
    success: true,
    message: "Producto creado correctamente",
    errors: undefined,
    inputs: rawData as any, // Devolvemos lo que escribió el usuario
  };
}

export async function updateProductAction(_: any, formData: FormData): Promise<FormState> {

  const supabase = await createSupabaseServerClient();

  const rawData = {
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    active: formData.get('active') === 'on' ? true : false,
    slug: slugify(formData.get('name') as string, { lower: true }),
  };

  const validatedFields = updateProductSchema.safeParse(rawData);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Error de validación",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  const { error } = await supabase
    .from('products')
    .update({
      name: validatedFields.data.name,
      description : validatedFields.data.description,
      active: validatedFields.data.active,
      slug: validatedFields.data.slug,
    }).eq('id', validatedFields.data.id);

  if (error?.code === '23505') {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Ya existe un producto con ese nombre'] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    }
  }

  if (error) {
    console.error('[updateProduct]', error);
    throw new Error('No se ha podido actualizar el producto');
  }

  // Refrescamos dashboard
  revalidatePath('/dashboard');

  return {
    success: true,
    message: "Producto actualizado correctamente",
    errors: undefined,
    inputs: rawData as any, // Devolvemos lo que escribió el usuario
  };
  
}

export async function deleteProductAction(productId: string) {
  
  const supabase = await createSupabaseServerClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (!user || authError) {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Usuario no autenticado'] },
    };
  }

  const { data: profile } = await supabase.from('profiles').select('shop_id').eq('id', user.id).single();

  if (!profile) {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Perfil no encontrado'] },
    };
  }

  console.log('Product ' + productId + ' shop: ' + profile.shop_id);

  // 2. Eliminar el producto asegurando que pertenece al vendedor
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('shop_id', profile.shop_id) // SEGURIDAD: Solo borra si el dueño es el usuario actual

  if (error) {
    return { success: false, message: "No se pudo eliminar el producto" }
  }

  revalidatePath('/dashboard/productos');

  return {
    success: true,
    message: "Producto eliminado correctamente"
  };
}