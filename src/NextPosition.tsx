import React, { useEffect, memo } from "react";

const { Chess } = require("chess.js");

interface IProps {
  addFen: (fen: string) => void;
  addProblem: (fen: string, firstMove: string) => void;
  testFen?: string
}


const NextPosition: React.FC<IProps> = ({ addFen, addProblem, testFen }: IProps) => {

  useEffect(() => {
    console.log("Child rendering ......................")
    // const Pieces = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6']
    // const board = [
    //   'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    //   'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    //   'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    //   'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    //   'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    //   'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    //   'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    //   'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
    // ]

    const chessPosition = testFen ? new Chess(testFen) : new Chess();
    if (!testFen)
      chessPosition.clear();

    const Pieces = ['K', 'Q', 'P', 'N', 'k', 'p', 'n'] // put white king at the start, put black kink behind all the white pieces
    const board = [
      // 'a4', 'b4', 'c4',
      // 'a3', 'b3', 'c3',
      // 'a2', 'b2', 'c2',
      // 'a1', 'b1', 'c1',
      'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
      'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
      'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
      'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
      'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
      'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
      'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
      'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
    ]

    //const position: Record<string, string> = {};
    const position: string[] = [];


    // function getPosition(pieces: string[]): void {
    //   const piece = pieces.shift();
    //   console.log(piece)
    //   for (const square of board) {
    //     if (!position[square]) {
    //       Object.assign(position, { [square]: piece });
    //       if (pieces.length === 0) {
    //         console.log('------', JSON.stringify(position));
    //         delete position[square];
    //       }
    //       else {
    //          getPosition(pieces);
    //       }
    //     }
    //   }
    //   // pieces.unshift(piece!);
    // }

    const regexCheck = new RegExp('[#+]$');
    const regexCheckmate = new RegExp('#$');

    const checkmateIn2 = (): string|null => {
      const whiteMoves1 = chessPosition.moves().filter((m: string) => !regexCheck.test(m) && !m.includes('x'));
      let nMates1 = 0;
      let firstMove: string|null = null;
      for (const white1 of whiteMoves1) {
        // white1 
        chessPosition.move(white1);
        // black 1
        const blackMoves = chessPosition.moves();
        let nMates2 = 0;
        for (const black of blackMoves) {
          chessPosition.move(black);
          // white 2
          nMates2 = chessPosition.moves().filter((m: string) => regexCheckmate.test(m)).length;
          /*
          nMates2 = 0;
          for (const white2 of whiteMoves2) {
            chessPosition.move(white2);
            if (chessPosition.isCheckmate()) {
              nMates2++;
            }
            chessPosition.undo()
            if (nMates2 > 1)
              break;
          }
          */
          chessPosition.undo();
          if (nMates2 !== 1)
            break; // second move is not checkmate or has more than 1 checkmate
        }
        if (nMates2 === 1) {
          console.log('checkmate at second move', white1)
          nMates1++;
          firstMove = white1;
        }

        if (nMates1 > 1)
          break;  // there are more than 1 first move that is a checkmate
        chessPosition.undo();
        if (nMates1 > 1)
          break;
      
      }
      return nMates1 === 1 ? firstMove : null;
    }

    const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

    async function getPosition(pieces: string[]): Promise<any> {
      const piece = pieces.shift();
      const c = piece!.charAt(0);
      const type = c.toLowerCase();
      const color = /[RNBKQP]/.test(c) ? 'w' : 'b';
      console.log(piece)
      for (const square of board) {
        if (!position.includes(square) && !((type === 'p' && (square.includes('8') || square.includes('1'))))) {
          const piecePlaced = chessPosition.put({ type, color }, square);
          if (chessPosition.isCheck() || 
            (c === 'k' && chessPosition.isAttacked(square, 'w')) ||
            (color === 'b' && chessPosition.isAttacked(position[0], 'b'))) { // white 'K' is at position[0]
            const z = chessPosition.remove(square);
          }
          else {
            if (piecePlaced) {
              position.push(square);
              if (pieces.length === 0) {
                const fen = chessPosition.fen()
                console.log('------', position, '---', fen);
                addFen(fen);
                await sleep(1);
                const firstMove = checkmateIn2()
                if (firstMove) {
                  addProblem(fen, firstMove);
                  await sleep(10);
                }
              }
              else {
                await getPosition([...pieces]);
              }
              position.pop();
              const z = chessPosition.remove(square);
              const fen2 = chessPosition.fen();
            }
          }
        }
      }
    }


    if (testFen) {
      console.time()
      if (checkmateIn2())
        addFen(testFen);
      console.timeEnd()
    }
    else {
      getPosition([...Pieces]);
    }

  }, [addFen, testFen]);


  return (
    <div>
      Vrti
    </div>
  );
};

export default memo(NextPosition);