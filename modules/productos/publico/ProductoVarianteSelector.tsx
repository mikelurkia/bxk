'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ProductoVarianteSelector({
  variantes,
}: {
  variantes: any[];
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-2">
      {variantes.map((v, i) => (
        <Button
          key={i}
          variant={
            selected === i ? 'default' : 'outline'
          }
          onClick={() => setSelected(i)}
        >
          Variante {i + 1}
        </Button>
      ))}
    </div>
  );
}
