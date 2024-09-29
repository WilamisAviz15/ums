import http from "../../shared/services/axios";

class ModalPaymentService {
  constructor() {}

  async httpPost(data: { name: string; cpf: string; price: string }): Promise<any> {
    const response = await http.post<any, any>("payments/generate", { data });
    return response.data;
  }
}

export default new ModalPaymentService();
