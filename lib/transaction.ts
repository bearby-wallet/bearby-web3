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
  parameters?: CallParam[] | Uint8Array;
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
    parameters?: CallParam[] | Uint8Array,
    contract?: string,
    functionName?: string
  ) {
    this.type = type;
    this.amount = String(amount);
    this.recipient = recipient;
    this.contract = contract;
    this.functionName = functionName;

    if (isArrayOfNumbers(parameters)) {
      this.parameters = parameters;
    } else if (isArrayOfMyObjects(parameters)) {
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
}

// TODO: move to utils
function isArrayOfNumbers(input: any): input is number[] {
  return (
    Array.isArray(input) && input.every((item) => typeof item === "number")
  );
}

function isArrayOfMyObjects(input: any): input is CallParam[] {
  return (
    Array.isArray(input) &&
    input.every(
      (item) => typeof item === "object" && "type" in item && "value" in item
    )
  );
}
