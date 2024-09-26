import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'meals_users_roles' })
export class MealUserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'meal_id' })
  mealId: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
