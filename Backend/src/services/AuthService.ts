import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { Usuario } from "../entities/Usuario";

export class AuthService {

  private usuarioRepo = new UsuarioRepository();

  // ---------------------------------
  // REGISTER
  // ---------------------------------
  async register(data: Partial<Usuario>) {

    const { usuario, email, clave } = data;

    // Verificar usuario duplicado
    const usuarioExistente = await this.usuarioRepo.findByUsuario(usuario!);
    if (usuarioExistente) {
      throw new Error("El nombre de usuario ya está en uso");
    }

    // Verificar email duplicado
    const emailExistente = await this.usuarioRepo.findByEmail(email!);
    if (emailExistente) {
      throw new Error("El email ya está registrado");
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(clave!, 10);

    const nuevoUsuario = this.usuarioRepo.create({
      ...data,
      clave: hashedPassword,
      activo: true
    });

    const savedUser = await this.usuarioRepo.save(nuevoUsuario);

    // Excluir clave antes de devolver
    const { clave: _, ...usuarioSinClave } = savedUser;

    return usuarioSinClave;
  }

  // ---------------------------------
  // LOGIN
  // ---------------------------------
  async login(usuario: string, clave: string) {

    const user = await this.usuarioRepo.findByUsuario(usuario);

    if (!user) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    if (!user.activo) {
      throw new Error("Usuario inactivo");
    }

    const passwordValida = await bcrypt.compare(clave, user.clave);

    if (!passwordValida) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    // Generar JWT
    const token = jwt.sign(
      {
        id: user.id,
        rol: user.rol
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "8h"
      }
    );

    const { clave: _, ...usuarioSinClave } = user;

    return {
      token,
      usuario: usuarioSinClave
    };
  }
}