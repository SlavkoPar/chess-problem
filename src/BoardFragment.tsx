import React, { useEffect, useMemo, useState } from "react";
import Chessboard from "chessboardjsx";
import { actions } from "./enums";
import { FindProblem, TProblem } from "./App";

interface IProps {
  fromSquare: string,
  nSquares: number;
  testFen?: string; 
}

const BoardFragment: React.FC<IProps> = ({ fromSquare, nSquares, testFen }: IProps) => {

  const getPositions: Worker = useMemo(() => 
    new Worker(new URL('./Thread.ts', import.meta.url)), []
  );

  const [chessPositions, setChessPositions] = useState<TProblem[]>([])

  const [fen, setFen] = useState(testFen??"3Q4/4p3/4knK1/4N3/3P4/8/8/8 w - - 0 1");
  
  useEffect(() => {
    if (window.Worker) {
      const request = {
        action: testFen ? actions.testFen : actions.findProblem,
        pieces: ['K', 'Q', 'N', 'P', 'k', 'n', 'p'], 
        // put white king at the start
        // put black pices behind all the white pieces
        // put black king as the first of black pieces 
        // put the pieces in the order KQR[BN]P
        fromSquare,
        nSquares,
        testFen 
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
        if (response.firstMove) {
          setChessPositions(arr => [...arr, response])
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
        {chessPositions.map((problem, i) =>
          <div key={i} className="row">
            <Chessboard width={150} position={problem.fen} />
            <div>{problem.fen}</div>
            <div>{problem.firstMove}</div>
          </div>)}
      </div>
      <br />
      <button type="button" onClick={() => { setChessPositions([]) }} >Clear Problems found</button>
    </div>
  );
};

export default BoardFragment;