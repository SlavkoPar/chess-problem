
/* eslint-disable no-restricted-globals */
import { FindProblem, TProblem } from "./App";
import { actions } from "./enums";

const { Chess } = require("chess.js");

const Board = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
]

const regexCheck = new RegExp('[#+]$');
const regexCheckmate = new RegExp('#$');

const position: string[] = [];

self.onmessage = (e: MessageEvent<string>) => {
    const findProblem = JSON.parse(e.data) as FindProblem;
    const { fromSquare, nSquares, testFen } = findProblem;

    const chessPosition = testFen ? new Chess(testFen) : new Chess();
    if (!testFen)
        chessPosition.clear();

    let index = 0;
    let j = 0;
    //const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    for (; j < Board.length; j++) {
        index = Board[j].indexOf(fromSquare);
        if (index !== -1) {
            break;
        }
    }
    const index2 = index + nSquares;
    const board = [
        ...Board[j + 0].slice(index, index2),
        ...Board[j + 1].slice(index, index2),
        ...Board[j + 2].slice(index, index2),
        ...Board[j + 3].slice(index, index2),
        ...Board[j + 4].slice(index, index2)
    ]

    const checkmateIn2WAS = (): string | null => {
        const whiteMoves1 = chessPosition.moves().filter((m: string) => !regexCheck.test(m) && !m.includes('x'));
        let nMates1 = 0;
        let firstMove: string | null = null;
        for (const white1 of whiteMoves1) {
            // white1 
            chessPosition.move(white1);
            // black 1
            const blackMoves = chessPosition.moves();
            let nMates2 = 0;
            for (const black of blackMoves) {
                chessPosition.move(black);
                // white 2
                const white2Moves = chessPosition.moves();
                nMates2 = white2Moves.filter((m: string) => regexCheckmate.test(m)).length;
                chessPosition.undo();
                if (nMates2 !== 1)
                    break; // second move is not checkmate or there are more than 1 checkmate
            }
            if (nMates2 === 1) {
                console.log('checkmate at second move', white1)
                nMates1++;
                firstMove = white1;
            }
            chessPosition.undo();
            if (nMates1 > 1) // there are more than 1 first move that is a checkmate
                break;
        }
        return nMates1 === 1 ? firstMove : null;
    }

    // White can have more than 1 checkmates as the second move
    // 8/8/8/KQP1N3/8/8/kp6/1n6 w - - 0 1, example on 1. Sd3 ... 2. (d4 and db2)

    const checkmateIn2 = (): string | null => {
        const whiteMoves1 = chessPosition.moves().filter((m: string) => !regexCheck.test(m) && !m.includes('x'));
        let nMates1 = 0;
        let firstMove: string | null = null;
        for (const white1 of whiteMoves1) {
            // white1 
            chessPosition.move(white1);
            // black 1
            const blackMoves = chessPosition.moves();
            let nMates2 = 0;
            for (const black of blackMoves) {
                chessPosition.move(black);
                // white 2
                const white2Moves = chessPosition.moves();
                nMates2 = white2Moves.filter((m: string) => regexCheckmate.test(m)).length;
                chessPosition.undo();
                if (nMates2 === 0)
                    break; // second move is not checkmate or there are more than 1 checkmate
            }
            if (nMates2 > 0) {
                if (testFen)
                    console.log('checkmate at second move', white1)
                nMates1++;
                firstMove = white1;
            }
            chessPosition.undo();
            // if (nMates1 > 1) // there are more than 1 first move that is a checkmate
            //    break;
        }
        if (testFen)
            console.log(nMates1 === 1 ? 'Position is problem' : 'Position is not problem')
        return nMates1 === 1 ? firstMove : null;
    }

    let lastCheckmate: string | null = null;

    function getPosition(pieces: string[]): void {
        const piece = pieces.shift();
        const c = piece!.charAt(0);
        const type = c.toLowerCase();
        const color = /[RNBKQP]/.test(c) ? 'w' : 'b';
        // console.log(piece)
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
                        if (c === 'k') {
                            lastCheckmate = null;
                        }
                        position.push(square);
                        if (pieces.length === 0) {
                            const fen = chessPosition.fen()
                            console.log('------', position, '---', fen);
                            let firstMove = checkmateIn2();
                            const isCheckmate = firstMove !== null;
                            if (isCheckmate) {
                                if (firstMove === lastCheckmate) {
                                    firstMove = null;
                                }
                                else {
                                    lastCheckmate = firstMove;
                                }
                            }
                            const response = {
                                fen,
                                firstMove
                            } as TProblem;
                            self.postMessage(JSON.stringify(response));
                            //if (isCheckmate) {
                                // if white move (Qf7) is checkmate, 
                                // then ignore every problem, after all black pieces moves (except king), 
                                // that produces checkmate (Qf7)
                            //}
                        }
                        else {
                            getPosition([...pieces]);
                        }
                        position.pop();
                        const z = chessPosition.remove(square);
                        // const fen2 = chessPosition.fen();
                    }
                }
            }
        }
    }


    if (fromSquare === "") {
        console.log('Invalid fromSquare')
    }
    else if (testFen) {
        console.time()
        const firstMove = checkmateIn2();
        const response = {
            fen: testFen,
            firstMove
        } as TProblem;
        self.postMessage(JSON.stringify(response));
        console.timeEnd()
    }
    else {
        getPosition([...findProblem.pieces]);
    }
};

export { };
