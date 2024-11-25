import { Body, Controller, Get, Param, Post } from '@nestjs/common/decorators';

import { PaymentService } from './payments.service';
import { GeneratePixPayment } from './interfaces/generate-pix-payment';

@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post('token')
  getEfiToken() {
    return this.service.getEfiToken();
  }

  @Post('generate')
  generatePaymentPix(@Body() data: GeneratePixPayment) {
    return this.service.generatePaymentPix(data);
  }

  @Get('transactions/:cpf')
  getTransactionsByCpf(@Param('cpf') cpf: string) {
    return this.service.getTransactionsByCpf(cpf);
  }

  @Get('transactions/balance/:cpf')
  getBalanceByCpf(@Param('cpf') cpf: string) {
    return this.service.getBalanceByCpf(cpf);
  }
}
