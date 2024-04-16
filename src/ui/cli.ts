import chalk from 'chalk';
import { select } from '@inquirer/prompts';
import Table from 'cli-table3';

import { RPSGame, type Result } from '~/games/RPSGame.ts';

const displayVariants = {
  lose: ['bgRed', 'You lose!'],
  draw: ['bgWhite', 'Draw!'],
  win: ['bgGreen', 'You win!'],
} as const;

export const cli = {
  bold(message: string) {
    console.log(chalk.bold(message));
  },

  info(message: string, caption?: string) {
    console.log(chalk.gray(message));
    if (caption) console.log(chalk.italic.gray(caption));
  },

  async selectMove(moves: string[]) {
    const selected = await select({
      message: 'Player move:',
      choices: moves.map((move) => ({ name: move, value: move })),
    });
    return selected;
  },

  showResult(result: Result) {
    const [bg, msg] = displayVariants[result];
    console.log(chalk[bg](msg));
  },

  genResultTable(moves: string[]) {
    const table = new Table({
      head: ['v pc\\user >'].concat(moves),
    });

    table.push(
      ...moves.map((move, i) => ({
        [chalk.blue(move)]: Array.from({ length: moves.length }).map((_, j) =>
          RPSGame.getResultFor(i, j, moves.length),
        ),
      })),
    );

    return table.toString();
  },
};
