import { EspecialidadRepository } from "../repositories/EspecialidadRepository";
import { Especialidad } from "../entities/Especialidad";


export class EspecialidadService{
    private especialidadRepo = new EspecialidadRepository();


    async getEspecialidades() : Promise<Especialidad[] | null> {
    const especialidades = await this.especialidadRepo.findAll();
    return especialidades;
   } 

}