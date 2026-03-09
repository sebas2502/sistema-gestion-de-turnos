import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { Profesional } from "./Profesional";

@Entity("especialidad")
export class Especialidad {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100, unique: true })
  nombre!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  descripcion!: string;

  @OneToMany(
    () => Profesional,
    profesional => profesional.especialidad
  )
  profesionales!: Profesional[];
}