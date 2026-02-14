import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '../products.schemas';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { ProductDeleteDialog } from './ProductDeleteDialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export function ProductTable({
  products,
}: {
  products: Product[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Público</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.slug}</TableCell>
            <TableCell>
              {p.active ? <p>Activo</p> : <p className="text-red-500 font-bold">Inactivo</p>}
            </TableCell>
            <TableCell>
              <a key={p.id} href={`/products/${p.id}/`} className="text-blue-600">
              <Button variant="ghost" size="icon" className="hover:text-blue-600 hover:bg-primary/10">
                <Edit className="h-4 w-4" />
              </Button>
              </a>
              <ProductDeleteDialog productId={p.id} />
            </TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
