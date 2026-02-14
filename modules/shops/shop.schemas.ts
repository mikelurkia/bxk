import { ServerFormState } from '@/hooks/useServerFormAction';
import { Update } from 'next/dist/build/swc/types';
import * as z from 'zod';

export const shopSchema = z.object({
  id: z.string().uuid(),
  zone_id: z.string().nullable(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(255, "El nombre no puede superar los 2 caracteres").nonempty("El nombre no puede ser nulo"),
  slug: z.string().min(2, "El slug debe tener al menos 10 caracteres").max(255, "El slug no puede superar los 255 caracteres").nonempty("El slug no puede ser nulo"),
  description: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  whatsapp: z.string().nullable(),
  instagram: z.string().nullable(),
  active: z.boolean(),
  created_at: z.string(),
});

export const publicShopSchema = shopSchema.omit({
  zone_id: true,
  active: true,
  created_at: true,
});

export const createShopSchema = shopSchema.omit({ 
  id: true,
  created_at: true, 
})

export const updateShopSchema = shopSchema.partial({
  id: true,
  zone_id: true,
  created_at: true,
});

export type Shop = z.infer<typeof shopSchema>;
export type PublicShop = z.infer<typeof publicShopSchema>;
export type CreateShop = z.infer<typeof createShopSchema>;
export type UpdateShop = z.infer<typeof updateShopSchema>;

export type UpdateFormState = ServerFormState<UpdateShop>;
export type CreateFormState = ServerFormState<CreateShop>;

export const initialCreateState: CreateFormState = {
  success: false,
  message: '',
  errors: undefined,
  inputs: {
    name: '',
    zone_id: '',
    slug: '',
    description: '',
    address: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    active: true,
  },
}

export const initialUpdateState: UpdateFormState = {
  success: false,
  message: '',
  errors: undefined,
  inputs: {
    id: '',
    zone_id: '',
    name: '',
    slug: '',
    description: '',
    address: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    active: true,
  },
}