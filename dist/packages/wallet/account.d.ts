import { Subject } from "lib/subject";
export declare class Account {
    #private;
    base58?: string;
    constructor(subject: Subject);
    subscribe(cb: (base58?: string) => void): {
        unsubscribe: () => void;
    };
}
//# sourceMappingURL=account.d.ts.map