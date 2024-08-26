import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { MealInterface } from 'src/interfaces/meal.interface';
import { UserInterface } from '../interfaces/user.interface';

@Entity({ name: 'schedules' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  user?: UserInterface;

  @Column({ name: 'meal_id' })
  mealId: number;

  meal?: MealInterface;

  @CreateDateColumn({ name: 'date' })
  date: Date;

  @Column()
  used: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
