let game, minimaxDepth;
$(document).ready(function(){
	minimaxDepth = 2;
	initGame();

	function initGame(){
		$('#board').hide();
		$('#gameover').hide();
		$('#restart').hide();
		$('#difficulty').show();

		$('.easy').click(function(){
			setDepth(0);
		});
		$('.medium').click(function(){
			setDepth(1);
		});
		$('.hard').click(function(){
			setDepth(2);
		});

		function setDepth(depth){
			$('#difficulty').hide();
			$('#board').show();
			$('#restart').show();
			console.log(depth);
			minimaxDepth = depth;
		}
	}


	$('.restartGame').click(function(){
		board.clear();
		board.start();
		game.reset();
		initGame();
	})


	var board;
	game = new Chess();


	var removeGreySquares = function() {
		$('#board .square-55d63').css('background', '');
	};


	var greySquare = function(square) {
	  var squareEl = $('#board .square-' + square);
	  
	  var background = '#a9a9a9';
	  if (squareEl.hasClass('black-3c85d') === true) {
	    background = '#696969';
	  }

	  squareEl.css('background', background);
	};


	// do not pick up pieces if the game is over
	// only pick up pieces for White
	var onDragStart = function(source, piece, position, orientation) {
	  if (game.in_checkmate() === true || game.in_draw() === true || game.game_over() === true ) {
	  	$('#gameover').show();
	  	$("#gameover").html('Game over!');
	    return false;
	  }
	};


	var makeAImove = function () {
	    var bestMove = calculateBestMove();
	    game.move(bestMove);
	    board.position(game.fen());
	};


	var onDrop = function(source, target) {
  	  removeGreySquares();

	  // see if the move is legal
	  var move = game.move({
	    from: source,
	    to: target,
	    promotion: 'q' 
	  });

	  // illegal move
	  if (move === null) return 'snapback';

	  // make legal move for black AI player
	  window.setTimeout(makeAImove, 250);
	};


	var onMouseoverSquare = function(square, piece) {
	  // get list of possible moves for this square
	  var moves = game.moves({
	    square: square,
	    verbose: true
	  });

	  // exit if there are no moves available for this square
	  if (moves.length === 0) return;

	  // highlight the square they moused over
	  greySquare(square);

	  // highlight the possible squares for this piece
	  for (var i = 0; i < moves.length; i++) {
	    greySquare(moves[i].to);
	  }
	};


	var onMouseoutSquare = function(square, piece) {
	  removeGreySquares();
	};


	// update the board position after the piece snap
	// for castling, en passant, pawn promotion
	var onSnapEnd = function() {
	  board.position(game.fen());
	};

	var cfg = {
	  draggable: true,
	  position: 'start',
	  onDragStart: onDragStart,
	  onDrop: onDrop,
	  onMouseoutSquare: onMouseoutSquare,
  	  onMouseoverSquare: onMouseoverSquare,
	  onSnapEnd: onSnapEnd
	};
	board = ChessBoard('board', cfg);
});