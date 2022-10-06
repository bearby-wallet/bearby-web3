import { Subject } from "lib/subject";
export declare class Account {
    #private;
    get base58(): string | undefined;
    constructor(subject: Subject, base58?: string);
    subscribe(cb: (base58?: string) => void): {
        unsubscribe: () => void;
    };
}
