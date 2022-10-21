import type { Wallet } from 'packages/wallet';
import type { DeployParams } from 'types';

import { ContentProvider } from 'packages/massa';
import { Transaction } from 'lib/transaction';
import { OperationsType } from 'config/operations';


export class Contract {
  readonly #provider: ContentProvider;
  readonly #wallet: Wallet;

  constructor(provider: ContentProvider, wallet: Wallet) {
    this.#provider = provider;
    this.#wallet = wallet;
  }


  deploy(params: DeployParams) {
    const transaction = new Transaction(
      OperationsType.ExecuteSC,
      '0',
      undefined,
      undefined,
      params.contractDataBase64,
      undefined,
      params.datastore
    );

    transaction.fee = String(params.fee);
    transaction.gasLimit = Number(params.maxGas);
    transaction.gasPrice = Number(params.gasPrice);

    return this.#wallet.signTransaction(transaction);
  }

  call() {}

  read() {}
}
