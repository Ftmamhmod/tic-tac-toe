import Player from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { Header } from "./components/Header";
import { useState } from "react";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setplayers] = useState({
    X: "Player1",
    O: "Player2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { sqaure, player } = turn;
    const { row, col } = sqaure;
    gameBoard[row][col] = player;
  }

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function hundelActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { sqaure: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handelRestart() {
    setGameTurns([]);
  }

  function handelPlayerNameChange(symbol, newName) {
    setplayers((prevPlayers) => {
      return {
        ...players,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <Header />
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handelPlayerNameChange}
          />
          <Player
            initialName={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handelPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver onReset={handelRestart} winner={winner} />
        )}
        <GameBoard onSelectSquare={hundelActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
