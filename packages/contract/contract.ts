import type { Wallet } from 'packages/wallet';
import type {
  DeployParams,
  EventFilterParam,
  ExecuteReadOnlyBytecodeParam,
  ExecuteReadOnlyCall,
  JsonRPCResponseExecuteReadOnlyBytecode,
  JsonRPCResponseExecuteReadOnlyCall,
  JsonRPCResponseFilteredSCOutputEvent
} from 'types';

import { ContentProvider } from 'packages/massa';
import { Transaction } from 'lib/transaction';
import { OperationsType } from 'config/operations';
import { JsonRPCRequestMethods } from 'config/rpc-methods';


export class Contract {
  readonly #provider: ContentProvider;
  readonly #wallet: Wallet;

  constructor(provider: ContentProvider, wallet: Wallet) {
    this.#provider = provider;
    this.#wallet = wallet;
  }


  async deploy(params: DeployParams) {
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

  async getFilteredSCOutputEvent(filter: EventFilterParam) {
    const method = JsonRPCRequestMethods.GET_FILTERED_SC_OUTPUT_EVENT;
    return this.#provider.send<JsonRPCResponseFilteredSCOutputEvent[]>([{
      method,
      params: [filter]
    }]);
  }

  async executeReadOlyBytecode(params: ExecuteReadOnlyBytecodeParam[]) {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_BYTECODE;
    return this.#provider.send<JsonRPCResponseExecuteReadOnlyBytecode[]>([{
      method,
      params: [params]
    }]);
  }

  async executeReadOnlyCall(params: ExecuteReadOnlyCall[]) {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_CALL;
    return this.#provider.send<JsonRPCResponseExecuteReadOnlyCall[]>([{
      method,
      params: [params]
    }]);
  }
}
