export type Tienda = {
  id: string;
  zona_id?: string | null;
  nombre: string;
  descripcion?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  activo : boolean;
  created_at: string;
};

export type TiendaPublico = {
  id: string;
  zona_id?: string | null;
  nombre: string;
  slug?: string;
  descripcion?: string | null;
  direccion?: string | null;
  telefono?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
};

export type TiendaWithRol = {
  rol: 'vendedor' | 'admin';
  tienda_id: string;
  tienda: {
    id?: string;
    nombre?: string;
    direccion?: string;
    telefono?: string;
    whatsapp?: string;
    instagram?: string;
    slug?: string;
    activo?: boolean;
    descripcion?: string | null;
  };
};