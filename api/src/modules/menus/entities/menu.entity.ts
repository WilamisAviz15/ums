import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MenusGroupEntity } from '../../menus-groups/entities/menus-group.entity';
import { ActionsMenuEntity } from '../../actions/entities/actions-menu.entity';

@Entity({ name: 'menus' })
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ name: 'menu_key' })
  menuKey: string;

  @Column()
  route: string;

  @Column()
  icon: string;

  @Column({ name: 'menu_group_id' })
  menuGroupId: number;

  @OneToOne(() => MenusGroupEntity)
  @JoinColumn({ name: 'menu_group_id', referencedColumnName: 'id' })
  group: MenusGroupEntity;

  @OneToMany(() => ActionsMenuEntity, (actionsMenu) => actionsMenu.menu, {
    cascade: true,
  })
  @JoinColumn({ name: 'action_id' })
  actionsMenus: ActionsMenuEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
