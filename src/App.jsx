import { useState } from "react";
import Board from "./components/Board";

const Game = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    const reset = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setXIsNext(true);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        }
        else {
            description = 'Go to game start';
        }
        return (
            <li key={move} className="border-black border-2 p-1 m-1 px-3 bg-gray-400">
                {move + 1}. <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    });

    return (
        <>
            <div className="flex h-screen space-x-20">
                <div className="game flex justify-center items-start space-x-10">
                    <div className="game-board">
                        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                    </div>
                    <div className="game-info">
                        <ol>
                            {moves}
                        </ol>
                    </div>
                </div>
                <div className="reset my-auto">
                    <button className="border-black border-2 p-2 px-3 bg-gray-400 rounded-lg" onClick={reset}>Reset</button>
                </div>
            </div>
        </>
    );
};

export default Game;
