import { Contract } from './contract';
import { Handler } from './handler';
import { ContentProvider, Massa } from './massa';
import { Wallet  } from './wallet';


export class Web3 {
  readonly #handler = new Handler();
  readonly wallet = new Wallet(
    this.#handler.stream,
    this.#handler.subject
  );
  readonly provider = new ContentProvider(
    this.#handler.stream,
    this.#handler.subject
  );
  readonly contract = new Contract(this.provider);
  readonly massa = new Massa(this.provider);

  constructor() {
    this.#handler.initialized();
    (globalThis.window as any)['bearby'] = Object.freeze(this);
  }
}
