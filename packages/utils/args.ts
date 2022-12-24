import { assert } from "lib/assert";
import { LONG_STRING } from "lib/errors";

export class Args {
  #offset: number = 0;
  #serialized: Uint8Array;

  /**
   *
   * @param {string} serialized
   * @example
   * import { web3 } from '@hicaru/bearby.js';
   * const args1 = new web3.Args();
   *     // add some arguments
   * args1
   *  .addString("hello")
   *  .addString("world")
   *  .addU32(97);
   */
  constructor(serialized: Array<number> = []) {
    this.#serialized = Uint8Array.from(serialized);
  }


  serialize() {
    return Array.from(this.#serialized);
  }

  nextString() {
    const length = Number(this.nextU32());
    const end = this.#offset + length;
    const result = this.#toByteString(this.#serialized.slice(this.#offset, end));
    this.#offset = end;
    return result;
  }

  nextU32() {
    const buffer = this.#serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getUint32(this.#offset, true);
    this.#offset += 4;
    return value;
  }

  nextU64() {
    const buffer = this.#serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getBigUint64(this.#offset, true);
    this.#offset += 8;
    return value;
  }

  nextI32() {
    const buffer = this.#serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getInt32(this.#offset, true);
    this.#offset += 4;
    return value;
  }

  nextI64() {
    const buffer = this.#serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getBigInt64(this.#offset, true);
    this.#offset += 8;
    return value;
  }

  nextF32(): number {
    const buffer = this.#serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getFloat32(this.#offset, true);
    this.#offset += 4;
    return value;
  }

  nextF64(): number {
    const buffer = this.#serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getFloat64(this.#offset, true);
    this.#offset += 8;
    return value;
  }

  nextUint8Array(): Uint8Array {
    const length = Number(this.nextU32());
    const byteArray = this.#serialized.slice(
      this.#offset,
      (this.#offset) + length,
    );
    this.#offset += length;
    return byteArray;
  }

  addU32(n: number): Args {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, Number(n), true);
    this.#serialized = this.#concatArrays(this.#serialized, new Uint8Array(view.buffer));

    this.#offset += 4;

    return this;
  }

  addU64(n: bigint | number): Args {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigUint64(0, BigInt(n), true);
    this.#serialized = this.#concatArrays(this.#serialized, new Uint8Array(view.buffer));

    this.#offset += 8;

    return this;
  }

  addI32(n: number): Args {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, n, true);
    this.#serialized = this.#concatArrays(this.#serialized, new Uint8Array(view.buffer));

    this.#offset += 4;

    return this;
  }

  addI64(n: number | bigint): Args {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigInt64(0, BigInt(n), true);
    this.#serialized = this.#concatArrays(this.#serialized, new Uint8Array(view.buffer));

    this.#offset += 8;

    return this;
  }

  addF32(number: number): Args {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, number, true);
    this.#serialized = this.#concatArrays(this.#serialized, new Uint8Array(view.buffer));

    this.#offset += 4;

    return this;
  }


  addF64(number: number): Args {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, number, true);
    this.#serialized = this.#concatArrays(this.#serialized, new Uint8Array(view.buffer));

    this.#offset += 8;

    return this;
  }

  addUint8Array(array: Uint8Array): Args {
    this.addU32(array.length);
    this.#serialized = this.#concatArrays(this.#serialized, array);
    this.#offset += array.length;
    return this;
  }

  /**
   * Adds an argument to the serialized byte string if the argument is an
   * instance of a handled type (String of 4294967295 characters maximum)
   */
  addString(arg: string): Args {
    const maxSize = 4294967295;
    const size = arg.length;

    assert(size <= maxSize, LONG_STRING);
    this.addU32(size);
    this.#serialized = this.#concatArrays(this.#serialized, this.#fromByteString(arg));
    return this;
  }

  #toByteString(bytes: Uint8Array): string {
    let s = "";
    for (let i = 0; i < bytes.length; i++) {
      s += String.fromCharCode(bytes[i]);
    }
    return s;
  }

  #fromByteString(byteString: string): Uint8Array {
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray;
  }

  #concatArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
    const c = new Uint8Array(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }
}
