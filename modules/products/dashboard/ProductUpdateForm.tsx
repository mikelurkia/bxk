'use client';

import { updateProductAction } from '../products.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { initialUpdateState, Product, UpdateProduct, updateProductSchema } from '../products.schemas';
import Form from 'next/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useServerFormAction } from '@/hooks/useServerFormAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
  product: Product;
};

export function ProductUpdateForm({ product }: Props) {

  const { register, setError, formState: { errors }, reset, control } = useForm<UpdateProduct>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: product,
    mode: 'onChange',
  });

  const {state, formAction, isPending, syncServerErrors } = useServerFormAction(
    updateProductAction,
    initialUpdateState,
    () => {
      if (state?.inputs) {
        console.log("Producto en reset: " + state.inputs);
        reset(state.inputs as UpdateProduct)
      }
    }
  );

  // Sincroniza errores del servidor
  syncServerErrors(setError);

  // Hook para el manejo del formulario en el cliente
  return (
    <Form action={formAction} className="flex flex-col gap-4">
      
      <Input type="hidden" value={product.id} {...register("id")} />

      <div>
        <Label className="block text-sm mb-2">Nombre del Producto</Label>
        <Input
          {...register("name")} 
          name="name" // Importante: debe coincidir con el name de la Action
          className="border p-2 w-full" 
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

      </div>

      <div>
        <Label className="block text-sm mb-2">Descripción</Label>
        <Textarea 
          {...register("description")} 
          name="description"
          className="border p-2 w-full" 
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="active"
              checked={field.value}
              onCheckedChange={field.onChange}
              name={field.name}
            />
          )}
        />
        <Label htmlFor="active" className="text-sm font-normal cursor-pointer">
          ¿Producto activo?
        </Label>
        {errors.active && <p className="text-red-500 text-xs">{errors.active.message}</p>}
      </div>

      {/* Mensajes del Servidor */}
      {state?.errors && <p className="text-sm text-orange-600 my-2">{Object.entries(state.errors).map(([key, errors]) => (<p key={key}>{errors.join(', ')}</p>))}</p>}
      {state?.success && <p className="text-sm text-green-600 my-2">{state.message}</p>}

      <Button type="submit" variant={'default'}  disabled={isPending}>
        {isPending ? "Guardando..." : "Actualizar producto"}
      </Button>

    </Form>
  );
}