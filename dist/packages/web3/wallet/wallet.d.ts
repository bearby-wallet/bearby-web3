import { Subject } from "lib/subject";
import { TabStream } from "lib/tab-stream";
import { Account } from './account';
import { Network } from "./network";
export declare class Wallet {
    #private;
    get account(): Account;
    get network(): Network;
    get connected(): boolean;
    get enabled(): boolean;
    constructor(stream: TabStream, subject: Subject);
    connect(): Promise<boolean>;
    sign(arg: string | Error): Promise<void>;
}
