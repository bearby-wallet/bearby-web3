import type { ReqBody } from 'types';
import type { TabStream } from './tab-stream';
export declare class ContentMessage {
    #private;
    get type(): string;
    get payload(): any;
    constructor(msg: ReqBody);
    /**
     * Method for send message.
     */
    send(stream: TabStream, recipient: string): void;
}
//# sourceMappingURL=secure-message.d.ts.map