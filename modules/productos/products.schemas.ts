import * as z from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  active: z.boolean(),
  name: z.string().nonempty("El nombre no puede ser nulo").min(10, "El nombre debe tener al menos 10 caracteres").max(255, "El nombre no puede superar los 255 caracteres"),
  description: z.string().nullable(),
  slug: z.string().nonempty("El slug no puede ser nulo").min(10,"El slug debe tener al menos 10 caracteres").max(255, "El slug no puede tener superar los 255 cracteres"),
});

export const publicProductSchema = productSchema.omit({
});

export const createProductSchema = productSchema.omit({ 
  id: true,
})

export const updateProductSchema = productSchema.omit({ 
})

export type Product       = z.infer<typeof productSchema>;
export type PublicProduct = z.infer<typeof publicProductSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;

// Tipo para el estado del formulario
export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  inputs?: Product;
};

export const initialState: FormState = {
  success: false,
  message: '',
  errors: undefined,
  inputs: {
    id: '',
    name: '',
    description: '',
    active: true,
    slug: '',
  },
}