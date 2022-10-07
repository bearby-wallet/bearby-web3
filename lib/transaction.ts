import { OperationsType } from "config/operations";
import { toHex } from "./hex";


export class Transaction {
  fee?: string;
  gasPrice?: number;
  gasLimit?: number;

  coins?: number;
  contract?: string;
  functionName?: string;
  parameter?: object;
  parallelCoins?: string;
  sequentialCoins?: string;
  recipient?: string;

  readonly type: OperationsType;
  readonly amount: string;

  constructor(
    type: OperationsType,
    amount: string,
    recipient?: string,
    parameter?: object,
    contract?: Uint8Array,
    functionName?: string
  ) {
    this.type = type;
    this.amount = amount;
    this.recipient = recipient;
    this.parameter = parameter;
    this.contract = contract ? toHex(contract) : contract;
    this.functionName = functionName;
  }
}
