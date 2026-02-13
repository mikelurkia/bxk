'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { authSchema, FormState } from './auth.schemas';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout")
  redirect(process.env.NEXT_PUBLIC_URL!);
}

export async function loginAction(_: any, formData: FormData): Promise<FormState> {
  
  const supabase = await createSupabaseServerClient();

  const rawData = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const validatedFields = authSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Error de validación",
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }
  
  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    return {
      success: false,
      message: "Error de validación",
      errors: { general: ['Credenciales inválidas'] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }

  console.log("Login exitoso, revalidando path...");

  revalidatePath("/", "layout")
  redirect('/');

}