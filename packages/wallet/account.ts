import { MTypeTab } from "config/stream-keys";
import { Subject } from "lib/subject";


export class Account {
  #subject: Subject;
  base58?: string;

  constructor(subject: Subject) {
    this.#subject = subject;
  }

  subscribe(cb: (base58?: string) => void) {
    if (this.base58) {
      cb(this.base58);
    }

    const obs = this.#subject.on((msg) => {
      switch (msg.type) {
        case MTypeTab.ACCOUNT_CHANGED:
          this.base58 = msg.payload.base58;
          break;
        case MTypeTab.RESPONSE_CONNECT_APP:
          this.base58 = msg.payload.base58;
          break;
        case MTypeTab.GET_DATA:
          this.base58 = msg.payload.base58;
          break;
        default:
          return;
      }

      cb(this.base58);
    });

    return {
      unsubscribe: () => obs()
    };
  }
}
