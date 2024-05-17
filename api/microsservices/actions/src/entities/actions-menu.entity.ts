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
import { ActionEntity } from './action.entity';

@Entity({ name: 'actions_menus' })
export class ActionsMenuEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'action_id' })
  actionId: number;

  @Column({ name: 'menu_id' })
  menuId: number;

  @OneToOne(() => ActionEntity)
  @JoinColumn({ name: 'action_id' })
  action?: ActionEntity;

  privileges?: number[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
