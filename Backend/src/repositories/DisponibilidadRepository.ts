import { AppDataSource } from "../config/dataSource";
import { DisponibilidadProfesional } from "../entities/DisponibilidadProfesional";

export class DisponibilidadRepository {

  private repo = AppDataSource.getRepository(DisponibilidadProfesional);

  async findPorDia(
    profesionalId: number,
    diaSemana: number
  ): Promise<DisponibilidadProfesional | null> {

    return this.repo.findOne({
      where: {
        profesional: {
          id: profesionalId
        },
        diaSemana: diaSemana
      }
    });

  }

}