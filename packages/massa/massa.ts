import type {
  GraphIntervalResponse,
  JsonRPCResponse,
  JsonRPCResponseCliques,
  JsonRPCResponseEndorsements,
  JsonRPCResponseNodeStatus,
  JsonRPCResponseNodeStatusAddresses,
  JsonRPCResponseStakers,
  MassaBlock,
  OperationTransaction
} from "../../types";

import { ContentProvider } from "./provider";
import { JsonRPCRequestMethods } from '../../config/rpc-methods';
import { Wallet } from "../../packages/wallet";
import { Transaction } from "../../lib/transaction";
import { OperationsType } from "../../config/operations";


export class Massa {
  readonly #provider: ContentProvider;
  readonly #wallet: Wallet;

  constructor(
    provider: ContentProvider,
    wallet: Wallet
  ) {
    this.#provider = provider;
    this.#wallet = wallet;
  }

  async getNodesStatus() {
    const method = JsonRPCRequestMethods.GET_STATUS;
    const [res] = await this.#provider.send<JsonRPCResponse<JsonRPCResponseNodeStatus>[]>([{
      method,
      params: []
    }]);

    return res;
  }

  async getAddresses(...addresses: string[]) {
    const method = JsonRPCRequestMethods.GET_ADDRESSES;
    const [res] = await this.#provider.send<JsonRPCResponse<JsonRPCResponseNodeStatusAddresses[]>[]>([{
      method,
      params: [addresses]
    }]);

    return res;
  }

  async getBlocks(...blocks: string[]) {
    const method = JsonRPCRequestMethods.GET_BLOCKS;
    const [res] = await this.#provider.send<JsonRPCResponse<MassaBlock[]>[]>([{
      method,
      params: [blocks]
    }]);

    return res;
  }

  async getGraphInterval(start: number, end: number) {
    const method = JsonRPCRequestMethods.GET_GRAPH_INTERVAL;
    const [res] = await this.#provider.send<JsonRPCResponse<GraphIntervalResponse[]>[]>([{
      method,
      params: [{
        start,
        end
      }]
    }]);

    return res;
  }

  async getOperations(...operations: string[]) {
    const method = JsonRPCRequestMethods.GET_OPERATIONS;
    const [res] = await this.#provider.send<JsonRPCResponse<OperationTransaction[]>[]>([{
      method,
      params: [operations]
    }]);

    return res;
  }

  async getStakers() {
    const method = JsonRPCRequestMethods.GET_STAKERS;
    const [res] = await this.#provider.send<JsonRPCResponse<JsonRPCResponseStakers[]>[]>([{
      method,
      params: []
    }]);

    return res;
  }

  async getEndorsements(...Ids: string[]) {
    const method = JsonRPCRequestMethods.GET_ENDORSEMENTS;
    const [res] = await this.#provider.send<JsonRPCResponse<JsonRPCResponseEndorsements[]>[]>([{
      method,
      params: [Ids]
    }]);

    return res;
  }

  async getCliques() {
    const method = JsonRPCRequestMethods.GET_CLIQUES;
    const [res] = await this.#provider.send<JsonRPCResponse<JsonRPCResponseCliques[]>[]>([{
      method,
      params: []
    }]);

    return res;
  }

  async payment(amount: string, recipient: string) {
    const transaction = new Transaction(
      OperationsType.Payment,
      amount,
      recipient
    );

    return this.#wallet.signTransaction(transaction);
  }

  async buyRolls(amount = '1') {
    const transaction = new Transaction(
      OperationsType.RollBuy,
      amount
    );

    return this.#wallet.signTransaction(transaction);
  }

  async sellRolls(amount = '1') {
    const transaction = new Transaction(
      OperationsType.RollSell,
      amount
    );

    return this.#wallet.signTransaction(transaction);
  }
}
