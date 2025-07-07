import React, {useState} from 'react';
import './App.css';

function Square({value, onSquareClick}){
  return(
    <button className ="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function Board({xIsNext, squares, onPlay}){
  const emojiX = '🐱';
  const emojiO = '🤖';
  function handleClick(i){
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? emojiX : emojiO;
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}`: `Next player: ${xIsNext ? emojiX : emojiO}`;
  return(
    <>
    <div className="status">{status}</div>
    {[0, 3, 6].map((row) => (
      <div className="board-row" key={row}>
        {Array(3).fill(0).map((_, col) => {
          const index = row + col;
          return (
            <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    ))}
    </>
  );

}
function App(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const[currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1),
      nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
    function jumpTo(nextMove){
      setCurrentMove(nextMove);
    }
    function handleReset(){
      setHistory([Array(9).fill(null)])
      setCurrentMove(0);

    }
    const moves = history.map((_, move) => {
      const des = move > 0 ? `Go to move #${move}` : 'Go to game start';
      return(
        <li key ={move}>
          <button className="history-button" onClick={() => jumpTo(move)}>{des}</button>

        </li>
      );
    });
    return(
      <div className="game">
       <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
       </div>
       <div className="game-info">
        <ol>{moves}</ol>
        <button className="reset-button" onClick={handleReset}>ResetGame</button>

       </div>
      </div>
    );
  }
  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [1, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines){
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }
  export default App;







    
  