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
        coins: String(this.coins),
        code: this.contract,
        func: this.functionName,
        params: JSON.stringify(this.parameter),
        toAddr: this.recipient || this.contract,
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
