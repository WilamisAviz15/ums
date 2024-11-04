import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Column()
  price: string;

  @Column({ name: 'qr_code' })
  qrcode: string;

  @Column({ name: 'imagem_qrcode' })
  imagemQrcode: string;

  @Column({ name: 'link_visualizacao' })
  linkVisualizacao: string;

  @Column()
  completed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
