import { Subject } from "lib/subject";
export declare class Network {
    #private;
    get net(): string;
    constructor(subject: Subject, providers?: string[], net?: string);
    subscribe(cb: (net: string) => void): {
        unsubscribe: () => void;
    };
}
