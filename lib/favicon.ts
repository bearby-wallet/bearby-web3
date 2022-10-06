import { FAVICON_REQUIRED } from "./errors";


export function getFavicon() {
  let ref = globalThis.document.querySelector<HTMLLinkElement>('link[rel*=\'icon\']');

  if (!ref) {
    throw new Error(FAVICON_REQUIRED);
  }

  return ref.href;
}
