import { Subject } from "lib/subject";
export declare class Network {
    #private;
    net?: string;
    constructor(subject: Subject);
    subscribe(cb: (net?: string) => void): {
        unsubscribe: () => void;
    };
}
