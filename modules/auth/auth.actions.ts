'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { authSchema, FormState } from './auth.schemas';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';


export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout")
  redirect(process.env.NEXT_PUBLIC_URL!);
}

export async function loginAction(_: any, formData: FormData): Promise<FormState> {

  const t = await getTranslations('Auth');
  const supabase = await createSupabaseServerClient();

  const rawData = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const validatedFields = authSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: t('login.validation.error.validation'),
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
      message: t('login.error.credentials'),
      errors: { general: [t('login.error.credentials')] },
      inputs: rawData as any, // Devolvemos lo que escribió el usuario
    };
  }
  
  revalidatePath("/", "layout")
  redirect('/');

}