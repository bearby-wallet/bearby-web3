import { OperationsType } from "config/operations";
import { CallParam } from "types/massa";
import { TypeOf } from "./type";


export class Transaction {
  fee?: string;
  gasPrice?: string;
  gasLimit?: string;

  coins?: string;
  maxCoins?: string;
  contract?: string;
  functionName?: string;
  parameters?: CallParam[];
  recipient?: string;
  deployer?: string;

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
        maxCoins: this.maxCoins,
        code: this.contract,
        func: this.functionName,
        params: this.parameters,
        toAddr: this.recipient || this.contract,
        deployer: this.deployer
      })
    );
  }

  constructor(
    type: OperationsType,
    amount: string,
    recipient?: string,
    parameters?: CallParam[],
    contract?: string,
    functionName?: string
  ) {
    this.type = type;
    this.amount = String(amount);
    this.recipient = recipient;
    this.contract = contract;
    this.functionName = functionName;
    this.parameters = parameters || [];

    // serialize bgin params.
    this.parameters = this.parameters.map((data) => {
      if (TypeOf.isBigInt(data.value)) {
        data.value = String(data.value);
      }

      return data;
    });
  }
}
