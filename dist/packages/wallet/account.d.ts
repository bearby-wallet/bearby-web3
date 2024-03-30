import { Subject } from "../../lib/subject";
export declare class Account {
    #private;
    base58?: string;
    accounts: string[];
    constructor(subject: Subject);
    subscribe(cb: (base58?: string, accounts?: string[]) => void): {
        unsubscribe: () => void;
    };
}
//# sourceMappingURL=account.d.ts.map