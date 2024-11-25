export interface TransactionInterface {
  id?: number;
  cpf: string;
  idTransactionType: number;
  idTransactionDetails: number;
  price: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
