import { Usuario } from "../model/Usuario";

export type UsuarioDTO = {
  id: string;
  nombreUsuario: string;
  email: string;
  roles: ('usuario' | 'admin')[];
};

export const toUsuarioDTO = (usuario: Usuario): UsuarioDTO => {
  return {
    id: usuario.id,
    nombreUsuario: usuario.nombreUsuario,
    email: usuario.email,
    roles: usuario.roles,
  };
};
