import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance  } from "chess.js/index";
import BoardFragment from "./BoardFragment";

const { Chess } = require("chess.js");

export type TProblem = {
  fen: unknown & string;
  firstMove: string;
};

export type FindProblem = {
  action: string;
  pieces: string[];
  fromSquare: string;
  nSquares: number;
  testFen: string | undefined;
};

const App: React.FC = () => {


  const [chess] = useState<ChessInstance>(
    //new Chess("8/8/8/1p6/2p5/1RK5/k7/8 w - - 0 1")
    //new Chess("3Q4/4p3/4knK1/4N3/3P4/8/8/8 w - - 0 1")
    new Chess("3Q4/8/8/1k2N3/4K3/2R5/8/8 w - - 0 1")
    );
 
  return (
    <>
      <Chessboard width={200} position={chess.fen()} />
      <br/>
      <div className="board-fragments">
        <BoardFragment fromSquare='a8' nSquares={8} />
        <BoardFragment fromSquare='a6' nSquares={8} />
        <BoardFragment fromSquare='a4' nSquares={8} />
        {/* <BoardFragment fromSquare='a5' nSquares={5} /> */}
        {/* testFen="8/8/8/KQP1N3/8/8/kp6/1n6 w - - 0 1" */}
        {/* Qe6 mat 3KQNnk/5P2/8/8/7p/8/8/8 w - - 0 1 */} 
        {/* <BoardFragment fromSquare='d5' nSquares={5} /> */}
      </div>
    </>

    
  );
};

export default App;