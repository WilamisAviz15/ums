import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SubMealInterface } from '../../../modules/submeals/interfaces/submeal.inteface';

@Entity({ name: 'meals' })
export class MealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  submeals?: SubMealInterface[];

  @Column()
  price: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
