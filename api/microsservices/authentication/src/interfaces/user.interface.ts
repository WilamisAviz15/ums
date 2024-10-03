export interface UserInterface {
  id: number;
  name: string;
  email: string;
  cpf: string;
  register: string;
  password: string;
  roles?: any[];
  lastAccess?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
