import { OperationsType } from "config/operations";
import { KeyValue } from "types/general";


export class Transaction {
  fee?: string;
  gasPrice?: number;
  gasLimit?: number;

  coins?: string;
  contract?: string;
  functionName?: string;
  parameter?: object;
  parallelCoins?: string;
  sequentialCoins?: string;
  recipient?: string;
  datastore?: KeyValue<string>;

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
        coins: this.coins,
        code: this.contract,
        func: this.functionName,
        params: JSON.stringify(this.parameter),
        parallelCoins: this.parallelCoins,
        sequentialCoins: this.sequentialCoins,
        toAddr: this.recipient,
        datastore: this.datastore
      })
    );
  }

  constructor(
    type: OperationsType,
    amount: string,
    recipient?: string,
    parameter?: object,
    contract?: string,
    functionName?: string,
    datastore?: KeyValue<string>
  ) {
    this.type = type;
    this.amount = String(amount);
    this.recipient = recipient;
    this.parameter = parameter;
    this.contract = contract;
    this.functionName = functionName;
    this.datastore = datastore;
  }
}
