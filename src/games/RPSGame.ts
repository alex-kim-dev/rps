import { KeyGenerator } from '~/lib/keyGenerator.ts';
import { HMACGenerator } from '~/lib/HMACGenerator.ts';
import { genRandomInRange } from '~/lib/utils.ts';

export class RPSGame {
  #key: string = new KeyGenerator().generate();

  #moves: string[];

  #computerMove: string | null = null;

  constructor(moves: string[]) {
    this.#moves = moves;
  }

  getMoves() {
    return this.#moves;
  }

  // eslint-disable-next-line class-methods-use-this
  getOutcomes() {
    return [[]];
  }

  /** @returns HMAC of the computer move */
  makeComputerMove() {
    const randomIndex = genRandomInRange(0, this.#moves.length);
    this.#computerMove = this.#moves[randomIndex] as string;
    return new HMACGenerator(this.#key).generate(this.#computerMove);
  }

  makePlayerMove(playerMove: string) {
    if (!this.#computerMove)
      throw new Error('The player should take their turn after the computer');

    const player = this.#moves.findIndex((move) => move === playerMove);
    const comp = this.#moves.findIndex((move) => move === this.#computerMove);
    const moves = this.#moves.length;
    const half = Math.floor(moves) / 2;

    const result = Math.sign(
      ((comp - player + half + moves) % moves) - half,
    ) as -1 | 0 | 1;

    return { computerMove: this.#computerMove, result, key: this.#key };
  }
}
