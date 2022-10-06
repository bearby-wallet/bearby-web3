import { Handler } from './handler';
import { Wallet  } from './wallet';

export const handler = Object.freeze(new Handler());
export const wallet = Object.freeze(
  new Wallet(handler.stream, handler.subject)
);
(globalThis.window as any)['bearby'] = wallet;
handler.initialized();
