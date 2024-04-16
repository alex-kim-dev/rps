import { program } from 'commander';
import chalk from 'chalk';
import { select } from '@inquirer/prompts';
import Table from 'cli-table3';

import { RPSGame } from '~/games/RPSGame.ts';

program
  .name('rps')
  .description('Generalized rock-paper-scissors cli game')
  .version('1.0.0-alpha.0')
  .argument('<moves...>', 'odd number >=3 of unique moves (labels)')
  .addHelpText('after', (context) => {
    const moves = context.command.args.slice(1);
    const heading = '\nResults for the given arguments:\n';

    if (moves.length < 3) return `${heading}• there must be at least 3 moves`;
    if (moves.length >= 3 && moves.length % 2 === 0)
      return `${heading}• the number of moves must be odd`;

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

    return `${heading}${table}`;
  });

program.parse();

const moves = program.args;

if (moves.length < 3) {
  program.error(chalk.red('error: there must be at least 3 moves'));
}

if (moves.length >= 3 && moves.length % 2 === 0) {
  program.error(chalk.red('error: the number of moves must be odd'));
}

if (new Set(moves).size !== moves.length) {
  program.error(chalk.red('error: moves must be unique'));
}

const game = new RPSGame(moves);
const hmac = game.makeComputerMove();

console.log(chalk.gray(`HMAC: ${hmac}\n`));

const playerMove = await select({
  message: 'Player move:',
  choices: moves.map((move) => ({ name: move, value: move })),
});
const { computerMove, result, key } = game.makePlayerMove(playerMove);

console.log(chalk.bold(`Computer move: ${computerMove}`));

const displayVariants = {
  lose: ['bgRed', 'You lose!'],
  draw: ['bgWhite', 'Draw!'],
  win: ['bgGreen', 'You win!'],
} as const;
const [bg, msg] = displayVariants[result];

console.log(chalk[bg](msg));
console.log(chalk.gray(`\nHMAC key: ${key}`));
console.log(
  chalk.italic.gray(
    'To verify HMAC visit: https://www.liavaag.org/English/SHA-Generator/HMAC/',
  ),
);
