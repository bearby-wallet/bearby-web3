import { OperationsType } from "config/operations";
import { CallParam } from "types/massa";
import { TypeOf } from "./type";


export class Transaction {
  fee?: string;
  gasLimit?: string;

  coins?: string;
  maxCoins?: string;
  contract?: string;
  functionName?: string;
  parameters?: CallParam[];
  unsafeParams?: Uint8Array;
  recipient?: string;
  bytecode?: string; // Bytecode to be executed (potentially deployer) (Base64 str)
  bytecodeToDeploy?: string; // Bytecode to be deployed (Base64 str)
  datastore?: Map<Uint8Array, Uint8Array>;

  readonly type: OperationsType;
  readonly amount: string;

  get payload() {
    return JSON.parse(
      JSON.stringify({
        type: this.type,
        amount: this.amount,
        fee: this.fee,
        gasLimit: this.gasLimit,
        coins: this.coins || this.amount,
        maxCoins: this.maxCoins,
        func: this.functionName,
        params: this.parameters,
        unsafeParams: this.unsafeParams ? this.#uint8ArrayToHex(this.unsafeParams) : undefined,
        toAddr: this.recipient || this.contract,
        bytecode: this.bytecode,
        bytecodeToDeploy: this.bytecodeToDeploy,
        datastore: this.datastore ? this.#serializeDatastore(this.datastore) : undefined,
      })
    );
  }

  constructor(
    type: OperationsType,
    amount: string = '0',
    recipient?: string,
    parameters?: CallParam[],
    unsafeParams?: Uint8Array,
    contract?: string,
    functionName?: string
  ) {
    this.type = type;
    this.amount = String(amount);
    this.recipient = recipient;
    this.contract = contract;
    this.functionName = functionName;
    this.parameters = parameters;
    this.unsafeParams = unsafeParams;

    if (this.parameters) {
      // serialize bgin params.
      this.parameters = this.parameters.map((data) => {
        if (TypeOf.isBigInt(data.value)) {
          data.value = String(data.value);
        }

        return data;
      });
    }
  }

  #uint8ArrayToHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  #serializeDatastore(data: Map<Uint8Array,Uint8Array>): Record<string, string> {
    const serialized: Record<string, string> = {};
    for (const [key, value] of data.entries()) {
      serialized[this.#uint8ArrayToHex(key)] = this.#uint8ArrayToHex(value);
    }
    return serialized;
  }
}
