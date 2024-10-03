import { Body, Controller, Post } from '@nestjs/common/decorators';

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
}
