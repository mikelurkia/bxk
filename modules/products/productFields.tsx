type Props = {
  defaultValues?: {
    nombre?: string;
    descripcion?: string | null;
    activo?: boolean;
  };
};

export function ProductoFields({ defaultValues }: Props) {
  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Nombre
        </label>
        <input
          name="nombre"
          defaultValue={defaultValues?.nombre ?? ''}
          required
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          name="descripcion"
          defaultValue={defaultValues?.descripcion ?? ''}
          rows={10}
          className="w-full rounded border px-3 py-2 text-sm"
        />
      </div>

      {defaultValues?.activo !== undefined && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="activo"
            defaultChecked={defaultValues.activo}
          />
          <label className="text-sm">
            Producto activo
          </label>
        </div>
      )}
    </>
  );
}
