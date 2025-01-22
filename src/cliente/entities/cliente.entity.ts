import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  /*   @ManyToOne(() => Oportunidade, (oportunidade) => oportunidade.cliente)
       oportunidade: Oportunidade[]*/
}
