import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Oportunidade } from '../../oportunidade/entities/oportunidade.entity';

@Entity({ name: 'tb_cliente' })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 15, nullable: false })
  telefone: string;

  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  email: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 5000, nullable: true })
  foto: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  historico: string;

  @Column({ type: Date })
  data_inscricao: Date;

  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente)
  oportunidade: Oportunidade;
}
