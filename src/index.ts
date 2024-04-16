import { program } from 'commander';
import chalk from 'chalk';

import { RPSGame } from '~/games/RPSGame.ts';
import { cli } from '~/ui/cli.ts';

const HMAC_VERIFY_WEBSITE =
  'https://www.liavaag.org/English/SHA-Generator/HMAC/';

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

    return `${heading}${cli.genResultTable(moves)}`;
  });

const moves = program.parse().args;

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

cli.info(`HMAC: ${hmac}\n`);

const playerMove = await cli.selectMove(moves);
const { computerMove, result, key } = game.makePlayerMove(playerMove);

cli.bold(`Computer move: ${computerMove}`);
cli.showResult(result);
cli.info(`\nHMAC key: ${key}`, `To verify HMAC visit: ${HMAC_VERIFY_WEBSITE}`);
