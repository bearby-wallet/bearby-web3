import { OperationsType } from "config/operations";
export declare class Transaction {
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
    get payload(): any;
    constructor(type: OperationsType, amount: string, recipient?: string, parameter?: object, contract?: Uint8Array, functionName?: string);
}
