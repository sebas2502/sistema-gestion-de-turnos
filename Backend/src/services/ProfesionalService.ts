import { ProfesionalRepository } from "../repositories/ProfesionalRepository";
import { Profesional } from "../entities/Profesional";


export class ProfesionalService{
    private profesionalRepo = new ProfesionalRepository();


async getProfesionales(especialidadId?: number) {

    if (especialidadId) {
      return this.profesionalRepo.findByEspecialidad(especialidadId);
    }

    return this.profesionalRepo.findAll();
  }

}