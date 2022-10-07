import type { EventFilterParam, ExecuteReadOnlyBytecodeParam, ExecuteReadOnlyCall, JsonRPCResponseCliques, JsonRPCResponseEndorsements, JsonRPCResponseExecuteReadOnlyBytecode, JsonRPCResponseExecuteReadOnlyCall, JsonRPCResponseFilteredSCOutputEvent, JsonRPCResponseNodeStatus, JsonRPCResponseNodeStatusAddresses, JsonRPCResponseStakers, MassaBlock, OperationTransaction } from "types";
import { ContentProvider } from "./provider";
import { Wallet } from "../wallet";
export declare class Massa {
    #private;
    constructor(provider: ContentProvider, wallet: Wallet);
    getNodesStatus(): Promise<JsonRPCResponseNodeStatus[]>;
    getAddresses(...addresses: string[]): Promise<JsonRPCResponseNodeStatusAddresses[]>;
    getBlocks(...blocks: string[]): Promise<MassaBlock[]>;
    getOperations(...operations: string[]): Promise<OperationTransaction[]>;
    getStakers(): Promise<JsonRPCResponseStakers[]>;
    getEndorsements(...Ids: string[]): Promise<JsonRPCResponseEndorsements[]>;
    getCliques(): Promise<JsonRPCResponseCliques[]>;
    getFilteredSCOutputEvent(filter: EventFilterParam): Promise<JsonRPCResponseFilteredSCOutputEvent[]>;
    executeReadOlyBytecode(params: ExecuteReadOnlyBytecodeParam[]): Promise<JsonRPCResponseExecuteReadOnlyBytecode[]>;
    executeReadOnlyCall(params: ExecuteReadOnlyCall[]): Promise<JsonRPCResponseExecuteReadOnlyCall[]>;
    payment(amount: string, recipient: string): Promise<void>;
    buyRolls(amount: string): Promise<void>;
    sellRolls(amount: string): Promise<void>;
}
