import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'schedules' })
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  // @OneToOne(() => UserEntity)
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  // user: UserEntity;

  @Column({ name: 'meal_id' })
  mealId: number;

  // @OneToOne(() => MealEntity)
  // @JoinColumn({ name: 'meal_id', referencedColumnName: 'id' })
  // meal: MealEntity;

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
