import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn
} from "typeorm";

import { Especialidad } from "./Especialidad";
import { Usuario } from "./Usuario";
import { DisponibilidadProfesional } from "./DisponibilidadProfesional";
import { Turno } from "./Turno";

@Entity()
export class Profesional {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  matricula!: string;

  @ManyToOne(() => Especialidad)
  @JoinColumn({ name: "especialidad_id" })
  especialidad!: Especialidad;

  @OneToOne(() => Usuario, usuario => usuario.profesional)
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;

  @OneToMany(() => DisponibilidadProfesional, d => d.profesional)
  disponibilidades!: DisponibilidadProfesional[];

  @OneToMany(() => Turno, turno => turno.profesional)
  turnos!: Turno[];

}