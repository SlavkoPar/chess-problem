import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Chessboard from "chessboardjsx";
import { actions } from "./enums";
import { FindProblem, TProblem } from "./App";

interface IProps {
  fromSquare: string,
  toSquare: string,
  nSquares: number;
  lookingForFen: string;
  testFen?: string;
}

const Komp: React.FC<IProps> = ({ lookingForFen, fromSquare, toSquare, nSquares, testFen }: IProps) => {


  const PROBLEMS = `${fromSquare}-PROBLEMS`;

  const [chessPositions, setChessPositions] = useState<TProblem[]>([])

  const [problemsFound, setProblemsFound] = useState<string[]>([])
  localStorage.setItem(PROBLEMS, JSON.stringify(problemsFound))

  const [fen, setFen] = useState(testFen ? testFen : lookingForFen);

  const [scrollToBottom, setScrollToBottom] = useState(true);
  const handleChangeScroll = () => {
    setScrollToBottom(!scrollToBottom);
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const getPieces = (fen: string): { pieces: string[], indexOfBlack: number } => {
      const pieces: string[] = [];
      const s = fen.split(' ')[0];
      for (const p of ['K', 'Q', 'R', 'B', 'N', 'P']) {
        for (const c of s) {
          if (c === p) {
            pieces.push(p);
          }
        }
      }
      const indexOfBlack =  pieces.length;
      for (const p of ['q', 'r', 'b', 'n', 'p', 'k']) { // black king at the end
        for (const c of s) {
          if (c === p) {
            pieces.push(p);
          }
        }
      }

      return { pieces, indexOfBlack };
    }

    if (window.Worker) {
      const { pieces, indexOfBlack } = getPieces(lookingForFen);
      const request = {
        action: testFen ? actions.testFen : actions.findProblem,
        // pieces: ['K', 'Q', 'R', 'N', 'k'],
        pieces,
        indexOfBlack, 
        lookingForFen,
        // put white king at the start
        // put black pieces behind all the white pieces
        // put black king at the end of black pieces 
        // put the pieces in the order KQRBNP
        fromSquare,
        toSquare,
        nSquares,
        testFen
      } as FindProblem;
    }

    return () => {
      console.log('.......... UNMOUNT')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lookingForFen]);

  useEffect(() => {
    if (window.Worker) {
    }

  }, [scrollToBottom]);

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
      <h4>Thread, white king {`${fromSquare}-${toSquare}`}</h4>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}>
        <Chessboard width={150} position={fen} />
      </div>
      <label htmlFor="checkbox">
        Scroll to the bottom
        <input type="checkbox" id="checkbox" checked={scrollToBottom} onChange={handleChangeScroll} />
      </label>
      <h4>Problems</h4>
      <button type="button" onClick={() => {
        localStorage.setItem(PROBLEMS, JSON.stringify(problemsFound))
        setChessPositions([])
      }}>Clear</button>
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

export default Komp;