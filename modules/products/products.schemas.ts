import { ServerFormState } from '@/hooks/useServerFormAction';
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
export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type CreateFormState = ServerFormState<CreateProduct>;
export type UpdateFormState = ServerFormState<UpdateProduct>;

export const initialCreateState: CreateFormState = {
  success: false,
  message: '',
  errors: undefined,
  inputs: {
    name: '',
    description: '',
    active: true,
    slug: '',
  },
}

export const initialUpdateState: UpdateFormState = {
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