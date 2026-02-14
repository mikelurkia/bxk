'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader,SheetTitle,SheetTrigger, } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ProductCreateForm } from '@/modules/products/dashboard/ProductCreateForm';

export function ProductCreateSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Nuevo producto</Button>
      </SheetTrigger>
      <SheetContent className='p-5'>
        <SheetHeader>
          <SheetTitle>Nuevo producto</SheetTitle>
        </SheetHeader>
        <ProductCreateForm />
      </SheetContent>
    </Sheet>
  );
}
