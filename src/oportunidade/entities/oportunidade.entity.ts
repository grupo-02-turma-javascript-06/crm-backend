import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { IsDateString, IsIn, IsNotEmpty } from 'class-validator';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_oportunidades' })
export class Oportunidade {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  @ApiProperty()
  valor: number;

  @Column({ type: Date })
  @ApiProperty()
  abertura: Date;

  @UpdateDateColumn()
  @ApiProperty()
  data_atualizacao: Date;

  @IsNotEmpty()
  @IsDateString()
  @Column({ type: Date, nullable: false })
  @ApiProperty()
  termino: Date;

  @IsNotEmpty()
  @IsIn(['aberta', 'perdida', 'fechada'])
  @Column({ nullable: false })
  @ApiProperty()
  status: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.oportunidade)
  @ApiProperty({ type: () => Cliente })
  cliente: Cliente;
}
