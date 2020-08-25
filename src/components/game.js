import React from 'react';
import Board from './board';

function Game() {
	const [gameState, setGame] = React.useState({
		history: [
			{
				squares: Array(9).fill(null),
			},
		],
		xIsNext: true,
		status: `Next player: X`,
		stepNumber: 0,
	});

	// let status = `Next player: ${boardState.xIsNext ? 'X' : 'O'}`;

	const handleClick = (i) => {
		console.log(gameState);
		const history = gameState.history; //.slice(0, gameState.stepNumber + 1);
		const current = history[gameState.stepNumber];
		const squares = current.squares.slice();
		if (squares[i] || calculateWinner(squares) || gameState.stepNumber >= 9) {
			return;
		}
		squares[i] = gameState.xIsNext ? 'X' : 'O';
		const newHistory = history.concat([{ squares: squares }]);
		const winner = calculateWinner(squares);
		if (winner) {
			// status = `Winner: ${winner}`;
			const newGameState = {
				...gameState,
				stepNumber: gameState.history.length,
				history: newHistory,
				status: `Winner: ${winner}`,
			};
			console.log(newGameState);
			setGame(newGameState);
			return;
		}

		const newGameState = {
			...gameState,
			history: newHistory,
			status:
				gameState.stepNumber === 8
					? `Game Draw`
					: `Next player: ${!gameState.xIsNext ? 'X' : 'O'}`,
			xIsNext: !gameState.xIsNext,
			stepNumber: gameState.history.length,
		};
		setGame(newGameState);
	};

	function jumpTo(step) {
		const jumpToState = {
			...gameState,
			//			history: gameState.history.slice(0, step + 1),
			stepNumber: step,
			xIsNext: step % 2 === 0,
			status: `Next player: ${step % 2 === 0 ? 'X' : 'O'}`,
		};
		setGame(jumpToState);
	}

	const moves = gameState.history.map((step, move) => {
		const desc = move ? 'Go to move #' + move : 'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	return (
		<div>
			<div className="game-board">
				<Board
					squares={gameState.history[gameState.stepNumber].squares}
					onClick={(i) => handleClick(i)}
				/>
			</div>
			<div className="game-info">
				<div>{gameState.status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

function calculateWinner(square) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	if (!square) return null;

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		// console.log(`${a}: square[${a}] ; ${b}: square[${b}] ; ${c}: square[${c}]`);
		if (square[a] && square[a] === square[b] && square[a] === square[c]) {
			// console.log(square[a]);
			return square[a];
		}
	}
	return null;
}

export default Game;
