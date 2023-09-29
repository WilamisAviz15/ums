export interface MenuInterface {
  id?: number;
  name: string;
  menuKey: string;
  route: string;
  icon: string;
  menuGroupId: number;
  group?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
