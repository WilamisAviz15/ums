import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentsService } from './payments.service';
import { GeneratePixPaymentDto } from './dto/generate-pix-payment.dto';
import { PaymentInterface } from './interfaces/payment.interface';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @MessagePattern('get_token_efipay')
  async getTokenEfiAPI() {
    try {
      return await this.service.getTokenEfiAPI();
    } catch (error) {
      return { message: error.message };
    }
  }

  @MessagePattern('generate_payment_pix')
  async createPixPayment(@Body() payerInfo: GeneratePixPaymentDto) {
    try {
      const res = await this.service.createPixPayment(payerInfo);
      if (res) {
        await this.service.saveTransaction(payerInfo, res);
      }

      return res;
    } catch (error) {
      return { message: error.message };
    }
  }

  @MessagePattern('create_payment')
  async createPayment(@Body() data: PaymentInterface) {
    return await this.service.create(data);
  }

  @MessagePattern('get_transactions_by_cpf')
  async getTransactionsByCpf(@Body() cpf: string) {
    return await this.service.getTransactionsByCpf(cpf);
  }
  @MessagePattern('get_balance_by_cpf')
  async getBalanceByCpf(@Body() cpf: string) {
    return await this.service.getBalanceByCpf(cpf);
  }
}
