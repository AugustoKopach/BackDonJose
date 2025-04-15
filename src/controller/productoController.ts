import express, { Request, Response } from 'express';
import { crearProducto, obtenerProductoPorId, obtenerTodosLosProductos, actualizarProducto, eliminarProducto } from '../service/productoService';
import { Producto } from '../model/Pruducto';

const router = express.Router();


router.post('/producto', async (req: Request, res: Response) => {
  const producto: Producto = req.body;
  const resultado = await crearProducto(producto);

  if ('error' in resultado) {
    res.status(resultado.error).json({ message: resultado.message });
  } else {
    res.status(201).json({ message: 'Producto creado con éxito', producto: resultado.producto });
  }
});


router.get('/producto/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const producto = await obtenerProductoPorId(id);

  if (!producto) {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    res.json(producto);
  }
});


router.get('/productos', async (_req: Request, res: Response) => {
  const productos = await obtenerTodosLosProductos();
  res.json(productos);
});


router.put('/producto/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const producto: Producto = req.body;
  const resultado = await actualizarProducto(id, producto);

  if ('error' in resultado) {
    res.status(resultado.error).json({ message: resultado.message });
  } else {
    res.json({ message: 'Producto actualizado con éxito' });
  }
});


router.delete('/producto/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultado = await eliminarProducto(id);

  if ('error' in resultado) {
    res.status(resultado.error).json({ message: resultado.message });
  } else {
    res.json({ message: 'Producto eliminado con éxito' });
  }
});

export default router;
