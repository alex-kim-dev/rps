# Generalized rock-paper-scissors cli game

## Requirements

- [x] supports arbitrary odd number of arbitrary combinations
- [x] accepts moves as cli arguments
  - [x] > = 3 moves
  - [x] odd number of moves
  - [x] moves don't repeat
  - [x] display a nice error msg if the requirements aren't met
- [x] rules: half of the next moves in the circle wins, half of the previous moves in the circle lose
- [x] check that the computer plays fair:
  - [x] generate cryptographically strong random key (>= 256 bits)
  - [x] calculate HMAC (based on SHA2 or SHA3) from the own move as a message with the generated key
  - [x] display the HMAC to the user before his move
- [x] show a list of moves to choose from for the player
- [x] in case of incorrect input show the list again
- [x] show who won, the move of the computer and the original key
- [ ] add help option, which displays a table that determines which move wins (headings, Win/Lose/Draw for cells)
- [x] show a link to some service to calc hmac
- [ ] at least one class for each: table gen, rules, key gen, hmac calc
