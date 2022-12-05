import { MTypeTab } from "../../config/stream-keys";
import { Subject } from "../../lib/subject";


export class Network {
  #subject: Subject;
  net?: string;

  constructor(subject: Subject) {
    this.#subject = subject;
  }

  subscribe(cb: (net?: string) => void) {
    cb(this.net);

    const obs = this.#subject.on((msg) => {
      switch (msg.type) {
        case MTypeTab.RESPONSE_CONNECT_APP:
          this.net = msg.payload.net;
          break;
        case MTypeTab.GET_DATA:
          this.net = msg.payload.net;
          break;
        case MTypeTab.NETWORK_CHANGED:
          this.net = msg.payload.net;
          break;
        default:
          return;
      }

      cb(this.net);
    });

    return {
      unsubscribe: () => obs()
    };
  }
}
