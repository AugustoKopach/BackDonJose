import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export interface JwtPayload {
  id: string;
  nombreUsuario: string;
  roles: ('usuario' | 'admin')[];
}


const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta-super-segura';
const TOKEN_EXPIRATION = '1h';


export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


export const verifyPassword = async (password: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashed);
};


export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};



export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
