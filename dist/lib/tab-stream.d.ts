import type { ReqBody } from 'types';
/**
 * Used for communication between a web page and an extension's content script.
 */
export declare class TabStream {
    #private;
    /**
     * Creates a new TabStream.
     * @param {String} eventName - Event type.
     */
    constructor(eventName: string);
    /**
     * Message listener that returns decrypted messages when synced
     */
    listen(cb: (payload: ReqBody) => void): void;
    /**
     * Message sender which encrypts messages and adds the sender.
     * @param data - The payload to send.
     * @param to - The stream to send messages to.
     */
    send(data: ReqBody, to: string): void;
}
//# sourceMappingURL=tab-stream.d.ts.map