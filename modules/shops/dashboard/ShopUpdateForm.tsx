'use client';

import { useFormStatus } from 'react-dom';
import Form from "next/form";
import { updateMyShopAction } from '@/modules/shops/shop.actions';
import { updateShopSchema, UpdateShop, initialUpdateState } from '../shop.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useServerFormAction } from '@/hooks/useServerFormAction';

type Props = {
  shop: UpdateShop
};

export function ShopUpdateForm({ shop }: Props) {

  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<UpdateShop>({
      resolver: zodResolver(updateShopSchema),
      defaultValues: shop,
      mode: 'onChange',
    });
  
    const {state, formAction, isPending, syncServerErrors } = useServerFormAction(
      updateMyShopAction,
      initialUpdateState,
      () => {
        if (state?.inputs) {
          reset(state.inputs as UpdateShop)
        }
      }
    );
  
    // Sincroniza errores del servidor
    syncServerErrors(setError);

  return (

    <Form action={formAction} className="flex flex-col gap-4">
      
      <div>
        <Label className="block text-sm mb-2">Nombre de la tienda</Label>
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

      <div>
        <Label className="block text-sm mb-2">Dirección</Label>
        <Input
          {...register("address")} 
          name="address" // Importante: debe coincidir con el name de la Action
          className="border p-2 w-full" 
        />
        {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}

      </div>

      <div>
        <Label className="block text-sm mb-2">Teléfono</Label>
        <Input
          {...register("phone")} 
          name="phone" // Importante: debe coincidir con el name de la Action
          className="border p-2 w-full" 
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
      </div>

      <div>
        <Label className="block text-sm mb-2">Whatsapp</Label>
        <Input
          {...register("whatsapp")} 
          name="whatsapp" // Importante: debe coincidir con el name de la Action
          className="border p-2 w-full" 
        />
        {errors.whatsapp && <p className="text-red-500 text-xs">{errors.whatsapp.message}</p>}
      </div>

      <div>
        <Label className="block text-sm mb-2">Instagram</Label>
        <Input
          {...register("instagram")} 
          name="instagram" // Importante: debe coincidir con el name de la Action
          className="border p-2 w-full" 
        />
        {errors.instagram && <p className="text-red-500 text-xs">{errors.instagram.message}</p>}
      </div>

      <div>
        <Label className="block text-sm mb-2">Tienda activa</Label>
        <input
          type="checkbox"
          {...register("active")} 
          name="active" // Importante: debe coincidir con el name de la Action
        />
        {errors.active && <p className="text-red-500 text-xs">{errors.active.message}</p>}
      </div>

      {/* Mensajes del Servidor */}
      {state?.errors && <p className="text-sm text-orange-600 my-2">{Object.entries(state.errors).map(([key, errors]) => (<p key={key}>{errors.join(', ')}</p>))}</p>}
      {state?.success && <p className="text-sm text-green-600 my-2">{state.message}</p>}

      <div>
        <Button type="submit" variant={'default'}  disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

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
