
/* eslint-disable no-restricted-globals */
import { FindProblem, TProblem } from "./App";
import {
    Board,
    markWhiteSquareBishops,
    calcWhitePiecesSquare,
    anyWhitePieceInsideOfBlackPiecesSquare,
    emptyLines,
    twoEmptyLinesWhitesBlacks,
    applyNightFirewall,
    columns,
    touchingWhiteKing
} from './helpers'
const { Chess } = require("chess.js");

const regexCheck = new RegExp('[#+]$');
const regexCheckmate = new RegExp('#$');

const position: string[] = [];

self.onmessage = (e: MessageEvent<string>) => {
    const findProblem = JSON.parse(e.data) as FindProblem;
    const { pieces, indexOfBlack, lookingForFen, fromSquare, toSquare, nSquares, testFen } = findProblem;
    const whiteSquareBishops: boolean[] = [];

    const chess = testFen ? new Chess(testFen) : new Chess(lookingForFen);
    if (!testFen) {

        const board = chess.board();
        const whiteBishops = markWhiteSquareBishops(pieces, board, (square: string) => chess.squareColor(square));
        whiteSquareBishops.push(...whiteBishops);

        chess.clear();
    }

    // patterns
    let nPatterns = 0
    const applyQueenNightFirewall = pieces.includes('Q') && pieces.includes('N');
    if (applyQueenNightFirewall)
        nPatterns++;

    const applyBishopNightFirewall = pieces.includes('B') && pieces.includes('N');
    if (applyBishopNightFirewall)
        nPatterns++;

    /*
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
    */
    const board: string[] = [];
    for (const row of Board) {
        board.push(...row);
    }

    const kingBoard: string[] = [];
    let radi = false;
    for (const square of board) {
        if (square === fromSquare) {
            radi = true;
        }
        else if (square === toSquare) {
            kingBoard.push(square);
            radi = false;
        }
        if (radi)
            kingBoard.push(square);
    }


    const isPattern = (board: [({ type: string, color: string, square: string } | null)[]]): boolean => {
        // 1. Pattern: Queen Night firewall
        if (applyQueenNightFirewall) {
            if (applyNightFirewall(board, 'q'))
                return true;
        }
        // 2. Pattern: Bishop Night firewall
        if (applyBishopNightFirewall) {
            if (applyNightFirewall(board, 'b'))
                return true;
        }
        return false;
    }

    // const blackKingIndex = findProblem.pieces.indexOf('k');

    const checkmateIn2 = (): string | null => {
        const whiteMoves1 = chess.moves();
        // white first move must not be the check or checkmate or eat the black piece
        const moves1 = whiteMoves1.filter((m: string) => !regexCheck.test(m) && !m.includes('x'));
        let nMates1 = 0;
        let firstMove: string | null = null;
        let oneOfTheCheckmatesIsPattern = false;
        // one of the moves should be check
        for (const white1 of moves1) {
            // white1 
            chess.move(white1);
            // black 1
            const blackMoves = chess.moves();
            let nMates2 = 0;
            oneOfTheCheckmatesIsPattern = false;
            for (const black of blackMoves) {
                chess.move(black);
                // white 2
                const white2Moves = chess.moves();
                const whiteMates = white2Moves.filter((m: string) => regexCheckmate.test(m) &&
                    !(m.includes('=Q') || m.includes('=R')));
                nMates2 = whiteMates.length;
                if (nMates2 > 0 && nPatterns > 0) {
                    for (const white2 of whiteMates) {
                        chess.move(white2);
                        // is there any of checkmates a pattern?
                        if (isPattern(chess.board())) {
                            oneOfTheCheckmatesIsPattern = true;
                            console.log('black:', black, ' white2:', white2)
                        }
                        chess.undo();
                        if (oneOfTheCheckmatesIsPattern)
                            break;
                    }
                }
                chess.undo();
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
            chess.undo();
        }
        if (testFen)
            console.log(nMates1 === 1 ? 'Position is problem' : 'Position is not problem')
        return nMates1 === 1 ? firstMove : null;
    }

    const whitePieces: { i: number, j: number }[] = [];
    const blackPieces: { i: number, j: number }[] = [];

    let lastCheckmate: string | null = null;

    function getPosition(pieces: string[], index: number): void {
        const piece = pieces.shift();
        const c = piece!.charAt(0);
        const type = c.toLowerCase();
        const pieceColor = /[RNBKQP]/.test(c) ? 'w' : 'b';
        const isBlack = index >= indexOfBlack; // pieceColor === 'b';
        const whiteKing = c === 'K';
        const blackKing = c === 'k';
        const isBishop = type === 'b';
        const whiteSquareBishop = isBishop && whiteSquareBishops[index];
        // console.log(piece)
        const boardMy = whiteKing ? kingBoard : board;
        for (const square of boardMy) {
            if (!position.includes(square) && !((type === 'p' && (square.includes('8') || square.includes('1'))))) {
                const piecePlaced = chess.put({ type, color: pieceColor }, square);
                // white 'K' is at position[0]
                let invalidPos = false;
                if ((isBishop && ((whiteSquareBishop && chess.squareColor(square) === 'dark') ||
                    (!whiteSquareBishop && chess.squareColor(square) === 'light')))
                ) {
                    invalidPos = true;
                }
                if (!invalidPos && isBlack) {
                    console.assert(pieceColor === 'b', 'Should be black piece')
                    if (blackKing) {
                        if (touchingWhiteKing(position[0], square)) {
                            invalidPos = true;
                        }
                        else {
                            if (chess.isAttacked(square, 'w'))
                                invalidPos = true;
                        }
                    }
                    else if (chess.isCheck()) {
                        invalidPos = true;
                        if (['q', 'r', 'b'].includes(type) && !touchingWhiteKing(position[0], square)) {
                            invalidPos = false;
                        }
                    }
                }
                /*invalidPos = chess.isCheck() ||
                    (blackKing &&
                        (chess.isAttacked(square, 'w') ||
                            // square.endsWith('1') || square.endsWith('8') ||
                            // square.startsWith('a') || square.startsWith('h') ||
                            (pieceColor === 'b' && chess.isAttacked(position[0], 'b')))
                    ) ||
                    (isBishop &&
                        ((whiteSquareBishop && chess.squareColor(square) === 'dark') ||
                        (!whiteSquareBishop && chess.squareColor(square) === 'light'))
                    );
                */
                if (invalidPos) {
                    const z = chess.remove(square);
                }
                else {
                    if (piecePlaced) {
                        let whiteEmptyLines = false;
                        let blackEmptyLines = false;
                        //let whiteHasCheck = false;
                        if (blackKing) {
                            lastCheckmate = null;
                            calcWhitePiecesSquare(whitePieces);
                        }
                        position.push(square);
                        if (isBlack) {
                            blackPieces.push({ i: parseInt(square.charAt(1)), j: columns.indexOf(square.charAt(0)) })
                        }
                        else {
                            whitePieces.push({ i: parseInt(square.charAt(1)), j: columns.indexOf(square.charAt(0)) })
                        }

                        //if (color === 'w' && position.length > 1) {
                        //if (index > 0 && index < indexOfBlack) {
                        if (index === indexOfBlack) {
                            // after all the white pieces have been placed
                            whiteEmptyLines = emptyLines(whitePieces);
                        }
                        if (!whiteEmptyLines) {
                            // else if (index >= indexOfBlack) {
                            // else if (blackKing) {
                            //     if (blackPieces.length > 1) {
                            //         // after all the white pieces have been placed
                            //         blackEmptyLines = emptyLines(blackPieces);
                            //     }
                            //     //if (!blackEmptyLines) { // TODO bellow we ask for intersection of white and black pieces
                            //     //    blackEmptyLines = twoEmptyLinesWhitesBlacks(whitePieces, blackPieces);
                            //     //}
                            //     // if (blackKing) {
                            //     //     // TODO Implement this after the move: ignore if white has no check at the first move
                            //     //     whiteHasCheck = chess.isAttacked(square, 'w')
                            //     // }
                            // }
                            //if (!whiteEmptyLines && !blackEmptyLines) { //} && !whiteHasCheck) {
                            // do the job after all the pieces are placed
                            if (pieces.length === 0) {
                                blackEmptyLines = emptyLines(blackPieces);
                                if (!blackEmptyLines) {
                                    const intersection = anyWhitePieceInsideOfBlackPiecesSquare(blackPieces);
                                    if (intersection) {
                                        const fen = chess.fen();
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
                            }
                            else {
                                getPosition([...pieces], index + 1);
                            }
                        }
                        position.pop();
                        if (isBlack) {
                            blackPieces.pop()
                        }
                        else {
                            whitePieces.pop()
                        }
                        const z = chess.remove(square);
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
