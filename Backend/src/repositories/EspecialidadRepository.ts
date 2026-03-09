import { AppDataSource } from "../config/dataSource";
import { Especialidad } from "../entities/Especialidad";

export class EspecialidadRepository {
  private repo = AppDataSource.getRepository(Especialidad);

  async findAll(): Promise<Especialidad[] | null> {
    return this.repo.find();
  }
}