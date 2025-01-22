import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Oportunidade } from '../../oportunidade/entities/oportunidade.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @IsEmail()
  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ length: 1000 })
  foto: string;

  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.usuario)
  oportunidade: Oportunidade;
}
