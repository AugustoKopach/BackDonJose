import { ObjectId } from "mongodb";

export type Usuario = {
    id : string;
    nombreUsuario: string;
    email: string;
    contrasenia: string;
    roles: ('usuario' | 'admin')[];
}