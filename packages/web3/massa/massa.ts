import type {
  EventFilterParam,
  ExecuteReadOnlyBytecodeParam,
  ExecuteReadOnlyCall,
  JsonRPCResponseCliques,
  JsonRPCResponseEndorsements,
  JsonRPCResponseExecuteReadOnlyBytecode,
  JsonRPCResponseExecuteReadOnlyCall,
  JsonRPCResponseFilteredSCOutputEvent,
  JsonRPCResponseNodeStatus,
  JsonRPCResponseNodeStatusAddresses,
  JsonRPCResponseStakers,
  MassaBlock,
  OperationTransaction
} from "types";

import { ContentProvider } from "./provider";
import { JsonRPCRequestMethods } from 'config/rpc-methods';


export class Massa {
  readonly #provider: ContentProvider;

  constructor(provider: ContentProvider) {
    this.#provider = provider;
  }

  async getNodesStatus() {
    const method = JsonRPCRequestMethods.GET_STATUS;
    return this.#provider.send<JsonRPCResponseNodeStatus[]>([{
      method,
      params: []
    }]);
  }

  async getAddresses(...addresses: string[]) {
    const method = JsonRPCRequestMethods.GET_ADDRESSES;
    return this.#provider.send<JsonRPCResponseNodeStatusAddresses[]>([{
      method,
      params: [addresses]
    }]);
  }

  async getBlocks(...blocks: string[]) {
    const method = JsonRPCRequestMethods.GET_BLOCKS;
    return this.#provider.send<MassaBlock[]>([{
      method,
      params: [blocks]
    }]);
  }

  async getOperations(...operations: string[]) {
    const method = JsonRPCRequestMethods.GET_OPERATIONS;
    return this.#provider.send<OperationTransaction[]>([{
      method,
      params: [operations]
    }]);
  }

  async getStakers() {
    const method = JsonRPCRequestMethods.GET_STAKERS;
    return this.#provider.send<JsonRPCResponseStakers[]>([{
      method,
      params: []
    }]);
  }

  async getEndorsements(...Ids: string[]) {
    const method = JsonRPCRequestMethods.GET_ENDORSEMENTS;
    return this.#provider.send<JsonRPCResponseEndorsements[]>([{
      method,
      params: [Ids]
    }]);
  }

  async getCliques() {
    const method = JsonRPCRequestMethods.GET_CLIQUES;
    return this.#provider.send<JsonRPCResponseCliques[]>([{
      method,
      params: []
    }]);
  }

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
