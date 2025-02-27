import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Oportunidade } from '../../oportunidade/entities/oportunidade.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_cliente' })
export class Cliente {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column({ length: 15, nullable: false })
  @ApiProperty()
  telefone: string;

  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 5000, nullable: true })
  @ApiProperty()
  foto: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  historico: string;

  @Column({ type: Date })
  @ApiProperty()
  data_inscricao: Date;

  @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente)
  @ApiProperty({ type: () => Oportunidade, isArray: true })
  oportunidade: Oportunidade;
}
