import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Paciente } from "./Paciente";
import { Profesional } from "./Profesional";
import { RolUsuario } from "../utilities/RolUsuario";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombreCompleto!: string;

  @Column()
  dni!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  usuario!: string;

  @Column()
  clave!: string;

  @Column({
    type: "enum",
    enum: RolUsuario
  })
  rol!: RolUsuario;

  @Column({ default: true })
  activo!: boolean;

  @OneToOne(() => Paciente, paciente => paciente.usuario)
  paciente!: Paciente;

  @OneToOne(() => Profesional, profesional => profesional.usuario)
  profesional!: Profesional;

}