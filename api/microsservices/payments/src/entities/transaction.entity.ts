import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { TransactionTypeEntity } from './transaction-type.entity';

@Entity({ name: 'transaction' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Column({ name: 'id_transaction_type', type: 'integer' })
  idTransactionType: number;

  @ManyToOne(() => TransactionTypeEntity, (transactionType) => transactionType, { eager: true })
  @JoinColumn({ name: 'id_transaction_type' })
  transactionType: TransactionTypeEntity;

  @Column()
  price: string;

  @Column({ name: 'id_transaction_details' })
  idTransactionDetails: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
