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
