
/* eslint-disable no-restricted-globals */
import { FindProblem, TProblem } from "./App";
import { Board, 
    calcWhitePiecesSquare,
    anyWhitePieceInsideOfBlackPiecesSquare,
    twoEmptyLines,
    twoEmptyLinesWhitesBlacks,
    applyNightFirewall,
    columns } from './helpers'
const { Chess } = require("chess.js");

const regexCheck = new RegExp('[#+]$');
const regexCheckmate = new RegExp('#$');

const position: string[] = [];

self.onmessage = (e: MessageEvent<string>) => {
    const findProblem = JSON.parse(e.data) as FindProblem;
    const { pieces, whiteSquareBishops, fromSquare, nSquares, testFen } = findProblem;

    const chessPosition = testFen ? new Chess(testFen) : new Chess();
    if (!testFen)
        chessPosition.clear();

    // patterns
    let nPatterns = 0
    const applyQueenNightFirewall = pieces.includes('Q') && pieces.includes('N');
    if (applyQueenNightFirewall)
        nPatterns++;

    const applyBishopNightFirewall = pieces.includes('B') && pieces.includes('N');
    if (applyBishopNightFirewall)
        nPatterns++;

    let ind = 0;
    let j = 0;
    //const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    for (; j < Board.length; j++) {
        ind = Board[j].indexOf(fromSquare);
        if (ind !== -1) {
            break;
        }
    }
    const ind2 = ind + nSquares;
    const board: string[] = [];
    for (let i = 0; i < nSquares - j; i++) {
        board.push(...Board[j + i].slice(ind, ind2));
    }


    const isPattern = (board: [({ type: string, color: string, square: string } | null)[]]): boolean => {
        // 1.Pattern: Queen Night firewall
        if (applyQueenNightFirewall) {
            if (applyNightFirewall(board, 'q'))
                return true;
        }
        if (applyBishopNightFirewall) {
            if (applyNightFirewall(board, 'b'))
                return true;
        }
        return false;
    }

    const blackKingIndex = findProblem.pieces.indexOf('k');

    const checkmateIn2 = (): string | null => {
        const whiteMoves1 = chessPosition.moves().filter((m: string) => !regexCheck.test(m) && !m.includes('x'));
        let nMates1 = 0;
        let firstMove: string | null = null;
        let oneOfTheCheckmatesIsPattern = false;
        for (const white1 of whiteMoves1) {
            // white1 
            chessPosition.move(white1);
            // black 1
            const blackMoves = chessPosition.moves();
            let nMates2 = 0;
            oneOfTheCheckmatesIsPattern = false;
            for (const black of blackMoves) {
                chessPosition.move(black);
                // white 2
                const white2Moves = chessPosition.moves();
                const whiteMates = white2Moves.filter((m: string) => regexCheckmate.test(m) &&
                    !(m.includes('=Q') || m.includes('=R')));
                nMates2 = whiteMates.length;
                if (nMates2 > 0 && nPatterns > 0) {
                    for (const white2 of whiteMates) {
                        chessPosition.move(white2);
                        // is there any of checkmates a pattern?
                        if (isPattern(chessPosition.board())) {
                            oneOfTheCheckmatesIsPattern = true;
                            console.log('black:', black, ' white2:', white2)
                        }
                        chessPosition.undo();
                        if (oneOfTheCheckmatesIsPattern)
                            break;
                    }
                }
                chessPosition.undo();
                if (nMates2 === 0)
                    break; // second move is not checkmate or there are more than 1 checkmate
            }
            if (nMates2 > 0 && (nPatterns === 0 || oneOfTheCheckmatesIsPattern)) {
                if (testFen)
                    console.log('checkmate at second move', white1)
                nMates1++;
                firstMove = white1;
                console.log('firstMove:', firstMove)
            }
            chessPosition.undo();
        }
        if (testFen)
            console.log(nMates1 === 1 ? 'Position is problem' : 'Position is not problem')
        return nMates1 === 1 ? firstMove : null;
    }

    const whitePieces: {i: number, j: number}[] = [];
    const blackPieces: {i: number, j: number}[] = [];

    let lastCheckmate: string | null = null;

    function getPosition(pieces: string[], index: number): void {
        const piece = pieces.shift();
        const c = piece!.charAt(0);
        const type = c.toLowerCase();
        const pieceColor = /[RNBKQP]/.test(c) ? 'w' : 'b';
        const blackKing = c === 'k';
        const isBishop = type === 'b';
        const whiteSquareBishop = isBishop && whiteSquareBishops[index];
        // console.log(piece)
        for (const square of board) {
            if (!position.includes(square) && !((type === 'p' && (square.includes('8') || square.includes('1'))))) {
                const piecePlaced = chessPosition.put({ type, color: pieceColor }, square);
                // white 'K' is at position[0]
                const invalidPos = chessPosition.isCheck() ||
                    (blackKing &&
                        (chessPosition.isAttacked(square, 'w') ||
                            square.endsWith('1') || square.endsWith('8') ||
                            square.startsWith('a') || square.startsWith('h') ||
                            (pieceColor === 'b' && chessPosition.isAttacked(position[0], 'b')))
                    ) ||
                    (isBishop &&
                        ((whiteSquareBishop && chessPosition.squareColor(square) === 'dark') ||
                            (!whiteSquareBishop && chessPosition.squareColor(square) === 'light'))
                    );
                if (invalidPos) {
                    const z = chessPosition.remove(square);
                }
                else {
                    if (piecePlaced) {
                        let whiteEmptyLines = false;
                        let blackEmptyLines = false;
                        let whiteHasCheck = false;
                        if (blackKing) {
                            lastCheckmate = null;
                            calcWhitePiecesSquare(whitePieces);
                        }
                        position.push(square);
                        if (index < blackKingIndex) {
                            whitePieces.push({i: parseInt(square.charAt(1)), j: columns.indexOf(square.charAt(0)) })
                        }
                        else {
                            blackPieces.push({i: parseInt(square.charAt(1)), j: columns.indexOf(square.charAt(0)) })
                        }

                        //if (color === 'w' && position.length > 1) {
                        if (index > 0 && index < blackKingIndex) {
                            whiteEmptyLines = twoEmptyLines(whitePieces);
                        }
                        else if (index >= blackKingIndex) {
                            if (blackPieces.length > 1) {
                                blackEmptyLines = twoEmptyLines(blackPieces);
                            }
                            if (!blackEmptyLines) {
                                blackEmptyLines = twoEmptyLinesWhitesBlacks(whitePieces, blackPieces);
                            }
                            if (index === blackKingIndex) {
                                // ignore if white has no check at the first move
                                whiteHasCheck = chessPosition.isAttacked(square, 'w')
                            }
                        }
                        if (!whiteEmptyLines && !blackEmptyLines && !whiteHasCheck) {
                            if (pieces.length === 0) {
                                if (anyWhitePieceInsideOfBlackPiecesSquare(blackPieces)) {
                                    const fen = chessPosition.fen();
                                    let firstMove = checkmateIn2();
                                    const isCheckmate = firstMove !== null;
                                    if (isCheckmate) {
                                        if (firstMove === lastCheckmate ||
                                            firstMove!.endsWith('=Q') || firstMove!.endsWith('=R')) {
                                            firstMove = null;
                                        }
                                        else {
                                            lastCheckmate = firstMove;
                                            console.log('------', position, '---', fen);
                                        }
                                    }
                                    const response = { fen, firstMove } as TProblem;
                                    self.postMessage(JSON.stringify(response));
                                    //if (isCheckmate) {
                                    // if white move (Qf7) is checkmate, 
                                    // then ignore every problem, after all black pieces moves (except king), 
                                    // that produces checkmate (Qf7)
                                    //}
                                }
                            }
                            else {
                                getPosition([...pieces], index + 1);
                            }
                        }
                        position.pop();
                        if (index < blackKingIndex) {
                            whitePieces.pop()
                        }
                        else {
                            blackPieces.pop()
                        }
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
        getPosition([...findProblem.pieces], 0);
    }
};

export { };
