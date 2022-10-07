import { Subject } from "lib/subject";
import { TabStream } from "lib/tab-stream";
import { OperationsType } from 'config/operations';
export declare class ContentProvider {
    #private;
    constructor(stream: TabStream, subject: Subject);
    send(method: OperationsType, params: object): Promise<unknown>;
}
