import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js/index";
import NextPosition from "./NextPosition";

const { Chess } = require("chess.js");

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    //new Chess("8/8/8/1p6/2p5/1RK5/k7/8 w - - 0 1")
    new Chess("3Q4/4p3/4knK1/4N3/3P4/8/8/8 w - - 0 1")
  );

  const [chessPositions, setChessPositions] = useState<string[]>([])

  const [firstMove, setFirstMove] = useState<string[]>([]);
  const addProblem = useCallback((fen: string, firstMove: string): void => {
    //setChessPositions([...chessPositions, fen])
    setChessPositions(arr => [...arr, fen])
    setFirstMove(arr => [...arr, firstMove])
  }, [])

  const [fen, setFen] = useState(chess.fen());

  const addFen = useCallback((fen: string): void => {
    setFen(fen)
  }, [])

  // const [chess, setChess] = useState<ChessInstance>(chessPosition);

  // const [fen, setFen] = useState(chess.fen());

  // const handleMove = (move: ShortMove) => {
  //   if (chess.move(move)) {
  //     setTimeout(() => {
  //       const moves = chess.moves();

  //       if (moves.length > 0) {
  //         const computerMove = moves[Math.floor(Math.random() * moves.length)];
  //         chess.move(computerMove);
  //         setFen(chess.fen());
  //       }
  //     }, 300);

  //     setFen(chess.fen());
  //   }
  // }


  // console.log(chessPositions);
  console.log('rendering...')

  return (
    <>
      <Chessboard width={250} position={chess.fen()} />

      <NextPosition addFen={addFen} addProblem={addProblem}/> {/* testFen={chess.fen()} */}


      <div className="flex-center">
        <Chessboard width={250} position={fen} />
        <div>{fen}</div>
        {chessPositions.map((chessPos, i) =>
          <div key={i}>
            <Chessboard width={250} position={chessPos} />
            <div>{firstMove[i]}</div>
          </div>)}
      </div>
    </>

    // onDrop={(move) =>
    //   handleMove({
    //     from: move.sourceSquare,
    //     to: move.targetSquare,
    //     promotion: "q",
    //   })
    // }

  );
};

export default App;