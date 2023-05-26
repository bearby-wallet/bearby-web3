import { OperationsType } from "config/operations";
import { KeyValue } from "types/general";
import { CallParam } from "types/massa";
export declare class Transaction {
    fee?: string;
    gasPrice?: number;
    gasLimit?: number;
    coins?: string;
    contract?: string;
    functionName?: string;
    parameter?: CallParam[];
    recipient?: string;
    datastore?: KeyValue<string>;
    readonly type: OperationsType;
    readonly amount: string;
    get payload(): any;
    constructor(type: OperationsType, amount: string, recipient?: string, parameter?: CallParam[], contract?: string, functionName?: string, datastore?: KeyValue<string>);
}
//# sourceMappingURL=transaction.d.ts.map