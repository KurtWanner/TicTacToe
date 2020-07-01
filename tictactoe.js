var empty = 'E';
var player1 = 'X';
var player2 = 'O';
var winState = 'win'; //Endgame State
var tieState = 'tie'; //Endgame State
var lossState = 'loss'; //Endgame State
var noEndState = 'gameOn'; //There is neither a win, loss, or tie. There are still possible moves

function boardFactory() { //Creates lightweight board object
    return [ //First index is row, second index is column
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty]
    ];
}

function playMoveOnBoard(board, move, player) {
    if (board[move[0]][move[1]] === empty) {
        board[move[0]][move[1]] = player;
        return true;
    } else {
        return false;
    }
}

function checkWinState(board, player) {

    //Checking Horizontal and Vertical Win States
    for (var i = 0; i < board.length; i++) {
        let playerInARow = {
            horizontal: 0,
            vertical: 0
        };
        let opponentInARow = {
            horizontal: 0,
            vertical: 0
        };
        for (var p = 0; p < board[0].length; p++) {
            if (board[i][p] === player) {
                playerInARow.horizontal++;
            } else if (board[i][p] === oppositePlayer(player)) {
                opponentInARow.horizontal++;
            }
            if (board[p][i] === player) {
                playerInARow.vertical++;
            } else if (board[p][i] === oppositePlayer(player)) {
                opponentInARow.vertical++;
            }

        }
        if (playerInARow.vertical === 3 || playerInARow.horizontal === 3) {
            return winState;
        } else if (opponentInARow.vertical === 3 || opponentInARow.horizontal === 3) {
            return lossState;
        }
    }

    //Checking Diagonal Win States
    let playerInARow = {
        upward: 0,
        downward: 0
    };
    let opponentInARow = {
        upward: 0,
        downward: 0
    };

    for (var i = 0; i < board.length; i++) {
        if (board[i][i] === player) {
            playerInARow.downward++;
        } else if (board[i][i] === oppositePlayer(player)) {
            opponentInARow.downward++;
        }
        if (board[i][2 - i] === player) {
            playerInARow.upward++;
        } else if (board[i][2 - i] === oppositePlayer(player)) {
            opponentInARow.upward++;
        }
    }
    if (playerInARow.upward === 3 || playerInARow.downward === 3) {
        return winState;
    } else if (opponentInARow.upward === 3 || opponentInARow.downward === 3) {
        return lossState;
    }

    //Checking Available Moves
    for (var row = 0; row < board.length; row++) {
        for (var column = 0; column < board[0].length; column++) {
            if (board[row][column] === empty) {
                return noEndState;
            } else {
                continue;
            }
        }
    }

    //If no more available moves
    return tieState;
}

function oppositePlayer(player) {
    if (player === player1) {
        return player2;
    } else {
        return player1
    }
}

function getPossibleMoves(board) {
    var possibleMoves = [];
    for (var row = 0; row < board.length; row++) {
        for (var column = 0; column < board[0].length; column++) {
            if (board[row][column] === empty) {
                possibleMoves.push([row, column]);
            }
        }
    }
    return possibleMoves;
}

function simulateGame(p1 = undefined, p2 = undefined) {
    var gameHistory = [];
    var board = boardFactory();
    var playerToMove = 1;

    while (checkWinState(board, player1) === noEndState) {
        var move;
        if (playerToMove === 1 && p1 !== undefined) {
            //Get move from player 1's ai
        } else if (playerToMove === 2 && p2 !== undefined) {
            //Get move from player 2's ai
        } else {
            var moves = getPossibleMoves(board);
            move = moves[Math.floor(Math.random() * moves.length)];
        }

        //Make the move
        playMoveOnBoard(board, move, convertPlayer(playerToMove));

        //Add move to history
        gameHistory.push([playerToMove, move]);

        //Switch active player
        if (playerToMove === 1) {
            playerToMove = 2;
        } else {
            playerToMove = 1;
        }
    }

    return gameHistory;


}

function convertPlayer(player) {
    if (player === 1) {
        return player1;
    } else {
        return player2;
    }
}

function movesToBoard(history) {
    var board = boardFactory();
    for (var i = 0; i < history.length; i++) {
        board[history[i][1][0]][history[i][1][1]] = history[i][0];
    }
    return board;
}