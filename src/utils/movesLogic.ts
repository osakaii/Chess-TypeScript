import { boardMatrix, position } from "../globaltypes";

type getPos = (x: number, y: number) => string;
type createMove = (argX: number, argY: number) => { x: number; y: number };

const MIN_EDGE = 0;
const MAX_EDGE = 7;

export const pawnMove = (position: position, boardMatrix: boardMatrix) => {
    if (position.y === 0) return [];

    let tempMoves = [];

    const getPos: getPos = (x, y) => {
        return boardMatrix[position.y + y][position.x + x];
    };

    const createMove: createMove = (argX, argY) => {
        return { x: position.x + argX, y: position.y + argY };
    };

    if (getPos(-1, -1) !== "e" && position.x !== MIN_EDGE) {
        tempMoves.push(createMove(-1, -1));
    }
    if (getPos(1, -1) !== "e" && position.x !== MAX_EDGE) {
        tempMoves.push(createMove(1, -1));
    }
    if (getPos(0, -1) === "e") {
        tempMoves.push(createMove(0, -1));
    }

    return tempMoves;
};

// export const rookMove = (position: position, boardMatrix: boardMatrix, name: string) => {
//     let tempMoves = [];

//     const getPos: getPos = (x, y) => {
//         return boardMatrix[y][x];
//     };

//     const createMove: createMove = (argX, argY) => {
//         return { x: argX, y: argY };
//     };

//     // !getPos(position.x, i).includes(name[0]) проверка является ли фигура врагом или добряком

//     for (let i = position.y - 1; i >= MIN_EDGE; i--) {
//         if (getPos(position.x, i) === "e") {
//             tempMoves.push(createMove(position.x, i));
//         } else if (!getPos(position.x, i).includes(name[0])) {
//             tempMoves.push(createMove(position.x, i));
//             break;
//         } else break;
//     }
//     for (let i = position.y + 1; i <= MAX_EDGE; i++) {
//         if (getPos(position.x, i) === "e") {
//             tempMoves.push(createMove(position.x, i));
//         } else if (!getPos(position.x, i).includes(name[0])) {
//             tempMoves.push(createMove(position.x, i));
//             break;
//         } else break;
//     }
//     for (let i = position.x - 1; i >= MIN_EDGE; i--) {
//         if (getPos(i, position.y) === "e") {
//             tempMoves.push(createMove(i, position.y));
//         } else if (!getPos(i, position.y).includes(name[0])) {
//             tempMoves.push(createMove(i, position.y));
//             break;
//         } else break;
//     }
//     for (let i = position.x + 1; i <= MAX_EDGE; i++) {
//         if (getPos(i, position.y) === "e") {
//             tempMoves.push(createMove(i, position.y));
//         } else if (!getPos(i, position.y).includes(name[0])) {
//             tempMoves.push(createMove(i, position.y));
//             break;
//         } else break;
//     }

//     return tempMoves;
// };

// export const bishopMove = (position: position, boardMatrix: boardMatrix, name: string) => {
//     let tempMoves: any = [];

//     const getPos: getPos = (x, y) => {
//         return boardMatrix[y][x];
//     };

//     const createMove: createMove = (argX, argY) => {
//         return { x: argX, y: argY };
//     };

//     const calcBishopMoves = (x: number, y: number) => {
//         for (let i = position.y + y, k = position.x + x; i >= MIN_EDGE && k >= MIN_EDGE && i <= MAX_EDGE && k <= MAX_EDGE; i += y, k += x) {
//             if (getPos(k, i) === "e") {
//                 tempMoves.push(createMove(k, i));
//             } else if (!getPos(k, i).includes(name[0])) {
//                 tempMoves.push(createMove(k, i));
//                 break;
//             } else break;
//         }
//     };

//     calcBishopMoves(-1, -1);

//     calcBishopMoves(-1, 1);

//     calcBishopMoves(1, -1);

//     calcBishopMoves(1, 1);

//     return tempMoves;
// };

export const getMoves = (position: position, boardMatrix: boardMatrix, name: string) => {
    let tempMoves: any = [];

    const getPos: getPos = (x, y) => {
        return boardMatrix[y][x];
    };

    const createMove: createMove = (argX, argY) => {
        return { x: argX, y: argY };
    };

    const calcMoves = (x: number, y: number) => {
        for (let i = position.y + y, k = position.x + x; i >= MIN_EDGE && k >= MIN_EDGE && i <= MAX_EDGE && k <= MAX_EDGE; i += y, k += x) {
            if (getPos(k, i) === "e") {
                tempMoves.push(createMove(k, i));
            } else if (!getPos(k, i).includes(name[0])) {
                tempMoves.push(createMove(k, i));
                break;
            } else break;
        }
    };

    if (name.includes("R")) {
        calcMoves(1, 0);
        calcMoves(-1, 0);
        calcMoves(0, 1);
        calcMoves(0, -1);
    }
    if (name.includes("B")) {
        calcMoves(-1, -1);
        calcMoves(-1, 1);
        calcMoves(1, -1);
        calcMoves(1, 1);
    }

    return tempMoves
};
