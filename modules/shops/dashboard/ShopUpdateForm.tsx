'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import Form from "next/form";
import { updateMyShopAction } from '@/modules/shops/shop.actions';
import { initialState, OwnerShop } from '../shop.schemas';

type Props = {
  shop: OwnerShop
};

export function ShopUpdateForm({ shop }: Props) {

   // Cargamos los datos de la tienda en el estado inicial del formulario
  initialState.inputs = shop;
  const [state, formAction, pending] = useActionState(updateMyShopAction, initialState);

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

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Dirección
        </label>
        <input
          name="address"
          defaultValue={state?.inputs?.address ?? ''}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Teléfono
        </label>
        <input
          name="phone"
          defaultValue={state?.inputs?.phone ?? ''}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          WhatsApp
        </label>
        <input
          name="whatsapp"
          defaultValue={state?.inputs?.whatsapp ?? ''}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Instagram
        </label>
        <input
          name="instagram"
          defaultValue={state?.inputs?.instagram ?? ''}
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
          Tienda activa
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
          Tienda actualizada correctamente
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
      {pending ? 'Actualizando…' : 'Actualizar tienda'}
    </button>
  );
}
