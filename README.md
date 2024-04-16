# Generalized rock-paper-scissors cli game

## Requirements

- [ ] supports arbitrary odd number of arbitrary combinations
- [ ] accepts moves as cli arguments
  - [ ] >= 3 moves
  - [ ] odd number of moves
  - [ ] moves don't repeat
  - [ ] display a nice error msg if the requirements aren't met
- [ ] rules: half of the next moves in the circle wins, half of the previous moves in the circle lose
- [ ] check that the computer plays fair:
  - [ ] generate cryptographically strong random key (>= 256 bits)
  - [ ] calculate HMAC (based on SHA2 or SHA3) from the own move as a message with the generated key
  - [ ] display the HMAC to the user before his move
- [ ] show a list of moves to choose from for the player
- [ ] in case of incorrect input show the list again
- [ ] show who won, the move of the computer and the original key
- [ ] add help option, which displays a table that determines which move wins (headings, Win/Lose/Draw for cells)
- [ ] show a link to some service to calc hmac
- [ ] at least one class for each: table gen, rules, key gen, hmac calc
