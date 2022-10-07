export function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (i) => i.toString(16).padStart(2, "0")).join("");
}
