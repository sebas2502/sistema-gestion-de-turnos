import { AppDataSource } from "../config/dataSource";
import { Profesional } from "../entities/Profesional";

export class ProfesionalRepository {
  private repo = AppDataSource.getRepository(Profesional);

   findAll() {
    return this.repo.find({
      relations: ["especialidad"]
    });
  }

  async findById(id: number): Promise<Profesional | null> {
    
    if(!id) return null;

    return await this.repo.findOne({
      where: { id },
      relations: ["especialidad","usuario"] 
    });
  }

async findByUsuarioId(usuarioId: number): Promise<Profesional | null> {

  return this.repo.findOne({
    where: {
      usuario: {
        id: usuarioId
      }
    },
    relations: ["usuario"]
  });

}

  findByEspecialidad(especialidadId: number) : Promise<Profesional[] | null> {
    return this.repo.find({
      where: {
        especialidad: {
          id: especialidadId
        }
      },
      relations: ["especialidad","usuario","disponibilidades"]
    });
  }
}