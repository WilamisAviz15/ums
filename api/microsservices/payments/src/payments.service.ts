import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as https from 'https';

import { TokenEfiPayInterface } from './interfaces/token-efipay.interface';
import { environment } from './environment/environment';
import { GeneratePixPaymentDto } from './dto/generate-pix-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly http: HttpService) {}

  async getTokenEfiAPI() {
    const url = `${environment.efiApiProd}/oauth/token`;

    const credenciais = {
      client_id: process.env.EFIPAY_CLIENT_ID_PROD,
      client_secret: process.env.EFIPAY_CLIENT_SECRET_PROD,
    };

    const data = JSON.stringify({ grant_type: 'client_credentials' });
    const data_credentials = `${credenciais.client_id}:${credenciais.client_secret}`;

    const auth = Buffer.from(data_credentials).toString('base64');

    const httpsAgent = new https.Agent({
      pfx: fs.readFileSync(process.env.EFIPAY_PIX_CERT_PATH_PROD),
      passphrase: '',
    });

    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    };

    const axiosConfig = {
      headers,
      httpsAgent,
    };

    try {
      const response = await firstValueFrom(this.http.post(url, data, axiosConfig));
      return response.data;
    } catch (error) {
      console.error('Error ao obter token:', error);
      throw new Error(`Erro ao obter token: ${error.message}`);
    }
  }

  async createPixPayment(payerInfo: GeneratePixPaymentDto) {
    const token: TokenEfiPayInterface = await this.getTokenEfiAPI();

    const httpsAgent = new https.Agent({
      pfx: fs.readFileSync(process.env.EFIPAY_PIX_CERT_PATH_PROD),
      passphrase: '',
    });

    if (token.access_token) {
      const url = `${environment.efiApiProd}/v2/cob`;

      const data: GeneratePixPayment = {
        calendario: { expiracao: token.expires_in },
        devedor: { nome: payerInfo.name, cpf: payerInfo.cpf },
        valor: { original: payerInfo.price },
        chave: process.env.EFIPAY_PIX_KEY,
        solicitacaoPagador: 'Mensagem',
      };

      const headers = {
        Authorization: `Bearer ${token.access_token}`,
        'Content-Type': 'application/json',
      };

      const axiosConfig = {
        headers,
        httpsAgent,
      };

      try {
        const response = await firstValueFrom(this.http.post(url, data, axiosConfig));
        if (response.data) {
          const res = await firstValueFrom(this.http.get(`${environment.efiApiProd}/v2/loc/${response.data.loc.id}/qrcode`, axiosConfig));

          return res.data;
        }
      } catch (error) {
        // console.error('Erro na requisição:', error);
        throw new Error(`Erro na requisição: ${error.message}`);
      }
    }
  }
}
