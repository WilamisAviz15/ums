import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ActionEntity } from './action.entity';
// import { MenuEntity } from '../../menus/entities/menu.entity';
// import { PrivilegeEntity } from '../../menus/entities/privilege.entity';

@Entity({ name: 'actions_menus' })
export class ActionsMenuEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'action_id' })
  actionId: number;

  @Column({ name: 'menu_id' })
  menuId: number;

  // @ManyToOne(() => MenuEntity, (menu) => menu.actionsMenus)
  // @JoinColumn({ name: 'menu_id' })
  // menu?: MenuEntity;

  @OneToOne(() => ActionEntity)
  @JoinColumn({ name: 'action_id' })
  action?: ActionEntity;

  // @OneToMany(() => PrivilegeEntity, (privilege) => privilege.actionsMenus, {
  //   cascade: true,
  // })
  // privileges?: PrivilegeEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
