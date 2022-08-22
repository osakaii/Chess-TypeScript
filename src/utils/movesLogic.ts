import { boardMatrix, position } from "../globaltypes";

type getPos = (x: number, y: number) => string;
type createMove = (argX: number, argY: number) => position;

const MIN_EDGE = 0;
const MAX_EDGE = 7;

export const getMoves = (position: position, boardMatrix: boardMatrix, name: string) => {
    let tempMoves: any = [];

    const getPos: getPos = (x, y) => {
        return boardMatrix[y][x] ? boardMatrix[y][x] : "";
    };

    const createMove: createMove = (argX, argY) => {
        return { x: argX, y: argY };
    };

    const calcMoves = (x: number, y: number, limit: boolean = false) => {
        for (let i = position.y + y, k = position.x + x; i >= MIN_EDGE && k >= MIN_EDGE && i <= MAX_EDGE && k <= MAX_EDGE; i += y, k += x) {
            if (getPos(k, i) === "e") {
                tempMoves.push(createMove(k, i));
            } else if (!getPos(k, i).includes(name[0])) {
                tempMoves.push(createMove(k, i));
                break;
            } else break;
            if (limit === true) {
                break;
            }
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

    if (name.includes("Q")) {
        for (let i = -1; i <= 1; i++) {
            for (let n = -1; n <= 1; n++) {
                calcMoves(i, n);
            }
        }
    }

    if (name.includes("Ki")) {
        for (let i = -1; i <= 1; i++) {
            for (let n = -1; n <= 1; n++) {
                calcMoves(i, n, true);
            }
        }
    }

    if (name.includes("Kn")) {
        calcMoves(2, 1, true);
        calcMoves(1, 2, true);
        calcMoves(-1, 2, true);
        calcMoves(2, -1, true);
        calcMoves(1, -2, true);
        calcMoves(-1, -2, true);
        calcMoves(-2, -1, true);
        calcMoves(-2, 1, true);
    }

    const { x, y } = position;

    if (name === "wP" && y !== MIN_EDGE) {
        if (getPos(x - 1, y - 1).includes("b")) {
            tempMoves.push(createMove(x - 1, y - 1));
        }
        if (getPos(x + 1, y - 1).includes("b")) {
            tempMoves.push(createMove(x + 1, y - 1));
        }
        if (getPos(x, y - 1) === "e") {
            tempMoves.push(createMove(x, y - 1));
        }
        if(y === 6 && getPos(x, y - 2) === 'e'){
            tempMoves.push(createMove(x, y - 2))
        }
    }

    if (name === "bP" && y !== MAX_EDGE) {
        if (getPos(x - 1, y + 1).includes("w")) {
            tempMoves.push(createMove(x - 1, y + 1));
        }
        if (getPos(x + 1, y + 1).includes("w")) {
            tempMoves.push(createMove(x + 1, y + 1));
        }
        if (getPos(x, y + 1) === "e") {
            tempMoves.push(createMove(x, y + 1));
        }
        if(y === 1 && getPos(x, y + 2) === 'e'){
            tempMoves.push(createMove(x, y + 2))
        }
    }

    return tempMoves;
};
