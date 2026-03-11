import { Turno, EstadoTurno } from "../entities/Turno";
import { TurnoRepository } from "../repositories/TurnoRepository";
import { DisponibilidadRepository } from "../repositories/DisponibilidadRepository";
import { ProfesionalRepository } from "../repositories/ProfesionalRepository";
import { PacienteRepository } from "../repositories/PacienteRepository";

export class TurnoService {

  private turnoRepo = new TurnoRepository();
  private disponibilidadRepo = new DisponibilidadRepository();
  private profesionalRepo = new ProfesionalRepository();
  private pacienteRepo = new PacienteRepository();

  // -------------------------------------
  // Obtener horarios disponibles
  // -------------------------------------
  async getHorariosDisponibles(
    profesionalId: number,
    fecha: string
  ): Promise<string[]> {

    const diaSemana = this.calcularDiaSemana(fecha);

    const disponibilidad =
      await this.disponibilidadRepo.findPorDia(profesionalId, diaSemana);

    if (!disponibilidad) return [];

    const turnosReservados =
      await this.turnoRepo.findReservadosPorFecha(profesionalId, fecha);

    const horasOcupadas = turnosReservados.map(t => t.hora.slice(0,5));


    return this.generarHorarios(
      disponibilidad.horaDesde,
      disponibilidad.horaHasta,
      disponibilidad.duracionTurno,
      horasOcupadas
    );
  }

  // -------------------------------------
  // Reservar turno
  // -------------------------------------
  async reservarTurno(
    pacienteUsuarioId: number,
    profesionalId: number,
    fecha: string,
    hora: string
  ): Promise<Turno> {

    const profesional = await this.profesionalRepo.findById(profesionalId);
    if (!profesional) throw new Error("Profesional no encontrado");

    const paciente = await this.pacienteRepo.findByUsuarioId(pacienteUsuarioId);
    if (!paciente) throw new Error("Paciente no encontrado");

    const turnoPaciente =
      await this.turnoRepo.findPorPacienteFechaYHora(paciente.id, fecha, hora);

    if (turnoPaciente)
      throw new Error("El paciente ya tiene un turno en esa fecha y hora");

    const turnoProfesional =
      await this.turnoRepo.findPorProfesionalFechaYHora(profesional.id, fecha, hora);

    if (turnoProfesional)
      throw new Error("El profesional ya tiene un turno en esa fecha y hora");

    const horariosDisponibles =
      await this.getHorariosDisponibles(profesionalId, fecha);

    if (!horariosDisponibles.includes(hora))
      throw new Error("El horario ya no está disponible");

    const turno = this.turnoRepo.create({
      fecha,
      hora,
      estado: EstadoTurno.CONFIRMADO,
      profesional,
      paciente
    });

    return this.turnoRepo.save(turno);
  }

  // -------------------------------------
  // Agenda del profesional
  // -------------------------------------
async getAgendaProfesional(usuarioId: number, fecha: string) {
  console.log("Usuario: ",usuarioId);

  const profesional =
    await this.profesionalRepo.findByUsuarioId(usuarioId);
console.log("profesional:", profesional);
  if (!profesional) {
    throw new Error("Profesional no encontrado");
  }

  const agenda =
    await this.turnoRepo.findAgendaProfesional(
      profesional.id,
      fecha
    );

  return agenda;

}

async marcarTurnoAtendido(turnoId: number): Promise<Turno> {

  const turno = await this.turnoRepo.marcarComoAtendido(turnoId);

  if (!turno) {
    throw new Error("Turno no encontrado");
  }

  return turno;
}





  // -------------------------------------
  // UTILIDADES
  // -------------------------------------

  private calcularDiaSemana(fecha: string): number {
    const [year, month, day] = fecha.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDay(); // 0-6 (domingo a sábado)
  }

  private generarHorarios(
    desde: string,
    hasta: string,
    duracion: number,
    ocupados: string[]
  ): string[] {

    const horarios: string[] = [];

    let actual = this.toMinutes(desde);
    const fin = this.toMinutes(hasta);

    while (actual + duracion <= fin) {

      const horaStr = this.toHora(actual);

      if (!ocupados.includes(horaStr)) {
        horarios.push(horaStr);
      }

      actual += duracion;
    }

    return horarios;
  }

  private toMinutes(hora: string): number {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  }

  private toHora(min: number): string {
    const h = Math.floor(min / 60).toString().padStart(2, "0");
    const m = (min % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  }


  async getMisTurnos(usuarioId: number) : Promise<Turno[]> {
   
  const paciente = await this.pacienteRepo.findByUsuarioId(usuarioId);  
   if (!paciente) {
    throw new Error("Paciente no encontrado");
  }
   const turnos = await this.turnoRepo.findByPaciente(paciente.id);

  return turnos;

}

async cancelarTurno(turnoId:number , usuarioId:number){
  const paciente = await this.pacienteRepo.findByUsuarioId(usuarioId);
  const turno = await this.turnoRepo.findById(turnoId);

  if(!turno){
    throw new Error("No se encontró el turno")
  }

    if (turno.paciente?.id !== paciente?.id) {
      throw new Error("No autorizado");
  }

  turno.estado = EstadoTurno.CANCELADO;

  return this.turnoRepo.save(turno);
}

}