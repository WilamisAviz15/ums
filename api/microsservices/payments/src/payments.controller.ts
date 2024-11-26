import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { GeneratePixPaymentDto } from './dto/generate-pix-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post('token')
  async getTokenEfiAPI() {
    try {
      return await this.service.getTokenEfiAPI();
    } catch (error) {
      return { message: error.message };
    }
  }

  @Post('generate')
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

  // @MessagePattern('create_payment')
  // async createPayment(@Body() data: PaymentInterface) {
  //   return await this.service.create(data);
  // }

  @Get('transactions/:cpf')
  async getTransactionsByCpf(@Param('cpf') cpf: string) {
    return await this.service.getTransactionsByCpf(cpf);
  }

  @Get('transactions/balance/:cpf')
  async getBalanceByCpf(@Param('cpf') cpf: string) {
    return await this.service.getBalanceByCpf(cpf);
  }
}
