import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SubMealInterface } from '../../submeals/interfaces/submeal.inteface';
import { MealUserRoleInterface } from '../../meals-users-roles/interfaces/meal-user-role.interface';

@Entity({ name: 'meals' })
export class MealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  submeals?: SubMealInterface[];

  mealUserRoles?: MealUserRoleInterface[];

  @Column()
  price: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
