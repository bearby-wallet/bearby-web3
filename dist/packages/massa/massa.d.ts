import { GraphIntervalResponse, JsonRPCResponseCliques, JsonRPCResponseEndorsements, JsonRPCResponseNodeStatus, JsonRPCResponseNodeStatusAddresses, JsonRPCResponseStakers, MassaBlock, OperationTransaction } from "../../types";
import { ContentProvider } from "./provider";
import { Wallet } from "../../packages/wallet";
export declare class Massa {
    #private;
    constructor(provider: ContentProvider, wallet: Wallet);
    getNodesStatus(): Promise<JsonRPCResponseNodeStatus[]>;
    getAddresses(...addresses: string[]): Promise<JsonRPCResponseNodeStatusAddresses[]>;
    getBlocks(...blocks: string[]): Promise<MassaBlock[]>;
    getGraphInterval(start: number, end: number): Promise<GraphIntervalResponse[]>;
    getOperations(...operations: string[]): Promise<OperationTransaction[]>;
    getStakers(): Promise<JsonRPCResponseStakers[]>;
    getEndorsements(...Ids: string[]): Promise<JsonRPCResponseEndorsements[]>;
    getCliques(): Promise<JsonRPCResponseCliques[]>;
    payment(amount: string, recipient: string): Promise<string>;
    buyRolls(amount: string): Promise<string>;
    sellRolls(amount: string): Promise<string>;
}
//# sourceMappingURL=massa.d.ts.map