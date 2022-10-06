import { MTypeTab, MTypeTabContent } from "lib/streem/stream-keys";
import { TabStream } from "lib/streem/tab-stream";
import { Subject } from 'lib/subject';
import { ContentMessage } from 'lib/streem/secure-message';

export class Handler {
  public readonly stream = new TabStream(MTypeTabContent.INJECTED);
  public readonly subject = new Subject();

  constructor() {
    this.stream.listen((msg) => {
      this.subject.emit(msg);
    });
  }

  public initialized() {
    const type = MTypeTab.GET_WALLET_DATA;
    const recipient = MTypeTabContent.CONTENT;

    new ContentMessage({
      type,
      payload: {}
    }).send(this.stream, recipient);
  }
}
