import type { Wallet } from 'packages/wallet';
import type { CallSmartContractParams, ContractStorageData, DatastoreEntryInputParam, DeployParams, EventFilterParam, ExecuteReadOnlyBytecodeParam, ExecuteReadOnlyCall, JsonRPCResponseExecuteReadOnlyBytecode, JsonRPCResponseExecuteReadOnlyCall, JsonRPCResponseFilteredSCOutputEvent } from 'types';
import { ContentProvider } from 'packages/massa';
export declare class Contract {
    #private;
    constructor(provider: ContentProvider, wallet: Wallet);
    deploy(params: DeployParams): Promise<string>;
    call(params: CallSmartContractParams): Promise<string>;
    getFilteredSCOutputEvent(...filters: EventFilterParam[]): Promise<JsonRPCResponseFilteredSCOutputEvent | JsonRPCResponseFilteredSCOutputEvent[]>;
    getDatastoreEntries(...params: DatastoreEntryInputParam[]): Promise<ContractStorageData[]>;
    executeReadOlyBytecode(params: ExecuteReadOnlyBytecodeParam[]): Promise<JsonRPCResponseExecuteReadOnlyBytecode[]>;
    readSmartContract(...params: ExecuteReadOnlyCall[]): Promise<JsonRPCResponseExecuteReadOnlyCall | JsonRPCResponseExecuteReadOnlyCall[]>;
}
