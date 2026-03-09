import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index
} from "typeorm";

import { Profesional } from "./Profesional";
import { Paciente } from "./Paciente";

export enum EstadoTurno {
  CONFIRMADO = "confirmado",
  CANCELADO = "cancelado",
 }


@Index(["profesional", "fecha", "hora"], { unique: true })
@Entity()
export class Turno {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  fecha!: string;

  @Column({ type: "time" })
  hora!: string;

  @Column({
    type: "enum",
    enum: EstadoTurno,
    default: EstadoTurno.CONFIRMADO
  })
  estado!: EstadoTurno;

  @ManyToOne(() => Profesional, profesional => profesional.turnos)
  @JoinColumn({ name: "profesional_id" })
  profesional!: Profesional;

  @ManyToOne(() => Paciente, paciente => paciente.turnos, { nullable: true })
  @JoinColumn({ name: "paciente_id" })
  paciente!: Paciente | null;

}