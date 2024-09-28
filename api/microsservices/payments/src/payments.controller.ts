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
      return await this.service.createPixPayment(payerInfo);
    } catch (error) {
      return { message: error.message };
    }
  }
}
