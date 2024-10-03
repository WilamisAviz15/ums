import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MealEntity } from '../../../modules/meals/entities/meal.entity';

@Entity({ name: 'menu_meal' })
export class MenuMealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  date: Date;

  @Column({ name: 'meal_id' })
  mealId: number;

  @OneToOne(() => MealEntity)
  @JoinColumn({ name: 'meal_id', referencedColumnName: 'id' })
  meal: MealEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
