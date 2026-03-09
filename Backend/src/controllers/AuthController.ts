import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {

  private authService = new AuthService();

  // ----------------------------
  // REGISTER
  // ----------------------------
  register = async (req: Request, res: Response) => {
    try {

      const {
        nombreCompleto,
        dni,
        email,
        usuario,
        clave,
        rol
      } = req.body;

      // Validaciones básicas
      if (!nombreCompleto || !dni || !email || !usuario || !clave || !rol) {
        return res.status(400).json({
          error: "Todos los campos son obligatorios"
        });
      }

      if (!["PACIENTE", "PROFESIONAL", "ADMIN"].includes(rol)) {
        return res.status(400).json({
          error: "Rol inválido"
        });
      }

      const nuevoUsuario = await this.authService.register({
        nombreCompleto,
        dni,
        email,
        usuario,
        clave,
        rol
      });

      return res.status(201).json({
        message: "Usuario registrado correctamente",
        usuario: nuevoUsuario
      });

    } catch (error: any) {
      return res.status(400).json({
        error: error.message
      });
    }
  };

  // ----------------------------
  // LOGIN
  // ----------------------------
  login = async (req: Request, res: Response) => {
    try {

      const { usuario, clave } = req.body;

      if (!usuario || !clave) {
        return res.status(400).json({
          error: "Usuario y contraseña son obligatorios"
        });
      }
     console.log("AUTH HEADER:", req.headers.authorization);
     console.log("USER:", req.user);
      const result = await this.authService.login(usuario, clave);


      return res.status(200).json(result);

    } catch (error: any) {
      return res.status(401).json({
        error: error.message
      });
    }
  };

}