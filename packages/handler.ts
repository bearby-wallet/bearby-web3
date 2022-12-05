import { MTypeTab, MTypeTabContent } from "../config/stream-keys";
import { TabStream } from "../lib/tab-stream";
import { Subject } from '../lib/subject';
import { ContentMessage } from '../lib/secure-message';


export class Handler {
  readonly stream = new TabStream(MTypeTabContent.INJECTED);
  readonly subject = new Subject();

  constructor() {
    if (globalThis.document) {
      // only not ssr
      this.stream.listen((msg) => {
        this.subject.emit(msg);
      });
    }
  }

  initialized() {
    const type = MTypeTab.GET_DATA;
    const recipient = MTypeTabContent.CONTENT;

    new ContentMessage({
      type,
      payload: {}
    }).send(this.stream, recipient);
  }
}
