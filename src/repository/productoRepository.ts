import { Producto } from "../model/Pruducto";
import { db } from "../config/db";
import { ObjectId } from "mongodb";

export const addProducto = async (producto: Producto): Promise<void> => {
  await db.collection("productos").insertOne(producto);
};

export const findProductoById = async (id: string): Promise<Producto | null> => {
  const producto = await db.collection("productos").findOne({ _id: new ObjectId(id) });

  if (!producto) {
    return null;
  }

  return {
    id: producto._id.toString(),
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
  };
};

export const updateProducto = async (id: string, producto: Producto): Promise<boolean> => {
  const result = await db.collection("productos").updateOne(
    { _id: new ObjectId(id) },
    { $set: producto }
  );

  return result.modifiedCount === 1;
};

export const deleteProducto = async (id: string): Promise<boolean> => {
  const result = await db.collection("productos").deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount === 1;
};

export const getAllProductos = async (): Promise<Producto[]> => {
  const productos = await db.collection("productos").find().toArray();

  return productos.map((producto) => ({
    id: producto._id.toString(),
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
  }));
};
