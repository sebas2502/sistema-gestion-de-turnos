import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { Profesional } from "./Profesional";

@Entity()
export class DisponibilidadProfesional {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  diaSemana!: number; // 0-6 (Domingo a Sábado)

  @Column({ type: "time" })
  horaDesde!: string; // "08:00"

  @Column({ type: "time" })
  horaHasta!: string; // "12:00"

  @Column({ type: "int" })
  duracionTurno!: number; // minutos

  @ManyToOne(
    () => Profesional,
    (profesional) => profesional.disponibilidades,
    { onDelete: "CASCADE" }
  )
  profesional!: Profesional;
}
