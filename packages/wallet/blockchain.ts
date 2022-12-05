import { MTypeTab } from "../../config/stream-keys";
import { Subject } from "../../lib/subject";


export class Blockchain {
  #subject: Subject;

  period = -1;

  constructor(subject: Subject) {
    this.#subject = subject;
  }

  subscribe(cb: (block: number) => void) {
    const obs = this.#subject.on((msg) => {
      switch (msg.type) {
        case MTypeTab.NEW_SLOT:
          this.period = msg.payload;
          cb(this.period);
          break;
        case MTypeTab.GET_DATA:
          this.period = msg.payload.period;
          cb(this.period);
          break;
        case MTypeTab.NETWORK_CHANGED:
          this.period = msg.payload.period;
          cb(this.period);
          break;
        default:
          break;
      }
    });

    return {
      unsubscribe: () => obs()
    };
  }
}
