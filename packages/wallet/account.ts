import { CALLBACK_ERROR } from "lib/errors";
import { MTypeTab } from "../../config/stream-keys";
import { Subject } from "../../lib/subject";


export class Account {
  #subject: Subject;
  base58?: string;
  accounts: string[];

  constructor(subject: Subject) {
    this.#subject = subject;
    this.accounts = [];
  }

  subscribe(cb: (base58?: string, accounts?: string[]) => void) {
    if (!cb) {
      throw new Error(CALLBACK_ERROR);
    }
    if (this.base58) {
      cb(this.base58, this.accounts);
    }

    const obs = this.#subject.on((msg) => {
      switch (msg.type) {
        case MTypeTab.CONNECTION_CHANGED:
          this.base58 = msg.payload.base58;
          this.accounts = msg.payload.accounts;
          break;
        case MTypeTab.DISCONNECT_APP_RESULT:
          this.base58 = undefined;
          break;
        case MTypeTab.ACCOUNT_CHANGED:
          this.base58 = msg.payload.base58;
          break;
        case MTypeTab.RESPONSE_CONNECT_APP:
          this.base58 = msg.payload.base58;
          this.accounts = msg.payload.accounts;
          break;
        case MTypeTab.GET_DATA:
          this.base58 = msg.payload.base58;
          break;
        default:
          return;
      }

      cb(this.base58, this.accounts);
    });

    return {
      unsubscribe: () => obs()
    };
  }
}
