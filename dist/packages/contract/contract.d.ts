import type { Wallet } from 'packages/wallet';
import type { DeployParams } from 'types';
import { ContentProvider } from 'packages/massa';
export declare class Contract {
    #private;
    constructor(provider: ContentProvider, wallet: Wallet);
    deploy(params: DeployParams): Promise<string>;
    call(): void;
    read(): void;
}
