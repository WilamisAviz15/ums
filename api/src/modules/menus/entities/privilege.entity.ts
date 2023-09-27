import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ActionsMenuEntity } from '../../actions/entities/actions-menu.entity';

@Entity({ name: 'privileges' })
export class PrivilegeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'action_menu_id' })
  actionMenuId: number;

  @ManyToOne(() => ActionsMenuEntity, (actionsMenu) => actionsMenu.privileges)
  @JoinColumn({ name: 'action_menu_id' })
  actionsMenus: ActionsMenuEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
