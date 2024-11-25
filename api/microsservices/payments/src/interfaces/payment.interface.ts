export interface PaymentInterface {
  id?: number;
  cpf: string;
  price: string;
  qrcode: string;
  imagemQrcode: string;
  linkVisualizacao: string;
  completed: boolean;
}
