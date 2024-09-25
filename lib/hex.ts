
export function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (i) => i.toString(16).padStart(2, "0")).join("");
}

export function utf8ToBytes(str: string) {
  let binaryArray = new Uint8Array(str.length);
  Array.prototype.forEach.call(binaryArray, (_, idx, arr) => {
    arr[idx] = str.charCodeAt(idx);
  });
  return binaryArray;
}

// Converts utf-16 string to a Uint8Array.
// copied from https://github.com/massalabs/massa-web3/blob/b8f0c7e310f8663cb25d6cf9f6c922f84903e810/src/basicElements/serializers/strings.ts#L10

export function strToBytes(str: string): Uint8Array {
  if (!str.length) {
    return new Uint8Array(0)
  }
  return new TextEncoder().encode(str)
}
