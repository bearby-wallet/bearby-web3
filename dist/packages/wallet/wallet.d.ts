import { SignedMessage } from "../../types";
import { Subject } from "../../lib/subject";
import { TabStream } from "../../lib/tab-stream";
import { Transaction } from "../../lib/transaction";
import { Account } from './account';
import { Network } from "./network";
import { Blockchain } from "./blockchain";
export declare class Wallet {
    #private;
    get account(): Account;
    get network(): Network;
    get blockchain(): Blockchain;
    get connected(): boolean;
    get enabled(): boolean;
    get installed(): boolean;
    constructor(stream: TabStream, subject: Subject);
    disconnect(): Promise<boolean>;
    isMassaAddress(addr: string): Promise<unknown>;
    requestPubKey(): Promise<string>;
    connect(): Promise<boolean>;
    signMessage(message: string): Promise<SignedMessage>;
    signTransaction(tx: Transaction): Promise<string>;
}
//# sourceMappingURL=wallet.d.ts.map