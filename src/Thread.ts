
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
const rows: Record<string, string> = {
    '1': '45678',
    '2': '5678',
    '3': '678',
    '4': '78',
    '5': '8'
}

const cols: Record<string, string> = {
    'a': 'defgh',
    'b': 'efgh',
    'c': 'fgh',
    'd': 'gh',
    'e': 'h'
}



const position: string[] = [];

self.onmessage = (e: MessageEvent<string>) => {
    const findProblem = JSON.parse(e.data) as FindProblem;
    const { pieces, fromSquare, nSquares, testFen } = findProblem;

    const chessPosition = testFen ? new Chess(testFen) : new Chess();
    if (!testFen)
        chessPosition.clear();

    // patterns
    let nPatterns = 0
    const applyQueenNightFirewall = pieces.includes('Q') && pieces.includes('N');
    if (applyQueenNightFirewall)
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

    // inside of white or black pieces
    const twoEmptyLines = (pieces: string[]): boolean => { // ['b1', 'd4', 'e4', 'h5']
        const a = pieces.map(square => square.charAt(1)).sort();
        for (let i = 0; i < a.length - 1; i++) {
            if (!['6', '7', '8'].includes(a[i])) {
                if (rows[a[i]].includes(a[i + 1]))
                    return true;
            }
        }
        const b = pieces.map(square => square.charAt(0)).sort();
        for (let i = 0; i < b.length - 1; i++) {
            if (!['f', 'g', 'h'].includes(b[i])) {
                if (cols[b[i]].includes(b[i + 1]))
                    return true;
            }
        }
        return false;
    }

    const columns = "abcdefgh";

    // between white pieces and black king
    const twoEmptyLinesWhitesBlacks = (whitePieces: string[], blackPieces: string[]): boolean => {
        const whiteMaxI = Math.max(...whitePieces.map(square => parseInt(square.charAt(1))));
        const blackMinI = Math.min(...blackPieces.map(square => parseInt(square.charAt(1))));
        if (Math.abs(whiteMaxI - blackMinI) > 1)
            return true;
        const whiteMaxJ = Math.max(...whitePieces.map(square => columns.indexOf(square.charAt(0))));
        const blackMinJ = Math.min(...blackPieces.map(square => columns.indexOf(square.charAt(0))));
        if (Math.abs(whiteMaxJ - blackMinJ) > 1)
            return true;
        return false;
    }

    const diagonal1: string[][] = [
        ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'],
        ['a2', 'b3', 'c4', 'd5', 'e6', 'f7', 'g8'],
        ['a3', 'b4', 'c5', 'd6', 'e7', 'f8'],
        ['a4', 'b5', 'c6', 'd7', 'e8'],
        ['a5', 'b6', 'c7', 'd8'],
        ['a6', 'b7', 'c8'],
        ['a7', 'b8'],
        ['b1', 'c2', 'd3', 'e4', 'f5', 'g6', 'h7'],
        ['c1', 'd2', 'e3', 'f4', 'g5', 'h6'],
        ['d1', 'e2', 'f3', 'g4', 'h5'],
        ['e1', 'f2', 'g3', 'h4'],
        ['f1', 'g2', 'h3'],
        ['g1', 'h2']
    ]

    const diagonal2: string[][] = [
        ['h1', 'g2', 'f3', 'e4', 'd5', 'c6', 'b7', 'a8'],
        ['h2', 'g3', 'f4', 'e5', 'd6', 'c7', 'b8'],
        ['h3', 'g4', 'f5', 'e6', 'd7', 'c8'],
        ['h4', 'g5', 'f6', 'e7', 'd8'],
        ['h5', 'g6', 'f7', 'e8'],
        ['h6', 'g7', 'f8'],
        ['h7', 'g8'],
        ['g1', 'f2', 'e3', 'd4', 'c5', 'b6', 'a7'],
        ['f1', 'e2', 'd3', 'c4', 'b5', 'a6'],
        ['e1', 'd2', 'c3', 'b4', 'a5'],
        ['d1', 'c2', 'b3', 'a4'],
        ['c1', 'b2', 'a3'],
        ['b1', 'a2']
    ]

    const diagonal: Record<string, string[]> = {};
    for(const row of ['1','2','3','4','5','6','7','8']) {
        for(const col of ['a','b','c','d','e','f','g','h']) {
            const square = col+row;
            diagonal[square] = [];
            for(const line of diagonal1) {
                if (line.includes(square))
                    diagonal[square].push(...line.filter(x => x!==square))
            }
            for(const line of diagonal2) {
                if (line.includes(square))
                    diagonal[square].push(...line.filter(x => x!==square))
            }
        }
    }
    const isOnDiagonal = (square1: string, square2: string): boolean => diagonal[square1].includes(square2);


    const isPattern = (board: [({ type: string, color: string, square: string }|null)[]]): boolean => {
        // 1.Pattern: Queen Night firewall
        if (applyQueenNightFirewall) {
            let squareQ = null;
            let squareN = null;
            for (let i = 0; i < 8 && (!squareQ || !squareN); i++) {
                const row = board[i];
                for (let j = 0; j < 8 && (!squareQ || !squareN); j++) {
                    if (row[j]) {
                        const { type, color, square } = row[j]!;
                        if (type === 'q' && color === 'w') {
                            squareQ = square;
                        }
                        else if (type === 'n' && color === 'w') {
                            squareN = square;
                        }
                    }
                }
            }
            if (!squareN || !squareQ) {
                return false; // may Q or N has been taken in the black move
            }
            const jQ = parseInt(squareQ!.charAt(1));
            const iQ = columns.indexOf(squareQ!.charAt(0));
            const jN = parseInt(squareN!.charAt(1));
            const iN = columns.indexOf(squareN!.charAt(0));
            let bRet = (iQ === iN && (Math.abs(jQ - jN) === 2 || Math.abs(jQ - jN) === 4)) ||
                         (jQ === jN && (Math.abs(iQ - iN) === 2 || Math.abs(iQ - iN) === 4));
            if (!bRet) {
                bRet = isOnDiagonal(squareQ, squareN);
            }
            return bRet;
        }
        return false;
    }

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

    const blackKingIndex = findProblem.pieces.indexOf('k');
    let lastCheckmate: string | null = null;

    function getPosition(pieces: string[], index: number): void {
        const piece = pieces.shift();
        const c = piece!.charAt(0);
        const type = c.toLowerCase();
        const color = /[RNBKQP]/.test(c) ? 'w' : 'b';
        const blackKing = c === 'k';
        // console.log(piece)
        for (const square of board) {
            if (!position.includes(square) && !((type === 'p' && (square.includes('8') || square.includes('1'))))) {
                const piecePlaced = chessPosition.put({ type, color }, square);
                const invalidPos = chessPosition.isCheck() ||
                    (blackKing &&
                        (chessPosition.isAttacked(square, 'w') ||
                            square.endsWith('1') || square.endsWith('8') ||
                            square.startsWith('a') || square.startsWith('h'))) ||
                    (color === 'b' && chessPosition.isAttacked(position[0], 'b')); // white 'K' is at position[0]
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
                        }
                        position.push(square);
                        //if (color === 'w' && position.length > 1) {
                        if (index > 0 && index < blackKingIndex) {
                            const whitePieces = position.slice(0, position.length); // TODO keep blackPieces at recursion level
                            whiteEmptyLines = twoEmptyLines(whitePieces);
                        }
                        else if (index >= blackKingIndex) {
                            const blackPieces = position.slice(blackKingIndex, position.length); // TODO keep blackPieces at recursion level
                            if (blackPieces.length > 1) {
                                blackEmptyLines = twoEmptyLines(blackPieces);
                            }
                            if (!blackEmptyLines) {
                                const whitePieces = position.slice(0, blackKingIndex);
                                blackEmptyLines = twoEmptyLinesWhitesBlacks(whitePieces, blackPieces);
                            }
                            if (index === blackKingIndex) {
                                // ignore if white has no check at the first move
                                whiteHasCheck = chessPosition.isAttacked(square, 'w')
                            }
                        }
                        if (!whiteEmptyLines && !blackEmptyLines && !whiteHasCheck) {
                            if (pieces.length === 0) {
                                const fen = chessPosition.fen()
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
                            else {
                                getPosition([...pieces], index + 1);
                            }
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
        getPosition([...findProblem.pieces], 0);
    }
};

export { };
