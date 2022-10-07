import { ContentProvider } from "packages/web3/massa";
export declare class Contract {
    #private;
    constructor(provider: ContentProvider);
    deploy(): void;
    call(): void;
    read(): void;
}
