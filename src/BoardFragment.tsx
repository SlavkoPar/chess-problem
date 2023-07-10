import React, { useEffect, useMemo, useState } from "react";
import Chessboard from "chessboardjsx";
import { actions } from "./enums";
import { FindProblem, TProblem } from "./App";

interface IProps {
  fromSquare: string,
  nSquares: number;
}

const BoardFragment: React.FC<IProps> = ({fromSquare, nSquares }: IProps) => {

  const getPositions: Worker = useMemo(() => 
    new Worker(new URL('./Thread.ts', import.meta.url)), []
  );

  const [chessPositions, setChessPositions] = useState<string[]>([])
  const [firstMove, setFirstMove] = useState<string[]>([]);

  const [fen, setFen] = useState("3Q4/4p3/4knK1/4N3/3P4/8/8/8 w - - 0 1");
  
  useEffect(() => {
    if (window.Worker) {
      const request = {
        action: actions.findProblem,
        pieces: ['K', 'Q', 'P', 'N', 'k', 'p', 'n'], // put white king at the start, put black kink behind all the white pieces
        fromSquare,
        nSquares 
      } as FindProblem;
      getPositions.postMessage(JSON.stringify(request));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.Worker) {
      getPositions.onmessage = (e: MessageEvent<string>) => {
        const response = JSON.parse(e.data) as unknown as TProblem;
        // console.log({ response });
        setFen(response.fen)
        if (response.isCheckmate) {
          setChessPositions(arr => [...arr, response.fen])
          setFirstMove(arr => [...arr, response.firstMove])
        }
      };
    }
  }, [getPositions]);

  // console.log(chessPositions);
  // console.log('rendering...')

  return (
    <div className="fragment">
      <Chessboard width={150} position={fen} />
      <br />
      <br />
      <div className="problems">
        {chessPositions.map((fen, i) =>
          <div key={i} className="row">
            <Chessboard width={150} position={fen} />
            <div>{fen}</div>
            <div>{firstMove[i]}</div>
          </div>)}
      </div>
      <br />
      <button type="button" onClick={() => { setChessPositions([]) }} >Clear Problems found</button>
    </div>
  );
};

export default BoardFragment;