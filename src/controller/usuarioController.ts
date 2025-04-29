import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { crearUsuario, loginUsuario } from '../service/usuarioService';
import { Usuario } from '../model/Usuario';

const router = express.Router();

router.post('/registrarse', (req: Request, res: Response) => {
  const nuevoUsuario: Usuario = { ...req.body, id: uuidv4(), roles: req.body.roles || ['usuario'] };
  const resultado = crearUsuario(nuevoUsuario);

  if ('error' in resultado) {
    res.send(400)
  } else {
    res.status(201);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, contrasenia } = req.body;
  const resultado = await loginUsuario(email, contrasenia);

  if ('error' in resultado) {
    res.status(resultado.error).json({ message: resultado.message });
  } else {
    res.json({ message: 'Inicio de sesión exitoso', token: resultado.token });
  }
});

export default router;
