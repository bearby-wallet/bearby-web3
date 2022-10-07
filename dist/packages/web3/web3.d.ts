import { Contract } from './contract';
import { ContentProvider, Massa } from './massa';
import { Wallet } from './wallet';
export declare class Web3 {
    #private;
    readonly wallet: Wallet;
    readonly provider: ContentProvider;
    readonly contract: Contract;
    readonly massa: Massa;
    constructor();
}
