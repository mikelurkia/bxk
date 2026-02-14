import * as z from 'zod';
import { ServerFormState } from '@/hooks/useServerFormAction';

export const authSchema = z.object({
  email: z.email({ message: "Introduce un email válido." }).nonempty({ message: "El email es obligatorio." }),
  password: z.string().nonempty({ message: "La contraseña es obligatoria." }).min(4, { message: "La contraseña debe tener al menos 4 caracteres." }),
});

export type AuthInput = z.infer<typeof authSchema>;
export type FormState = ServerFormState<AuthInput>;

export const initialState: FormState = {
  success: false,
  message: '',
  errors: undefined,
  inputs: {
    email: '',
    password: '',
  },
}