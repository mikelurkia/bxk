'use client'

import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import { useActionState } from 'react'
import { loginAction } from '@/modules/auth/auth.actions'
import { initialState } from '@/modules/auth/auth.schemas'
import Form from 'next/form'
import { useFormStatus } from 'react-dom'

export default function LoginForm() {

  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    
    <Card className="w-full max-w-sm">

      <CardHeader>
          <CardTitle>Acceso al portal de vendedores</CardTitle>
          <p className="text-muted-foreground text-sm">
            Introduce los datos para acceder a tu cuenta
          </p>
      </CardHeader>

      <CardContent className="space-y-4">

        <Form action={formAction} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Email
            </label>
            <input
              type='email'
              name="email"
              defaultValue={state?.inputs?.email ?? ''}
              required
              className="w-full rounded border px-3 py-2 my-2 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              defaultValue={state?.inputs?.password ?? ''}
              required
              className="w-full rounded border px-3 py-2 my-2 text-sm"
            />
          </div>

          {state?.errors && (
            <div className="text-sm text-red-600">
              {Object.entries(state.errors).map(([key, errors]) => (
                <p key={key}>{errors.join(', ')}</p>
              ))}
            </div>
          )}

          {state?.success && (
            <p className="text-sm text-green-600">
              Acceso concedido correctamente
            </p>
          )}

          <SubmitButton />
        </Form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? 'Accediendo…' : 'Acceder'}
    </button>
  );
}