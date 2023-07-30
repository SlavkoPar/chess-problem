import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance } from "chess.js/index";
import BoardFragment from "./BoardFragment";

import QN1 from './assets/QN1.png';
import QN2 from './assets/QN2.png';
import QN3 from './assets/QN3.png';
import { Select } from "./Select";
import { actions } from "./enums";

const { Chess } = require("chess.js");

export type TProblem = {
  fen: unknown & string;
  firstMove: string;
};


export type FindProblem = {
  action: actions;
  pieces: string[];
  indexOfBlack: number,
  lookingForFen: string;
  fromSquare: string;
  toSquare: string;
  nSquares: number;
  testFen: string | undefined;
};

const App: React.FC = () => {

  const fens = [
    { label: "8/8/8/1P6/8/2p5/1RK5/k7 w - - 0 1", value: 0 },
    { label: "8/8/8/1p6/2p5/1RK5/k7/8 w - - 0 1", value: 1 },
    { label: "3Q4/4p3/4knK1/4N3/3P4/8/8/8 w - - 0 1", value: 2 },
    { label: "8/7n/7r/R5P1/K5k1/3B1N2/5Q2/8 w - - 0 1", value: 3 },
    { label: "3k4/2nBq2n/8/4N1B1/4N3/8/8/1b2K3 w - - 0 1", value: 4 }
  ]
  const fenSelected = 0;

  const [chess, setChess] = useState<ChessInstance>(
    new Chess(fens[0].label)
  );
  console.log('>>>>>>>>> RENDERING APP')

  return (
    <>
      <div className="problem-looking-for">
        <Select
          id="source"
          name="source"
          options={fens}
          onChange={(e, value) => {
            //formik.setFieldValue('source', value)
            setChess(new Chess(fens[value].label))
            // .then(() => { if (editing) formik.submitForm() })
          }}
          value={fenSelected}
          disabled={false}
          classes="text-primary"
        />
        <br/>
        <Chessboard width={200} position={chess.fen()} />
      </div>
      <br />
      <div className="board-fragments">
        <BoardFragment lookingForFen={chess.fen()} fromSquare="a8" toSquare="h7" nSquares={8} />
        {/* testFen="8/8/8/1P6/8/2p5/1RK5/k7 w - - 0 1"  */}
        <BoardFragment lookingForFen={chess.fen()} fromSquare="a6" toSquare="h5" nSquares={8} />
        <BoardFragment lookingForFen={chess.fen()} fromSquare="a4" toSquare="h1" nSquares={8} />
      </div>
      <div>
        <h3>To decrease number of problems generated, we apply the following rules</h3>
        <ul>
          <li>
            Solution must not start with check
          </li>
          <li>
            Avoid King or Rook promotions at the first and second white move
          </li>
          <li>
            Ignore the positions where white has no check at the first move
          </li>
          <li>
            When white move (i.e. Qf7) is checkmate, <br />
            then ignore problems, after all black pieces moves (except the king), <br />
            that produce the same checkmate (Qf7)<br />
          </li>
          <li>
            Ignore positions with 2 or more empty lines (rows or columns) between white pieces
          </li>
          <li>
            Ignore positions with 2 or more empty lines (rows or columns) between black pieces
          </li>
          <li>
            Ignore positions with 2 or more empty lines (rows or columns) between white and black pieces
          </li>
          <li>
            Ignore positions with no white pieces inside of black pieces square
          </li>
          <li>Ignore checkmates with promotion of a white pawn to Queen or Rook, move with: (=Q or =R)</li>
          <li>
            When white has Queen and Night, prefer the final pictures like these:
            <ul>
              <li>(Q or Bishop) and N at the same line, 1 line between<br />
                <img width="180" height="180" src={QN3} alt="QN"></img>
              </li>
              <li>(Q or Bishop) and N at the same line, 3 lines between<br />
                <img width="180" height="180" src={QN1} alt="QN"></img>
              </li>
              <li>(Q or Bishop) and N at the same diagonal<br />
                <img width="180" height="180" src={QN2} alt="QN"></img>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default App;