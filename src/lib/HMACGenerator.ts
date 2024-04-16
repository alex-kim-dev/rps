import { createHmac, type BinaryToTextEncoding } from 'node:crypto';

export class HMACGenerator {
  #key: string;

  #encoding: BinaryToTextEncoding;

  constructor(key: string, encoding: BinaryToTextEncoding = 'hex') {
    this.#key = key;
    this.#encoding = encoding;
  }

  generate(message: string) {
    const hmac = createHmac('sha3-256', this.#key);
    hmac.update(message);
    return hmac.digest(this.#encoding);
  }
}
