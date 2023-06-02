import { Wallet } from '../../packages/wallet';
import { CallSmartContractParams, DatastoreEntryInputParam, DataStoreEntryResponse, DeployParams, EventFilterParam, ExecuteReadOnlyBytecodeParam, ExecuteReadOnlyCall, JsonRPCResponseExecuteReadOnlyBytecode, JsonRPCResponseExecuteReadOnlyCall, JsonRPCResponseFilteredSCOutputEvent } from '../../types';
import { ContentProvider } from '../../packages/massa';
import { ArgTypes } from 'config/args-types';
export declare class Contract {
    #private;
    readonly types: typeof ArgTypes;
    constructor(provider: ContentProvider, wallet: Wallet);
    deploy(params: DeployParams): Promise<string>;
    call(params: CallSmartContractParams): Promise<string>;
    getFilteredSCOutputEvent(...filters: EventFilterParam[]): Promise<JsonRPCResponseFilteredSCOutputEvent | JsonRPCResponseFilteredSCOutputEvent[]>;
    getDatastoreEntries(...params: DatastoreEntryInputParam[]): Promise<DataStoreEntryResponse[]>;
    executeReadOlyBytecode(params: ExecuteReadOnlyBytecodeParam[]): Promise<JsonRPCResponseExecuteReadOnlyBytecode[]>;
    readSmartContract(...params: ExecuteReadOnlyCall[]): Promise<JsonRPCResponseExecuteReadOnlyCall | JsonRPCResponseExecuteReadOnlyCall[]>;
}
//# sourceMappingURL=contract.d.ts.map