import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_oportunidades' })
export class Oportunidade {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  valor: number;

  @UpdateDateColumn()
  abertura: Date;

  @IsNotEmpty()
  @Column({ type: Date, nullable: false })
  termino: Date;

  @IsNotEmpty()
  @IsIn(['aberta', 'perdida', 'fechada'])
  @Column({ nullable: false })
  status: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.oportunidade)
  cliente: Cliente;

  @ManyToOne(() => Usuario, (usuario) => usuario.oportunidade)
  usuario: Usuario;
}
