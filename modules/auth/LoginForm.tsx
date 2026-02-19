'use client'

import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import { loginAction } from '@/modules/auth/auth.actions'
import { AuthInput, authSchema, initialState } from '@/modules/auth/auth.schemas'
import Form from 'next/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useServerFormAction } from '@/hooks/useServerFormAction'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function LoginForm() {

  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<AuthInput>({
    resolver: zodResolver(authSchema),
    mode: 'onChange',
  });

  const {state, formAction, isPending, syncServerErrors } = useServerFormAction(
    loginAction,
    initialState,
    () => reset() // Se ejecuta cuando el servidor responde success: true
  );

  // Sincroniza errores del servidor
  syncServerErrors(setError);

  const t = useTranslations('auth');
  const locale = useLocale();

  console.log('Locale actual:', locale);
  
  return (
    
    <Card className="w-full max-w-sm">

      <CardHeader>
          <CardTitle>{t('login.title')}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {t('login.description')}
          </p>
      </CardHeader>

      <CardContent className="space-y-4">

        <Form action={formAction} className="space-y-4">
          
          <div className="space-y-1">
            <Label className="text-sm font-medium">{t('login.email')}</Label>
            <Input
              {...register("email")} 
              name="email"
              className="border p-2 w-full" 
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <Label className="text-sm font-medium">
              {t('login.password')}
            </Label>
            <Input
              {...register("password")} 
              type="password"
              name="password"
              className="border p-2 w-full" 
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
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
              {t('login.success')}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="block w-full disabled:opacity-50"
          >
            {isPending ? t('login.loading') : t('login.submit')}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}