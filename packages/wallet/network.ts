import { MTypeTab } from "config/stream-keys";
import { Subject } from "lib/subject";


export class Network {
  #subject: Subject;
  #net?: string;

  get net() {
    return this.#net;
  }

  constructor(subject: Subject, net?: string) {
    this.#subject = subject;

    if (net) {
      this.#net = net;
    }
  }

  subscribe(cb: (net?: string) => void) {
    cb(this.net);

    const obs = this.#subject.on((msg) => {
      switch (msg.type) {
        case MTypeTab.GET_DATA:
          this.#net = msg.payload.net;
          break;
        case MTypeTab.NETWORK_CHANGED:
          this.#net = msg.payload.net;
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
