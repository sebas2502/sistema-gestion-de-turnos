import { DisponibilidadRepository } from "../repositories/DisponibilidadRepository";
import { ProfesionalRepository } from "../repositories/ProfesionalRepository";
import { DisponibilidadProfesional } from "../entities/DisponibilidadProfesional";

export class DisponibilidadService {

  private repo = new DisponibilidadRepository();
  private profesionalRepo = new ProfesionalRepository();

  async crearDisponibilidad(usuarioId: number, data: any) {

    const profesional = await this.profesionalRepo.findByUsuarioId(usuarioId);

    if (!profesional) {
      throw new Error("Profesional no encontrado");
    }

    const disponibilidad = new DisponibilidadProfesional();

    disponibilidad.diaSemana = data.diaSemana;
    disponibilidad.horaDesde = data.horaDesde;
    disponibilidad.horaHasta = data.horaHasta;
    disponibilidad.duracionTurno = data.duracionTurno;
    disponibilidad.profesional = profesional;

    return this.repo.crear(disponibilidad);

  }

  async obtenerDisponibilidades(usuarioId: number) {

    const profesional = await this.profesionalRepo.findByUsuarioId(usuarioId);

    if (!profesional) {
      throw new Error("Profesional no encontrado");
    }

    return this.repo.findByProfesional(profesional.id);

  }

  async eliminarDisponibilidad(id: number) {

    return this.repo.eliminar(id);

  }

}