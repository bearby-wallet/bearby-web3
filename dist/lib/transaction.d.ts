import { OperationsType } from "config/operations";
import { CallParam } from "types/massa";
export declare class Transaction {
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
    get payload(): any;
    constructor(type: OperationsType, amount: string, recipient?: string, parameter?: CallParam[], contract?: string, functionName?: string, datastore?: Map<Uint8Array, Uint8Array>);
}
//# sourceMappingURL=transaction.d.ts.map