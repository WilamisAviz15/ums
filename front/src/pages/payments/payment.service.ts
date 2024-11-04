import http from "../../shared/services/axios";
import { TransactionInterface } from "./interfaces/transaction.interface";

class PaymentService {
  constructor() {}

  async httpGet(cpf: string): Promise<TransactionInterface[]> {
    const response = await http.get<TransactionInterface[], any>(`payments/transactions/${cpf}`);
    return response.data;
  }

  async httpGetBalance(cpf: string) {
    const response = await http.get<string, any>(`payments/transactions/balance/${cpf}`);
    return response.data;
  }
}

export default new PaymentService();
