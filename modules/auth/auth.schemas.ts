import * as z from 'zod';
import { ServerFormState } from '@/hooks/useServerFormAction';

export const authSchema = z.object({
  email: z.string().nonempty({ message: 'login.validation.emailRequired' }).email({ message: 'login.validation.emailInvalid' }),
  password: z.string().nonempty({ message: 'login.validation.passwordRequired' }),
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