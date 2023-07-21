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
    parameters?: CallParam[];
    recipient?: string;
    deployer?: string;
    readonly type: OperationsType;
    readonly amount: string;
    get payload(): any;
    constructor(type: OperationsType, amount: string, recipient?: string, parameters?: CallParam[], contract?: string, functionName?: string);
}
//# sourceMappingURL=transaction.d.ts.map