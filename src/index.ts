import { program } from 'commander';

program
  .name('rps')
  .description('Generalized rock-paper-scissors cli game')
  .version('1.0.0-alpha.0')
  .argument('<moves...>')
  .action((moves) => {
    console.log(`Passed moves: ${moves}`);
  });

program.parse();
