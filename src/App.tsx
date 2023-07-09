import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js/index";
import NextPosition from "./NextPosition";
import { actions } from "./enums";

const { Chess } = require("chess.js");

export type TProblem = {
  loading: boolean;
  fen: unknown & string;
  isCheckmate: boolean;
  firstMove: string;
};

export type FindProblem = {
  action: string;
  pieces: string[];
  fromSquare: string;
  nSquares: number;
};

const App: React.FC = () => {

  const boardFragment: Worker = useMemo(() => new Worker(new URL("./Thread.ts", import.meta.url)), []);
  const boardFragment2: Worker = useMemo(() => new Worker(new URL("./Thread.ts", import.meta.url)), []);

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
  const [fen2, setFen2] = useState(chess.fen());

  const addFen = useCallback((fen: string): void => {
    setFen(fen)
  }, [])

  const addFen2 = useCallback((fen: string): void => {
    setFen(fen2)
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

  useEffect(() => {
    if (window.Worker) {
      const request = {
        action: actions.findProblem,
        pieces: ['K', 'Q', 'P', 'N', 'k', 'p', 'n'], // put white king at the start, put black kink behind all the white pieces
        fromSquare: 'a8',
        nSquares: 5
      } as FindProblem;

     // boardFragment.postMessage(JSON.stringify(request));

      const request2 = {
        action: actions.findProblem,
        pieces: ['K', 'Q', 'P', 'N', 'k', 'p', 'n'], // put white king at the start, put black kink behind all the white pieces
        fromSquare: 'd8',
        nSquares: 5
      } as FindProblem;

      boardFragment2.postMessage(JSON.stringify(request2));
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.Worker) {
      boardFragment.onmessage = (e: MessageEvent<string>) => {
        const response = JSON.parse(e.data) as unknown as TProblem;
        // console.log({ response });

        setFen(response.fen)

        if (response.isCheckmate) {
          setChessPositions(arr => [...arr, response.fen])
          setFirstMove(arr => [...arr, response.firstMove])
        }
      };
    }

    boardFragment2.onmessage = (e: MessageEvent<string>) => {
      const response = JSON.parse(e.data) as unknown as TProblem;
      // console.log({ response });

      setFen2(response.fen)

      if (response.isCheckmate) {
        setChessPositions(arr => [...arr, response.fen])
        setFirstMove(arr => [...arr, response.firstMove])
      }
    };

  }, [boardFragment, boardFragment2]);

  // console.log(chessPositions);
  // console.log('rendering...')

  return (
    <>
      <Chessboard width={250} position={chess.fen()} />
      <br/>

      {/* <NextPosition addFen={addFen} addProblem={addProblem}/> */}
       {/* testFen={chess.fen()} */}

      <button type="button" onClick={() => { setChessPositions([])}} >Clear Checkmates</button>
      <br/>
      <div className="flex-center">
        {/* <Chessboard width={250} position={fen} /> */}
        <br/>
        <Chessboard width={250} position={fen2} />
        <br/>
        <div>{fen}</div>
        {chessPositions.map((chessPos, i) =>
          <div key={i}>
            <Chessboard width={150} position={chessPos} />
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