import { Usuario } from "../model/Usuario";
import { UsuarioDTO, toUsuarioDTO } from "../dto/usuarioDto";
import { validarUsuario } from '../utils/validarUsuario';
import { addUsuario, findUsuarioByEmail } from '../repository/usuarioRepositorio';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type ResultadoRegistro =
  | { success: true; usuario: UsuarioDTO }
  | { error: number; message: string };

type ResultadoLogin =
  | { success: true; usuario: UsuarioDTO; token: string }
  | { error: number; message: string };

export const crearUsuario = async (usuario: Usuario): Promise<ResultadoRegistro> => {
  if (!validarUsuario(usuario)) {
    return { error: 400, message: 'Datos no validos' };
  }

  const usuarioExistente = await findUsuarioByEmail(usuario.email);
  if (usuarioExistente) {
    return { error: 409, message: 'El email ya registrado' };
  }

  const contraseniaHashed = bcrypt.hashSync(usuario.contrasenia, 10);
  usuario.contrasenia = contraseniaHashed;

  await addUsuario(usuario);

  const usuarioDTO = toUsuarioDTO(usuario);

  return { success: true, usuario: usuarioDTO };
};

export const loginUsuario = async (
  email: string,
  contrasenia: string
): Promise<ResultadoLogin> => {
  const usuario = await findUsuarioByEmail(email);
  if (!usuario) {
    return { error: 404, message: 'Usuario no encontrado' };
  }

  const esValida = bcrypt.compareSync(contrasenia, usuario.contrasenia);
  if (!esValida) {
    return { error: 401, message: 'Contrasenia incorrecta' };
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario,
      roles: usuario.roles,
    },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: '1h' }
  );

  const usuarioDTO = toUsuarioDTO(usuario);

  return { success: true, usuario: usuarioDTO, token };
};
