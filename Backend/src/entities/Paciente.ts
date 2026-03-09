import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn , OneToMany} from "typeorm";
import { Usuario } from "./Usuario";
import { Turno } from "./Turno";

@Entity()
export class Paciente {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  obraSocial!: string;

  @Column({ type: "date" })
  fechaNacimiento!: Date;

  @OneToOne(() => Usuario, usuario => usuario.paciente)
  @JoinColumn()
  usuario!: Usuario;

  @OneToMany(()=> Turno,turno => turno.paciente)
  @JoinColumn()
  turnos!: Turno[]
}