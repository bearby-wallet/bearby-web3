import { ContentProvider } from 'packages/massa';
export declare class Contract {
    #private;
    constructor(provider: ContentProvider);
    deploy(): void;
    call(): void;
    read(): void;
}
