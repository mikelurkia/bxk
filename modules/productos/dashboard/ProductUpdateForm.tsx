'use client';

import { updateProductAction } from '../products.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { initialState, OwnerProduct } from '../products.schemas';
import { useFormStatus } from 'react-dom';
import Form from 'next/form';

type Props = {
  product: OwnerProduct;
};

export function ProductUpdateForm({ product }: Props) {

  initialState.inputs = product;
  const [state, formAction] = useActionState(updateProductAction, initialState);

  return (

    <Form action={formAction} className="space-y-4">
      
      <Input type="hidden" name="id" value={state?.inputs?.id ?? ''} />

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Nombre
        </label>
        <Input
          name="name"
          defaultValue={state?.inputs?.name ?? ''}
          required
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
          defaultChecked={state?.inputs?.active ?? true}
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
          Producto actualizado correctamente
        </p>
      )}

      <SubmitButton />
    </Form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="default"
      disabled={pending}
      className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? 'Actualizando…' : 'Actualizar tienda'}
    </Button>
  );
}