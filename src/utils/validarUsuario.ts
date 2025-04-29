import { Usuario } from "../model/Usuario";

export const validarEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export function validarNombreUsuario(nombreUsuario: string | undefined): boolean {
  if (!nombreUsuario) return false;
  return nombreUsuario.trim().length > 0;
}
export const validarContrasenia = (contrasenia: string): boolean => {
  const contraseniaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return contraseniaRegex.test(contrasenia);
};

export const validarUsuario = (usuario: Usuario): boolean => {
  return (
    validarNombreUsuario(usuario.nombreUsuario) &&
    validarEmail(usuario.email) &&
    validarContrasenia(usuario.contrasenia)
  );
};
