# Sprint Point

## Session

Session start when the first player join the game. Session end when the last
player leave the game.

Session end if the game in not updated for 5 h.

Session end if user change the Deck.

## Round

Round has 3 states: `idle`, `voting`, `checking`, `finished`.

When start the round, the state is `idle`.

When first player vote, the state is `voting`.

When all players vote, the state is `checking`.

When start next round, previous round is `finished`.

Before round is finished, the all data changes are sent to the web socket.

When round is finished, the data is saved to the database.
