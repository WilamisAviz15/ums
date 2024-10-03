import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'submeals' })
export class SubMealEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'meal_id' })
  mealId: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
