import type { GraphIntervalResponse, JsonRPCResponse, JsonRPCResponseCliques, JsonRPCResponseEndorsements, JsonRPCResponseNodeStatus, JsonRPCResponseNodeStatusAddresses, JsonRPCResponseStakers, MassaBlock, OperationTransaction } from "../../types";
import { ContentProvider } from "./provider";
import { Wallet } from "../../packages/wallet";
export declare class Massa {
    #private;
    constructor(provider: ContentProvider, wallet: Wallet);
    getNodesStatus(): Promise<JsonRPCResponse<JsonRPCResponseNodeStatus>>;
    getAddresses(...addresses: string[]): Promise<JsonRPCResponse<JsonRPCResponseNodeStatusAddresses[]>>;
    getBlocks(...blocks: string[]): Promise<JsonRPCResponse<MassaBlock[]>>;
    getGraphInterval(start: number, end: number): Promise<JsonRPCResponse<GraphIntervalResponse[]>>;
    getOperations(...operations: string[]): Promise<JsonRPCResponse<OperationTransaction[]>>;
    getStakers(): Promise<JsonRPCResponse<JsonRPCResponseStakers[]>>;
    getEndorsements(...Ids: string[]): Promise<JsonRPCResponse<JsonRPCResponseEndorsements[]>>;
    getCliques(): Promise<JsonRPCResponse<JsonRPCResponseCliques[]>>;
    payment(amount: string, recipient: string): Promise<string>;
    buyRolls(amount?: string): Promise<string>;
    sellRolls(amount?: string): Promise<string>;
}
//# sourceMappingURL=massa.d.ts.map