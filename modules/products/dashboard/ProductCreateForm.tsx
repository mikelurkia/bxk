'use client';

import { useServerFormAction } from '@/hooks/useServerFormAction';
import { useActionState, useEffect } from 'react';
import { createProductAction } from '@/modules/products/products.actions';
import Form from "next/form";
import { CreateProduct, createProductSchema, initialCreateState } from '../products.schemas';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function ProductCreateForm() {

  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    mode: 'onChange',
  });

  const {state, formAction, isPending, syncServerErrors } = useServerFormAction(
    createProductAction,
    initialCreateState,
    () => reset() // Se ejecuta cuando el servidor responde success: true
  );

  // Sincroniza errores del servidor
  syncServerErrors(setError);

  // Hook para el manejo del formulario en el cliente
  return (
    <Form action={formAction} className="flex flex-col gap-4">
      
      <div>
        <Label className="block text-sm mb-2">Nombre del Producto</Label>
        <Input
          {...register("name")} 
          name="name" // Importante: debe coincidir con el name de la Action
          className="border p-2 w-full text-black" 
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

      </div>

      <div>
        <Label className="block text-sm mb-2">Descripción</Label>
        <Textarea 
          {...register("description")} 
          name="description"
          className="border p-2 w-full text-black" 
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      {/* Mensajes del Servidor */}
      {state?.errors && <p className="text-sm text-orange-600 my-2">{Object.entries(state.errors).map(([key, errors]) => (<p key={key}>{errors.join(', ')}</p>))}</p>}
      {state?.success && <p className="text-sm text-green-600 my-2">{state.message}</p>}

      <Button type="submit" variant={'default'}  disabled={isPending}>
        {isPending ? "Guardando..." : "Crear Producto"}
      </Button>

    </Form>
  );
}
