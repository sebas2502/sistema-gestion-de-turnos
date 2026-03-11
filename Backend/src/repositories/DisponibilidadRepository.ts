import { AppDataSource } from "../config/dataSource";
import { DisponibilidadProfesional } from "../entities/DisponibilidadProfesional";

export class DisponibilidadRepository {

  private repo = AppDataSource.getRepository(DisponibilidadProfesional);

  async findPorDia(profesionalId: number,diaSemana: number): Promise<DisponibilidadProfesional | null> {

    return this.repo.findOne({
      where: {
        profesional: {
          id: profesionalId
        },
        diaSemana: diaSemana
      }
    });

  }


  async crear(disponibilidad: DisponibilidadProfesional) {
    return this.repo.save(disponibilidad);
  }

  async findByProfesional(profesionalId: number) {

    return this.repo.find({
      where: {
        profesional: { id: profesionalId }
      },
      order: {
        diaSemana: "ASC",
        horaDesde: "ASC"
      }
    });

  }

   async eliminar(id: number) {

    return this.repo.delete(id);

  }
  

}