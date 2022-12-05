import { AVAILABLE_ONLY_BROWSER, WEB3_INSTANCE_CREATED } from '../lib/errors';
import { Contract } from './contract';
import { Handler } from './handler';
import { ContentProvider, Massa } from './massa';
import { Wallet  } from './wallet';


export class Web3 {
  readonly #handler = new Handler();
  readonly #provider = new ContentProvider(
    this.#handler.stream,
    this.#handler.subject
  );
  readonly wallet = new Wallet(
    this.#handler.stream,
    this.#handler.subject
  );
  readonly contract = new Contract(this.#provider, this.wallet);
  readonly massa = new Massa(
    this.#provider,
    this.wallet
  );

  constructor() {
    if (globalThis.window) {
      if ((globalThis.window as any)['bearby']) {
        throw new Error(WEB3_INSTANCE_CREATED);
      }
  
      try {
        this.#handler.initialized();
        (globalThis.window as any)['bearby'] = Object.freeze(this);
      } catch {
        console.debug(AVAILABLE_ONLY_BROWSER);
      }
    }
  }
}
