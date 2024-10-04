import { Wallet } from '../../packages/wallet';
import { CallSmartContractParams, DatastoreEntryInputParam, DataStoreEntryResponse, DeployParams, EventFilterParam, ExecuteReadOnlyBytecodeParam, ExecuteReadOnlyCall, JsonRPCResponseExecuteReadOnly, JsonRPCResponseFilteredSCOutputEvent } from '../../types';
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
    executeReadOnlyBytecode(params: ExecuteReadOnlyBytecodeParam[]): Promise<JsonRPCResponseExecuteReadOnly[]>;
    readSmartContract(...params: ExecuteReadOnlyCall[]): Promise<JsonRPCResponseExecuteReadOnly[]>;
}
//# sourceMappingURL=contract.d.ts.map