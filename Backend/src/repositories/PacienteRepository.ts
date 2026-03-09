import { AppDataSource } from "../config/dataSource";
import { Paciente } from "../entities/Paciente";

export class PacienteRepository {
  private repo = AppDataSource.getRepository(Paciente);

   async findById(id: number): Promise<Paciente | null> {
    if (!id) return null;

    return await this.repo.findOne({
      where: { id }
    });
  }

  async findByUsuarioId(usuarioId: number): Promise<Paciente | null> {
  return await this.repo.findOne({
    where: {
      usuario: {
        id: usuarioId
      }
    }
  });
}
}