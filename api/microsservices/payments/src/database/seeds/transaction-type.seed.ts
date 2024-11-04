import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { TransactionTypeEntity } from '../../entities/transaction-type.entity';

export class TransactionTypeSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(TransactionTypeEntity);
    await repository.insert([{ name: 'RECARGA_CARTEIRA' }, { name: 'PAGAMENTO_REFEICAO' }, { name: 'REEMBOLSO' }]);
  }
}
