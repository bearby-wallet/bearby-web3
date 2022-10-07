import { Subject } from "lib/subject";
export declare class Network {
    #private;
    get net(): string | undefined;
    constructor(subject: Subject, net?: string);
    subscribe(cb: (net?: string) => void): {
        unsubscribe: () => void;
    };
}
