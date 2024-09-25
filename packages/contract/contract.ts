import { Wallet } from '../../packages/wallet';
import {
  CallSmartContractParams,
  DatastoreEntryInputParam,
  DataStoreEntryResponse,
  DeployParams,
  EventFilterParam,
  ExecuteReadOnlyBytecodeParam,
  ExecuteReadOnlyCall,
  JsonRPCResponseExecuteReadOnly,
  JsonRPCResponseFilteredSCOutputEvent
} from '../../types';

import { ContentProvider } from '../../packages/massa';
import { Transaction } from '../../lib/transaction';
import { OperationsType } from '../../config/operations';
import { JsonRPCRequestMethods } from '../../config/rpc-methods';
import { strToBytes } from '../../lib/hex';
import { ArgTypes } from 'config/args-types';

export class Contract {
  readonly #provider: ContentProvider;
  readonly #wallet: Wallet;

  readonly types = ArgTypes;

  constructor(provider: ContentProvider, wallet: Wallet) {
    this.#provider = provider;
    this.#wallet = wallet;
  }


  async deploy(params: DeployParams) {
    const transaction = new Transaction(
      OperationsType.ExecuteSC,
      '0',
      undefined,
      params.parameters,
      params.unsafeParameters,
      params.contractDataBase64,
      undefined
    );

    transaction.deployer = params.deployerBase64;
    transaction.fee = String(params.fee);
    transaction.gasLimit = String(params.maxGas);
    transaction.gasPrice = params.gasPrice ? String(params.gasPrice) : undefined;
    transaction.maxCoins = String(params.maxCoins);
    transaction.coins = String(params.coins);

    return this.#wallet.signTransaction(transaction);
  }

  async call(params: CallSmartContractParams) {
    const transaction = new Transaction(
      OperationsType.CallSC,
      '0',
      undefined,
      params.parameters,
      params.unsafeParameters,
      params.targetAddress,
      params.functionName
    );

    transaction.fee = String(params.fee);
    transaction.gasLimit = String(params.maxGas);
    transaction.coins = String(params.coins || 0);

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

  async getDatastoreEntries(...params: DatastoreEntryInputParam[]): Promise<DataStoreEntryResponse[]> {
    const method = JsonRPCRequestMethods.GET_DATASTORE_ENTRIES;
    const data = params.map((entry) => {
      const keyBytes: Uint8Array =
        typeof entry.key === 'string' ? strToBytes(entry.key) : entry.key
      return {
        key: Array.from(keyBytes),
        address: entry.address,
      }
    })
    return this.#provider.send<DataStoreEntryResponse[]>([{
      method,
      params: [data]
    }]);
  }

  async executeReadOnlyBytecode(params: ExecuteReadOnlyBytecodeParam[]) {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_BYTECODE;
    return this.#provider.send<JsonRPCResponseExecuteReadOnly[]>([{
      method,
      params: [params]
    }]);
  }

  async readSmartContract(...params: ExecuteReadOnlyCall[]) {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_CALL;
    const responses = await this.#provider.send<JsonRPCResponseExecuteReadOnly[]>([{
      method,
      params: [params.map((v) => ({
        max_gas: v.maxGas,
        target_address: v.targetAddress,
        target_function: v.targetFunction,
        parameter: v.parameter,
        caller_address: v.callerAddress || this.#wallet.account.base58
      }))]
    }]);

    return responses;
  }
}
