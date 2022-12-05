import { Subject } from "../../lib/subject";
import { TabStream } from "../../lib/tab-stream";
import { MTypeTab, MTypeTabContent } from "../../config/stream-keys";
import { uuidv4 } from "../../lib/uuid";
import { ContentMessage } from "../../lib/secure-message";
import { TIME_OUT_SECONDS } from "../../config/common";
import { TIME_OUT } from "../../lib/errors";
import { RPCBody } from "../../types";


export class ContentProvider {
  #stream: TabStream;
  #subject: Subject;

  constructor(stream: TabStream, subject: Subject) {
    this.#stream = stream;
    this.#subject = subject;
  }

  async send<T>(body: RPCBody[]): Promise<T> {
    const type = MTypeTab.CONTENT_PROXY_MEHTOD;
    const recipient = MTypeTabContent.CONTENT;
    const uuid = uuidv4();
    let sub: Function;

    new ContentMessage({
      type,
      payload: {
        body,
        uuid
      }
    }).send(this.#stream, recipient);

    const fulfilled = new Promise((resolve, reject) => {
      sub = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.CONTENT_PROXY_RESULT) return;
        if (!msg.payload || !msg.payload.uuid) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload && msg.payload.reject) {
          sub();
          return reject(new Error(msg.payload.reject));
        }

        delete msg.payload.uuid;
        sub();
        return resolve(msg.payload.resolve as T);
      });
    });
    const timeout = new Promise((_, reject) =>{
      setTimeout(() => {
        if (sub) sub();
        reject(new Error(TIME_OUT));
      }, TIME_OUT_SECONDS);
    });

    return Promise.race([fulfilled, timeout]) as T;
  }
}
