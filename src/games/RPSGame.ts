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

  /**
   * @arg i - index of the 1st player move
   * @arg j - index of the 2nd player move
   * @arg n - number of moves
   * @returns -1 for lose, 0 for draw, 1 for win
   */
  static getResultFor(i: number, j: number, n: number) {
    const half = Math.floor(n) / 2;
    const result = Math.sign(((i - j + half + n) % n) - half);
    if (result === 0) return 'draw';
    return result > 0 ? 'win' : 'lose';
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

  makePlayerMove(playerMove: string): {
    computerMove: string;
    result: ReturnType<typeof RPSGame.getResultFor>;
    key: string;
  } {
    if (!this.#computerMove)
      throw new Error('The player should take their turn after the computer');

    const player = this.#moves.findIndex((move) => move === playerMove);
    const comp = this.#moves.findIndex((move) => move === this.#computerMove);
    const result = RPSGame.getResultFor(comp, player, this.#moves.length);

    return { computerMove: this.#computerMove, result, key: this.#key };
  }
}
