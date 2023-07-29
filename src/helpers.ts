export const Board = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']
]

export const columns = "abcdefgh";

export const emptyLines = (pieces: { i: number, j: number }[]): boolean => {
    let a = pieces.map(square => square.i).sort();
    for (let x = 0; x < a.length - 1; x++) {
        if (a[x + 1] - a[x] > 3) {   // a2-a7 means 3 empty lines
            return true;
        }
    }
    a = pieces.map(square => square.j).sort();
    for (let x = 0; x < a.length - 1; x++) {
        if (a[x + 1] - a[x] > 3) {
            return true;
        }
    }
    return false;
}


let iMinW = 9; let iMaxW = -1;
let jMinW = 9; let jMaxW = -1;
export const calcWhitePiecesSquare = (whitePieces: { i: number, j: number }[]): void => {
    iMinW = 9; iMaxW = -1;
    jMinW = 9; jMaxW = -1;
    for (let square of whitePieces) {
        const { i, j } = square;
        if (i < iMinW) iMinW = i;
        if (i > iMaxW) iMaxW = i;
        if (j < jMinW) jMinW = j;
        if (j > jMaxW) jMaxW = j;
    }
}

export const anyWhitePieceInsideOfBlackPiecesSquare = (blackPieces: { i: number, j: number }[]): boolean => {
    for (const square of blackPieces) {
        const { i, j } = square;
        if (i >= iMinW && i <= iMaxW && j >= jMinW && j <= jMaxW) {
            return true;
        }
    }
    return false;
}

// between white pieces and black king
export const twoEmptyLinesWhitesBlacks = (
    whitePieces: { i: number, j: number }[],
    blackPieces: { i: number, j: number }[]): boolean => {
    const whiteMaxI = Math.max(...whitePieces.map(square => square.i));
    const blackMinI = Math.min(...blackPieces.map(square => square.i));
    if (Math.abs(whiteMaxI - blackMinI) > 1)
        return true;
    const whiteMaxJ = Math.max(...whitePieces.map(square => square.j));
    const blackMinJ = Math.min(...blackPieces.map(square => square.j));
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
for (const row of ['1', '2', '3', '4', '5', '6', '7', '8']) {
    for (const col of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
        const square = col + row;
        diagonal[square] = [];
        for (const line of diagonal1) {
            if (line.includes(square))
                diagonal[square].push(...line.filter(x => x !== square))
        }
        for (const line of diagonal2) {
            if (line.includes(square))
                diagonal[square].push(...line.filter(x => x !== square))
        }
    }
}
export const isOnDiagonal = (square1: string, square2: string): boolean => diagonal[square1].includes(square2);

export const applyNightFirewall = (board: [({ type: string, color: string, square: string } | null)[]], queenOrBishop: string): boolean => {
    // 1.Pattern: Queen Night firewall
    let squareQ = null;
    let squareN = null;
    for (let i = 0; i < 8 && (!squareQ || !squareN); i++) {
        const row = board[i];
        for (let j = 0; j < 8 && (!squareQ || !squareN); j++) {
            if (row[j]) {
                const { type, color, square } = row[j]!;
                if (type === queenOrBishop && color === 'w') {
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


export const applyRookKing = (board: [({ type: string, color: string, square: string } | null)[]]): boolean => {
    // 3. Pattern: Rook King
    let whiteKingSquare = null;
    let blackKingSquare = null;
    const rooks: string[] = [];
    for (let i = 0; i < 8; i++) {
        const row = board[i];
        for (let j = 0; j < 8 && (!whiteKingSquare || !blackKingSquare); j++) {
            if (row[j]) {
                const { type, color, square } = row[j]!;
                if (type === 'k') {
                    if (color === 'w')
                        whiteKingSquare = square;
                    else
                        blackKingSquare = square;
                }
                else if (type === 'r' && color === 'w') {
                    rooks.push(square)
                }
            }
        }
    }

    const iWK = parseInt(whiteKingSquare!.charAt(1));
    const jWK = columns.indexOf(whiteKingSquare!.charAt(0));

    const iBK = parseInt(blackKingSquare!.charAt(1));
    const jBK = columns.indexOf(blackKingSquare!.charAt(0));

    if (iWK === iBK && Math.abs(jWK - jBK) === 2) {
        for (const rook of rooks) {
            const jRook = columns.indexOf(rook.charAt(0));
            if (jRook === jBK) {
                return true;
            }
        }
    }
    else if (jWK === jBK && Math.abs(iWK - iBK) === 2) {
        for (const rook of rooks) {
            const iRook = parseInt(rook.charAt(1));
            if (iRook === iBK) {
                return true;
            }
        }
    }

    return false;
}

export const markWhiteSquareBishops = (
    pieces: string[],
    board: [({ type: string, color: string, square: string } | null)[]],
    squareColor: (square: string) => string
) => {
    const whiteSquareBishops: boolean[] = [];

    const taken: boolean[][] = [];
    for (let i = 0; i < 8; i++) {
        taken[i] = [];
        for (let j = 0; j < 8; j++)
            taken[i][j] = false;
    }

    for (const piece of pieces) {
        const pieceColor = ['K', 'Q', 'R', 'B', 'N', 'P'].includes(piece) ? 'w' : 'b';
        const pieceType = piece.toLowerCase();
        let found = false;
        for (let i = 0; i < 8 && !found; i++) {
            const row = board[i];
            for (let j = 0; j < 8 && !found; j++) {
                const p = row[j];
                if (p) {
                    const { type, color, square } = p!;
                    if (type === pieceType && color === pieceColor) {
                        const isWhiteSquare = type === 'b' && !taken[i][j] && squareColor(square) === 'light';
                        taken[i][j] = true;
                        whiteSquareBishops.push(isWhiteSquare);
                        found = true;
                    }
                }
            }
        }
    }

    return whiteSquareBishops;
}

const arroundWhiteKing: Record<string, string[]> = {};

const arrounds = (i: number, j: number): string[] => {
    let arr: string[] = []
    for (let r = i - 1; r <= i + 1; r++) {
        if (r < 1 || r > 8) continue;
        for (let c = j - 1; c <= j + 1; c++) {
            if (c < 0 || r > 7 || (r === i && c === j)) continue;
            arr.push(columns[c] + r);
        }
    }
    return arr;
}

for (let i = 1; i <= 8; i++) {
    for (let j = 0; j < 8; j++) {
        arroundWhiteKing[columns[j] + i] = arrounds(i, j);
    }
}

export const touchingWhiteKing = (whiteKingSquare: string, blackPieceSquare: string): boolean => {
    return arroundWhiteKing[whiteKingSquare].includes(blackPieceSquare);
}

export { };
