import React, { useEffect, useMemo, useRef, useState } from "react";
import Chessboard from "chessboardjsx";
import { actions } from "./enums";
import { FindProblem, TProblem } from "./App";

interface IProps {
  fromSquare: string,
  nSquares: number;
  lookingForFen: string;
  testFen?: string;
}

const BoardFragment: React.FC<IProps> = ({ lookingForFen, fromSquare, nSquares, testFen }: IProps) => {

  const thread: Worker = useMemo(() =>
    new Worker(new URL('./Thread.ts', import.meta.url)), []
  );

  const [chessPositions, setChessPositions] = useState<TProblem[]>([])

  const [problemsFound, setProblemsFound] = useState<string[]>([])
  localStorage.setItem('PROBLEMS-FOUND', JSON.stringify(problemsFound))

  const [fen, setFen] = useState(testFen ? testFen : lookingForFen);

  const [scrollToBottom, setScrollToBottom] = useState(true);
  const handleChangeScroll = () => {
    setScrollToBottom(!scrollToBottom);
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const getPieces = (fen: string): { pieces:string[], whiteSquareBishops: boolean[]} => {
      const pieces: string[] = [];
      const whiteSquareBishops: boolean[] = [];
      const s = fen.split(' ')[0];
      for (const p of ['K', 'Q', 'R', 'B', 'N', 'P']) {
        for (const c of s) {
          if (c === p) {
            pieces.push(p);
            const bishopDraggedOnWhiteSquare = true;
            whiteSquareBishops.push(p === 'B' ? bishopDraggedOnWhiteSquare : false)
          }
        }
      }
      for (const p of ['k', 'q', 'r', 'b', 'n', 'p']) {
        for (const c of s) {
          if (c === p) {
            pieces.push(p);
            const bishopDraggedOnWhiteSquare = false;
            whiteSquareBishops.push(p === 'b' ? bishopDraggedOnWhiteSquare : false)
          }
        }
      }

      return { pieces, whiteSquareBishops };
    }

    if (window.Worker) {
      const { pieces, whiteSquareBishops } = getPieces(lookingForFen);
      const request = {
        action: testFen ? actions.testFen : actions.findProblem,
        // pieces: ['K', 'Q', 'R', 'N', 'k'],
        pieces,
        whiteSquareBishops,
        // put white king at the start
        // put black pices behind all the white pieces
        // put black king as the first of black pieces 
        // put the pieces in the order KQRBNP
        fromSquare,
        nSquares,
        testFen
      } as FindProblem;
      thread.postMessage(JSON.stringify(request));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.Worker) {
      thread.onmessage = (e: MessageEvent<string>) => {
        const response = JSON.parse(e.data) as unknown as TProblem;
        // console.log({ response });
        setFen(response.fen)
        if (response.firstMove) {
          setProblemsFound(arr => [...arr, e.data]);
          setChessPositions(arr => arr.length > 30
            ? [response]
            : arr.length > 4 && scrollToBottom
              ? [...arr.slice(1, arr.length), response]
              : [...arr, response]);
        }
      };
    }
  }, [thread, scrollToBottom]);

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Chessboard width={150} position={fen} />
      </div>
      <br />
      <label htmlFor="checkbox">
        Scroll to the bottom
        <input type="checkbox" id="checkbox" checked={scrollToBottom} onChange={handleChangeScroll} />
      </label>
      <br />
      <button type="button" onClick={() => {
        localStorage.setItem('PROBLEMS-FOUND', JSON.stringify(problemsFound))
        setChessPositions([])
      }}>Clear Problems found</button>
      <br />
      <div className="problems" ref={bottomRef}>
        {chessPositions.map((problem, i) =>
          <div key={i} className="row">
            <Chessboard width={150} position={problem.fen} />
            <div>{problem.fen}</div>
            <div>{problem.firstMove}</div>
          </div>)}
      </div>
      <br />
    </div>
  );
};

export default BoardFragment;