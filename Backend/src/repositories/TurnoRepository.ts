import { AppDataSource } from "../config/dataSource";
import { Turno, EstadoTurno } from "../entities/Turno";

export class TurnoRepository {

  private repo = AppDataSource.getRepository(Turno);

  // Obtener turnos reservados de un profesional en una fecha
 async findReservadosPorFecha(
  profesionalId: number,
  fecha: string
) {
  return this.repo
    .createQueryBuilder("turno")
    .where("turno.profesional_id = :profesionalId", { profesionalId })
    .andWhere("turno.fecha = :fecha", { fecha })
    .getMany();
}

  // Verificar si un paciente ya tiene turno en fecha y hora exacta
  async findPorPacienteFechaYHora(
    pacienteId: number,
    fecha: string,
    hora: string
  ): Promise<Turno | null> {

    return this.repo.findOne({
      where: {
        paciente: { id: pacienteId },
        fecha,
        hora,
        estado: EstadoTurno.CONFIRMADO
      }
    });

  }

  // Agenda completa del profesional
  async findAgendaProfesional(
    profesionalId: number,
    fecha: string
  ): Promise<Turno[]> {

    return this.repo.find({
      where: {
        profesional: { id: profesionalId },
        fecha
      },
      relations: ["paciente"],
      order: {
        hora: "ASC"
      }
    });

  }

  // Verificar si el profesional ya tiene turno en esa fecha y hora
  async findPorProfesionalFechaYHora(
    profesionalId: number,
    fecha: string,
    hora: string
  ): Promise<Turno | null> {

    return this.repo.findOne({
      where: {
        profesional: { id: profesionalId },
        fecha,
        hora,
        estado: EstadoTurno.CONFIRMADO
      }
    });

  }

  create(data: Partial<Turno>): Turno {
    return this.repo.create(data);
  }

  save(turno: Turno): Promise<Turno> {
    return this.repo.save(turno);
  }

  //GET de Todos los turnos confirmados por un paciente
  async findByPaciente(pacienteId: number) {

  return await this.repo.find({
    where: {
      paciente: { id: pacienteId }
    },
    relations: [
      "profesional",
      "profesional.usuario",
      "profesional.especialidad"
    ],
    order: {
      fecha: "ASC",
      hora: "ASC"
    }
  });

}


}