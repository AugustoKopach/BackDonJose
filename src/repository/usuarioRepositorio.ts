import { Usuario } from "../model/Usuario";
import { db } from "../config/db";
import { ObjectId } from "mongodb";

export const addUsuario = (usuario: Usuario): void => {
  db.collection("usuarios").insertOne(usuario);
};

export const findUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
  const usuario = await db.collection("usuarios").findOne({ email });
  if (!usuario) {
    return null;
  }

  const usuarioMapped: Usuario = {
    id: usuario._id.toString(),
    nombreUsuario: usuario.nombreUsuario,
    email: usuario.email,
    contrasenia: usuario.contrasenia,
    roles: usuario.roles
  };

  return usuarioMapped;
};

export const findUsuarioById = async (id: string): Promise<Usuario | null> => {
  const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(id) });

  if (!usuario) {
    return null;
  }

  const usuarioMapped: Usuario = {
    id: usuario._id.toString(),
    nombreUsuario: usuario.nombreUsuario,
    email: usuario.email,
    contrasenia: usuario.contrasenia,
    roles: usuario.roles
  };

  return usuarioMapped;
};

export const deleteUsuario = async (id: string): Promise<boolean> => {
  const result = await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount === 1;
};
