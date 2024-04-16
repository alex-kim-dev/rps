import { randomBytes } from 'node:crypto';

export class KeyGenerator {
  #encoding: BufferEncoding;

  constructor(encoding: BufferEncoding = 'hex') {
    this.#encoding = encoding;
  }

  generate(keyLength = 32) {
    return randomBytes(keyLength).toString(this.#encoding);
  }
}
