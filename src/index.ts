import { program } from 'commander';
import chalk from 'chalk';

program
  .name('rps')
  .description('Generalized rock-paper-scissors cli game')
  .version('1.0.0-alpha.0')
  .argument('<moves...>', 'odd number >=3 of unique moves (labels)');

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

console.log(`Passed moves: ${moves}`);
