export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  register: string;
  roles?: any[];
  lastAccess?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
