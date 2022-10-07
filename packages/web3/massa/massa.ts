import { JsonRPCResponseNodeStatus } from "types";
import { ContentProvider } from "./provider";
import { JsonRPCRequestMethods } from 'config/rpc-methods';


export class Massa {
  readonly #provider: ContentProvider;

  constructor(provider: ContentProvider) {
    this.#provider = provider;
  }

  async getNodesStatus() {
    const method = JsonRPCRequestMethods.GET_STATUS;
  }

  async getAddresses() {
    const method = JsonRPCRequestMethods.GET_ADDRESSES;
  }

  async getBlocks() {
    const method = JsonRPCRequestMethods.GET_BLOCKS;
  }

  async getOperations() {
    const method = JsonRPCRequestMethods.GET_OPERATIONS;
  }

  async getStakers() {
    const method = JsonRPCRequestMethods.GET_STAKERS;
  }

  async getEndorsements() {
    const method = JsonRPCRequestMethods.GET_ENDORSEMENTS;
  }

  async getCliques() {
    const method = JsonRPCRequestMethods.GET_CLIQUES;
  }

  async getFilteredSCOutputEvent() {
    const method = JsonRPCRequestMethods.GET_FILTERED_SC_OUTPUT_EVENT;
  }

  async executeReadOlyBytecode() {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_BYTECODE;
  }

  async executeReadOnlyCall() {
    const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_CALL;
  }

  async getDatastoreEntries() {
    const method = JsonRPCRequestMethods.GET_DATASTORE_ENTRIES;
  }
}
