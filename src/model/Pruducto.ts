import { ObjectId } from "mongodb";

export type Producto = {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
};
