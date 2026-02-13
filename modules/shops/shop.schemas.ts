import * as z from 'zod';

export const shopSchema = z.object({
  id: z.string().uuid(),
  zone_id: z.string().nullable(),
  name: z.string().min(2).max(255),
  slug: z.string().min(2).max(255),
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
  created_at: true,
  zone_id: true,
});

export type PublicShop = z.infer<typeof publicShopSchema>;
export type Shop = z.infer<typeof shopSchema>;

// Tipo para el estado del formulario
export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Shop;
};

export const initialState: FormState = {
  success: false,
  message: '',
  errors: undefined,
  inputs: {
    id: '',
    zone_id: null,
    name: '',
    slug: '',
    description: '',
    address: '',
    phone: '',
    whatsapp: '',
    instagram: '',
    active: true,
    created_at: '',
  },
}