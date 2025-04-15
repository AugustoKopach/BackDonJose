import { Producto } from "../model/Pruducto";
import { addProducto, findProductoById, updateProducto, deleteProducto, getAllProductos } from "../repository/productoRepository";

export const crearProducto = async (producto: Producto): Promise<{ success: boolean; producto: Producto } | { error: number; message: string }> => {
  if (!producto.nombre || !producto.descripcion || producto.precio <= 0 || producto.stock < 0) {
    return { error: 400, message: "Datos del producto inválidos" };
  }

  await addProducto(producto);
  return { success: true, producto };
};

export const obtenerProductoPorId = async (id: string): Promise<Producto | null> => {
  return await findProductoById(id);
};

export const obtenerTodosLosProductos = async (): Promise<Producto[]> => {
  return await getAllProductos();
};

export const actualizarProducto = async (id: string, producto: Producto): Promise<{ success: boolean } | { error: number; message: string }> => {
  const productoExistente = await findProductoById(id);
  if (!productoExistente) {
    return { error: 404, message: "Producto no encontrado" };
  }

  const success = await updateProducto(id, producto);
  if (success) {
    return { success: true };
  } else {
    return { error: 500, message: "Error al actualizar el producto" };
  }
};

export const eliminarProducto = async (id: string): Promise<{ success: boolean } | { error: number; message: string }> => {
  const productoExistente = await findProductoById(id);
  if (!productoExistente) {
    return { error: 404, message: "Producto no encontrado" };
  }

  const success = await deleteProducto(id);
  if (success) {
    return { success: true };
  } else {
    return { error: 500, message: "Error al eliminar el producto" };
  }
};
