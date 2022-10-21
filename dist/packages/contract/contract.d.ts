import type { Wallet } from 'packages/wallet';
import type { DeployParams, EventFilterParam, ExecuteReadOnlyBytecodeParam, ExecuteReadOnlyCall, JsonRPCResponseExecuteReadOnlyBytecode, JsonRPCResponseExecuteReadOnlyCall, JsonRPCResponseFilteredSCOutputEvent } from 'types';
import { ContentProvider } from 'packages/massa';
export declare class Contract {
    #private;
    constructor(provider: ContentProvider, wallet: Wallet);
    deploy(params: DeployParams): Promise<string>;
    call(): void;
    getFilteredSCOutputEvent(filter: EventFilterParam): Promise<JsonRPCResponseFilteredSCOutputEvent[]>;
    executeReadOlyBytecode(params: ExecuteReadOnlyBytecodeParam[]): Promise<JsonRPCResponseExecuteReadOnlyBytecode[]>;
    executeReadOnlyCall(params: ExecuteReadOnlyCall[]): Promise<JsonRPCResponseExecuteReadOnlyCall[]>;
}
