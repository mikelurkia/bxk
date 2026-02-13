'use client';

import { useActionState, useEffect } from 'react';
import { createProductAction } from '@/modules/productos/products.actions';
import Form from "next/form";
import { initialState, createProductSchema, CreateProduct } from '../products.schemas';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';


export function ProductoCreateForm() {

  const [state, formAction, isPending] = useActionState(createProductAction, initialState);

  // 2. Hook para el manejo del formulario en el cliente
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
  });

  // Sincronizar errores del servidor con RHF
  useEffect(() => {
    console.log("Estate: " + state);
    if (state?.errors) {
      console.log("Errores");
      Object.entries(state.errors).forEach(([field, messages]) => {
        setError(field as keyof CreateProduct, {
          type: "server",
          message: messages?.[0],
        })
      })
    }

    if (state?.success) {
      console.log("Reset");
      reset()
    }
  }, [state, setError, reset])

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
  /*

  return (
    <Form action={formAction} className="space-y-4">
      
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Nombre
        </label>
        <input
          name="name"
          defaultValue={state?.inputs?.name ?? ''}
          required
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          name="description"
          defaultValue={state?.inputs?.description ?? ''}
          rows={10}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      {state?.inputs?.active !== undefined && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            defaultChecked={state.inputs.active}
          />
          <label className="text-sm">
            Producto activo
          </label>
        </div>
      )}

      {state?.errors && (
        <div className="text-sm text-red-600">
          {Object.entries(state.errors).map(([key, errors]) => (
            <p key={key}>{errors.join(', ')}</p>
          ))}
        </div>
      )}

      {state?.success && (
        <p className="text-sm text-green-600">
          Producto creado correctamente
        </p>
      )}

      <SubmitButton />
    </Form>
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
      {pending ? 'Creando…' : 'Crear producto'}
    </button>
  );*/
}
