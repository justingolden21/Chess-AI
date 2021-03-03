// uses the minimax algorithm with alpha beta pruning to caculate the best move
const calculateBestMove = function() {

	console.time('calc move');

    let possibleNextMoves = game.moves();
    let bestMove = -9999;
    let bestMoveFound;

    for(let i = 0; i < possibleNextMoves.length; i++) {
    	console.timeLog('calc move');
        let possibleNextMove = possibleNextMoves[i];
        game.move(possibleNextMove);
        let value = minimax(minimaxDepth, -10000, 10000, false);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = possibleNextMove;
        }
    }
    console.timeEnd('calc move');
    return bestMoveFound;
};

// minimax with alpha-beta pruning and search depth d = 3 levels
const minimax = function (depth, alpha, beta, isMaximisingPlayer) {
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }

    let possibleNextMoves = game.moves();
    let numPossibleMoves = possibleNextMoves.length;
    let bestMove;

    if (isMaximisingPlayer) {
        bestMove = -9999;
        for (let i = 0; i < numPossibleMoves; i++) {
            game.move(possibleNextMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if(beta <= alpha){
            	return bestMove;
            }
        }

    } else {
        bestMove = 9999;
        for (let i = 0; i < numPossibleMoves; i++) {
            game.move(possibleNextMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if(beta <= alpha){
            	return bestMove;
            }
        }
    }

	return bestMove;
};


// the evaluation function for minimax
const evaluateBoard = function (board) {
	// console.log('evaluate board');
	// console.time('evaluate board');
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            totalEvaluation += getPieceValue(board[i][j], i, j);
        }
    }
	// console.timeEnd('evaluate board');
    return totalEvaluation;
};


const reverseArray = function(array) {
	return array.slice().reverse();
};

const whitePawnEval =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0,  1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

const blackPawnEval = reverseArray(whitePawnEval);

const knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

const whiteBishopEval = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

const blackBishopEval = reverseArray(whiteBishopEval);

const whiteRookEval = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

const blackRookEval = reverseArray(whiteRookEval);

const evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

const whiteKingEval = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

const blackKingEval = reverseArray(whiteKingEval);


const getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }

    let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);

    if(piece.color === 'w'){
    	return absoluteValue;
    } else {
    	return -absoluteValue;
    }
};


const getAbsoluteValue = function (piece, isWhite, x ,y) {
	const t = piece.type;
    if (t === 'p') {
        return 10 + ( isWhite ? whitePawnEval[y][x] : blackPawnEval[y][x] );
    } else if (t === 'r') {
        return 50 + ( isWhite ? whiteRookEval[y][x] : blackRookEval[y][x] );
    } else if (t === 'n') {
        return 30 + knightEval[y][x];
    } else if (t === 'b') {
        return 30 + ( isWhite ? whiteBishopEval[y][x] : blackBishopEval[y][x] );
    } else if (t === 'q') {
        return 90 + evalQueen[y][x];
    } else if (t === 'k') {
        return 900 + ( isWhite ? whiteKingEval[y][x] : blackKingEval[y][x] );
    }
};