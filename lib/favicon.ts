export function getFavicon() {
  try {
    let ref = globalThis.document.querySelector<HTMLLinkElement>('link[rel*=\'icon\']');

    if (!ref) {
      return;
    }

    return ref.href;
  } catch (err) {
    return;
  }
}
