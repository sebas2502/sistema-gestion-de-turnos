import { AppDataSource } from "../config/dataSource";
import { Usuario } from "../entities/Usuario";

export class UsuarioRepository {

  private repo = AppDataSource.getRepository(Usuario);

  async findById(id: number): Promise<Usuario | null> {
    return await this.repo.findOne({
      where: { id }
    });
  }

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.repo.findOne({
      where: { usuario }
    });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.repo.findOne({
      where: { email }
    });
  }

  create(data: Partial<Usuario>): Usuario {
    return this.repo.create(data);
  }

  async save(usuario: Usuario): Promise<Usuario> {
    return await this.repo.save(usuario);
  }
}