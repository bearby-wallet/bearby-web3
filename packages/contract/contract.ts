import type { Wallet } from 'packages/wallet';
import type {
  CallSmartContractParams,
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

  async call(params: CallSmartContractParams) {
    const transaction = new Transaction(
      OperationsType.CallSC,
      '0',
      undefined,
      params.parameter,
      params.targetAddress,
      params.functionName
    );

    transaction.fee = String(params.fee);
    transaction.gasLimit = Number(params.maxGas);

    return this.#wallet.signTransaction(transaction);
  }

  async getFilteredSCOutputEvent(...filters: EventFilterParam[]) {
    const method = JsonRPCRequestMethods.GET_FILTERED_SC_OUTPUT_EVENT;
    const responses = await this.#provider.send<JsonRPCResponseFilteredSCOutputEvent[]>(filters.map((filter) => ({
      method,
      params: [filter]
    })));

    if (filters.length === 1) {
      return responses[0];
    }

    return responses;
  }

  async executeReadOlyBytecode(params: ExecuteReadOnlyBytecodeParam[]) {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_BYTECODE;
    return this.#provider.send<JsonRPCResponseExecuteReadOnlyBytecode[]>([{
      method,
      params: [params]
    }]);
  }

  async readSmartContract(...params: ExecuteReadOnlyCall[]) {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_CALL;
    const responses = await this.#provider.send<JsonRPCResponseExecuteReadOnlyCall[]>([{
      method,
      params: [params.map((v) => ({
        max_gas: v.maxGas,
        simulated_gas_price: String(v.simulatedGasPrice),
        target_address: v.targetAddress,
        target_function: v.targetFunction,
        parameter: v.parameter,
        caller_address: v.callerAddress || this.#wallet.account.base58
      }))]
    }]);

    if (params.length === 1) {
      return responses[0];
    }

    return responses;
  }
}
