import { boardMatrix, position } from "../globaltypes";

const MIN_EDGE = 0;
const MAX_EDGE = 7;

export const pawnMove = (position: position, boardMatrix: boardMatrix) => {
    if (position.y === 0) return [];

    let tempMoves = [];

    const getPos = (x: number, y: number) => {
        return boardMatrix[position.y + y][position.x + x];
    };

    const createMove = (argX: number, argY: number) => {
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

export const rookMove = (position: position, boardMatrix: boardMatrix) => {
    let tempMoves = [];

    console.log(position);
    console.log(boardMatrix);

    const getPos = (x: number, y: number) => {
        return boardMatrix[y][x];
    };

    const createMove = (argX: number, argY: number) => {
        return { x: argX, y: argY };
    };

    for (let i = position.y - 1; i >= MIN_EDGE; i--) {
        if(getPos(position.x, i) === 'e'){
            tempMoves.push(createMove(position.x, i))
        }else break
    }
    for (let i = position.y + 1; i <= MAX_EDGE; i++) {
        if(getPos(position.x, i) === 'e'){
            tempMoves.push(createMove(position.x, i))
        }else break
    }
    for (let i = position.x - 1; i >= MIN_EDGE; i--) {
        if(getPos(i, position.y) === 'e'){
            tempMoves.push(createMove(i, position.y))
        }else break
    }
    for (let i = position.x + 1; i <= MAX_EDGE; i++) {
        if(getPos(i, position.y) === 'e'){
            tempMoves.push(createMove(i, position.y))
        }else break
    }

    console.log(tempMoves)
    return tempMoves;
};
