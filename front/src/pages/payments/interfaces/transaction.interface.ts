export interface TransactionInterface {
  id?: number;
  cpf: string;
  idTransactionType: number;
  idTransactionDetails: number;
  transactionType: { name: string };
  price: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
