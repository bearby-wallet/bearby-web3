import { Subject } from "../../lib/subject";
import { TabStream } from "../../lib/tab-stream";
import { RPCBody } from "../../types";
export declare class ContentProvider {
    #private;
    constructor(stream: TabStream, subject: Subject);
    send<T>(body: RPCBody[]): Promise<T>;
}
//# sourceMappingURL=provider.d.ts.map