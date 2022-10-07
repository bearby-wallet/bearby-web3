import { Handler } from './handler';
import { ContentProvider, Massa } from './massa';
import { Wallet  } from './wallet';

export const handler = Object.freeze(new Handler());
export const wallet = Object.freeze(
  new Wallet(handler.stream, handler.subject)
);
export const provider = new ContentProvider(
  handler.stream,
  handler.subject
);
export const massa = new Massa(provider);
(globalThis.window as any)['bearby'] = {
  wallet,
  massa
};
handler.initialized();
