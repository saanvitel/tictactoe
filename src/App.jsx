import { useState } from 'react';

function Square({value, handleClick, winOutcome}) {
  const squareClass = winOutcome ? "winsquare" : "square";
  return (
    <button className={squareClass} onClick={handleClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, handlePlay}) { // takes these props
  // squares are how the board looks right now
  console.log("loaf", squares)
  function handleClick(i) {
    console.log('loaf handleClick')
    if (calculateWinner(squares).length > 0 || squares[i]) {
      console.log("loaf calculateWinner")
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      console.log("loaf isNext X")
      nextSquares[i] = 'X';
    } else {
      console.log("loaf isNext O")
      nextSquares[i] = 'O';
    }
    handlePlay(nextSquares);
  }

  const winner = calculateWinner(squares);// calculate winner squares sees if function has returned -> game is done
  let status;
  if (winner.length > 0) {
    let winnerLetter;
    winnerLetter = squares[winner[0]]
    status = 'Winner: ' + winnerLetter;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  console.log(winner);

  // squares is the array of "x" and null?
  // winner is the array of square indices



  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {squares.map((element, index) => {
          if(index > 2) {
            return
          }

          console.log("loaf index",index)
          if (winner.includes(index)) {
            return <Square winOutcome={true} value={squares[index]} handleClick={() => handleClick(index)} />
          } else {
            return <Square winOutcome={false} value={squares[index]} handleClick={() => handleClick(index)} />
          }
        })}
      </div>
      <div className="board-row">
          {squares.map((element, index) => {
          if(index < 3 || index > 5) {
            return
          }

          console.log("loaf index",index)
          if (winner.includes(index)) {
            return <Square winOutcome={true} value={squares[index]} handleClick={() => handleClick(index)} />
          } else {
            return <Square winOutcome={false} value={squares[index]} handleClick={() => handleClick(index)} />
          }
        })}
      </div>
      <div className="board-row">
      {squares.map((element, index) => {
          if(index < 6 || index > 8) {
            return
          }

          console.log("loaf index",index)
          if (winner.includes(index)) {
            return <Square winOutcome={true} value={squares[index]} handleClick={() => handleClick(index)} />
          } else {
            return <Square winOutcome={false} value={squares[index]} handleClick={() => handleClick(index)} />
          }
        })}
      </div>
    </>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]) //creates another array filled with nulls that will tract history
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove]; // calculates the current gameboard(squares) by reasing the last squares 
  const xIsNext = currentMove % 2 === 0;// tracks players next move assists in history creation

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(desiredMove) {
     setCurrentMove(desiredMove);
  }

  function check() {
    return history.length > currentMove ? true : false; 
  }
  console.log(history.length, check(), currentMove + 2);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} handlePlay={handlePlay}/>
        <button onClick={() => jumpTo(0)}>Restart Game</button>
      </div>
      <div className="game-info">
        <button disabled={0 < (currentMove) ? false : true} onClick={() => jumpTo(currentMove -1)}>Go Back</button>
      <button disabled={history.length >= (currentMove + 2) ? false : true} onClick={() => jumpTo(currentMove + 1)}>Go Forward</button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  let winnerInfo;
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return [];
}
