import { OperationsType } from "config/operations";
import { CallParam } from "types/massa";


export class Transaction {
  fee?: string;
  gasPrice?: string;
  gasLimit?: string;

  coins?: string;
  maxCoins?: string;
  contract?: string;
  functionName?: string;
  parameter?: CallParam[];
  recipient?: string;
  datastore?: Map<Uint8Array, Uint8Array>;

  readonly type: OperationsType;
  readonly amount: string;

  get payload() {
    return JSON.parse(
      JSON.stringify({
        type: this.type,
        amount: this.amount,
        fee: this.fee,
        gasPrice: this.gasPrice,
        gasLimit: this.gasLimit,
        coins: String(this.coins),
        maxCoins: this.maxCoins,
        code: this.contract,
        func: this.functionName,
        params: this.parameter,
        toAddr: this.recipient || this.contract,
        datastore: this.datastore
      })
    );
  }

  constructor(
    type: OperationsType,
    amount: string,
    recipient?: string,
    parameter?: CallParam[],
    contract?: string,
    functionName?: string,
    datastore?: Map<Uint8Array, Uint8Array>
  ) {
    this.type = type;
    this.amount = String(amount);
    this.recipient = recipient;
    this.parameter = parameter || [];
    this.contract = contract;
    this.functionName = functionName;
    this.datastore = datastore;
  }
}
