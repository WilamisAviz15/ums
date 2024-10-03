import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentsService } from './payments.service';
import { GeneratePixPaymentDto } from './dto/generate-pix-payment.dto';

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
      return await this.service.createPixPayment(payerInfo);
    } catch (error) {
      return { message: error.message };
    }
  }
}
