interface Calendario {
  expiracao: number;
}

interface Devedor {
  cpf: string;
  nome: string;
}

interface Valor {
  original: string;
}

interface GeneratePixPayment {
  calendario: Calendario;
  devedor: Devedor;
  valor: Valor;
  chave: string;
  solicitacaoPagador: string;
}
