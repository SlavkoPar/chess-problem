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

export const columns = "abcdefgh";

// inside of white or black pieces
export const twoEmptyLines = (pieces: string[]): boolean => { // ['b1', 'd4', 'e4', 'h5']
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

export const anyWhitePieceInsideOfBlackPiecesSquare = (position: string[], blackKingIndex: number): boolean => {
    let iMinB = 9; let iMaxB = -1; 
    let jMinB = 9; let jMaxB = -1;
    for (let i = blackKingIndex; i < position.length; i++) {
        const square = position[i];
        const ii = parseInt(square.charAt(1));
        const jj = columns.indexOf(square.charAt(0));
        if (ii < iMinB) iMinB = ii;
        if (ii > iMaxB) iMaxB = ii;
        if (jj < jMinB) jMinB = jj;
        if (jj > jMaxB) jMaxB = jj;
    }
    for (let i = 0; i < blackKingIndex; i++) {
        const square = position[i];
        const ii = parseInt(square.charAt(1));
        const jj = columns.indexOf(square.charAt(0));
        if (ii >= iMinB && ii <= iMaxB && jj >= jMinB && jj <= jMaxB) {
            return true;
        }
    }
    return false;
}

// between white pieces and black king
export const twoEmptyLinesWhitesBlacks = (whitePieces: string[], blackPieces: string[]): boolean => {
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


export { };
