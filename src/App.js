import { useState, useEffect } from 'react'
import styles from './styles.module.css'
import './App.css'
import { DispatchCursor, CURSOR_TEXT } from 'haspr-cursor'
/// Install Better-Comments from VSCode Marketplace for a better experience
/// Setup File @ .vscode/settings.json RESTART VSCODE AFTER INSTALLATION

//@ Board and Squares Reusable Component
//` Declared in same file for simplicity
const Board = ({ squares, onClick }) => (
  <div className={styles.board}>
    {squares.map((square, i) => (
      <button key={i} className={styles.square} onClick={() => onClick(i)}>
        {square}
      </button>
    ))}
  </div>
)

//$ Calculate Winner Function
const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

//& Project - Tic Tac Toe Game
export default function App() {
  //$ Animations
  const dispatch = DispatchCursor()

  //$ States
  const [board, setBoard] = useState(Array(9).fill(null)) //` Board State
  const [xIsNext, setXisNext] = useState(true) //` X is Next State
  const [history, setHistory] = useState([]) //` History State for Undo
  const [currentMove, setCurrentMove] = useState(0) //` Current Move State for Undo
  const winner = calculateWinner(board) //` Holds Winner State

  //$ When Winner is Declared
  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        if (window.confirm(`Congratulations 🎉 Winner is ${winner}, Would You Like to Restart Game?`)) {
          restart()
        } else {
          console.log('Cancelled')
        }
      }, 100)
    }
  }, [winner])

  //$ When All squares are filled
  useEffect(() => {
    if (board.every(square => square !== null)) {
      setTimeout(() => {
        if (window.confirm(`Game Over, Would You Like to Restart Game?`)) {
          restart()
        } else {
          console.log('Cancelled')
        }
      }, 100)
    }
  }, [board])

  //$ Helper Functions
  //@ 1: When a Square is clicked
  const handleClick = i => {
    const boardCopy = [...board]
    //@ Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? 'X' : 'O'
    setBoard(boardCopy)
    setXisNext(!xIsNext)
    setHistory(history.concat({ board: boardCopy, xIsNext: !xIsNext }))
    setCurrentMove(history.length + 1 > 0 ? history.length + 1 : 0)
    //@ If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return
  }

  //@ 2: When the "New Game" button is clicked
  const restart = () => {
    setBoard(Array(9).fill(null))
    setXisNext(true)
    setHistory([])
    setCurrentMove(0)
  }

  //@ 3: When the "Go To Move" button is clicked
  const moveTo = move => {
    setBoard(history[move - 1].board)
    setXisNext(history[move - 1].xIsNext)
    setCurrentMove(move - 1)
  }

  //& View
  return (
    <div className="layout">
      {/* //? Heading */}
      <h1>Tic Tac Toe Game</h1>

      {/* //` Main Board of the Game */}
      <Board squares={board} onClick={handleClick} />

      {/* //? Our Helper Buttons */}
      <div className={'layout-buttons'}>
        <label>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</label>

        {/* //@ Restart Game Button */}
        <button onClick={restart} onMouseEnter={() => CURSOR_TEXT(dispatch, 'click me', 'GREEN')} onMouseLeave={() => CURSOR_TEXT(dispatch, 'END')}>
          1. Go To Game Start
        </button>

        {/* //@ Go To Moves Buttons Mapping */}
        {new Array(7).fill(null).map((_, index) => {
          return (
            <button onClick={() => moveTo(index + 1)} onMouseEnter={() => CURSOR_TEXT(dispatch, 'click me')} onMouseLeave={() => CURSOR_TEXT(dispatch, 'END')}>
              {index + 2}. Go to Move #{index + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
