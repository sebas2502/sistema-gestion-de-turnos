import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = String(process.env.SECRET_KEY); 

export const generarToken = (payload: any) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verificarToken = (token: string) => {
  return jwt.verify(token, SECRET);
};