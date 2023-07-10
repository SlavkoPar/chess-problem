import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js/index";
import NextPosition from "./NextPosition";
import { actions } from "./enums";
import BoardFragment from "./BoardFragment";

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


  const [chess] = useState<ChessInstance>(
    //new Chess("8/8/8/1p6/2p5/1RK5/k7/8 w - - 0 1")
    new Chess("3Q4/4p3/4knK1/4N3/3P4/8/8/8 w - - 0 1")
  );
 
  return (
    <>
      <Chessboard width={200} position={chess.fen()} />
      <br/>
      <div className="board-fragments">
        {/* <BoardFragment fromSquare='a8' nSquares={5} /> */}
        {/* <BoardFragment fromSquare='d8' nSquares={5} /> */}
        <BoardFragment fromSquare='a5' nSquares={5} />
        {/* <BoardFragment fromSquare='d5' nSquares={5} /> */}
      </div>
    </>

    
  );
};

export default App;