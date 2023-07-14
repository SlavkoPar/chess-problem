import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const [fen, setFen] = useState(testFen ?? "3Q4/4p3/4knK1/4N3/3P4/8/8/8 w - - 0 1");

  const [scrollToBottom, setScrollToBottom] = useState(true);
  const handleChangeScroll = () => {
    setScrollToBottom(!scrollToBottom);
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.Worker) {
      const request = {
        action: testFen ? actions.testFen : actions.findProblem,
        pieces: ['K', 'Q', 'R', 'B', 'N', 'P', 'P', 'P', 'P', 'k', 'r', 'b', 'n', 'p', 'p', 'p', 'p'],
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
          setChessPositions(arr => arr.length > 4 ? [...arr.slice(1, arr.length), response] : [...arr, response])
        }
      };
    }
  }, [getPositions]);

  useEffect(() => {
    // bottomRef.current?.lastElementChild?.scrollIntoView({behavior: 'smooth'});
    if (scrollToBottom) {
      setTimeout(() => {
        const el = bottomRef.current!;
        el.scrollTo({ top: el.scrollHeight - el.clientHeight, behavior: 'smooth' });
      })
    }
  }, [chessPositions, scrollToBottom]);

  // console.log(chessPositions);
  // console.log('rendering...')
  return (
    <div className="fragment">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Chessboard width={150} position={fen} />
      </div>
      <br />
      <label htmlFor="checkbox">
        Scroll to the bottom
        <input type="checkbox" id="checkbox" checked={scrollToBottom} onChange={handleChangeScroll} />
      </label>
      <br />
      <button type="button" onClick={() => { setChessPositions([]) }} >Clear Problems found</button>
      <br />
      <div className="problems" ref={bottomRef}>
        {chessPositions.map((problem, i) =>
          <div key={i} className="row">
            <Chessboard width={150} position={problem.fen} />
            <div style={{ fontSize: '0.7rem' }}>{problem.fen}</div>
            <div style={{ fontSize: '0.8rem' }}>{problem.firstMove}</div>
          </div>)}
      </div>
      <br />
    </div>
  );
};

export default BoardFragment;