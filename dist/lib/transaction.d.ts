import { OperationsType } from "config/operations";
import { CallParam } from "types/massa";
export declare class Transaction {
    #private;
    fee?: string;
    gasLimit?: string;
    coins?: string;
    maxCoins?: string;
    contract?: string;
    functionName?: string;
    parameters?: CallParam[];
    unsafeParams?: Uint8Array;
    recipient?: string;
    bytecode?: string;
    bytecodeToDeploy?: string;
    datastore?: Map<Uint8Array, Uint8Array>;
    readonly type: OperationsType;
    readonly amount: string;
    get payload(): any;
    constructor(type: OperationsType, amount?: string, recipient?: string, parameters?: CallParam[], unsafeParams?: Uint8Array, contract?: string, functionName?: string);
}
//# sourceMappingURL=transaction.d.ts.map