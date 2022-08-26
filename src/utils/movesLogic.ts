
import { boardMatrix, position } from "../globaltypes";
import { castles } from "~/store/reducers/GameSlice";

type getPos = (x: number, y: number) => string;

const MIN_EDGE = 0;
const MAX_EDGE = 7;

export const getMoves = (position: position, boardMatrix: boardMatrix, name: string, castles: castles) => {
    let tempMoves: any = [];

    const getPos: getPos = (x, y) => {
        return boardMatrix[y][x] ? boardMatrix[y][x] : "";
    };

    const createMove = (x: number, y: number, castle: string = ""): { x: number, y: number, castle: string} => {
        return { x, y, castle };
    };

    const calcMoves = (x: number, y: number, limit: boolean = false, castle: string = '') => {
        for (let i = position.y + y, k = position.x + x; i >= MIN_EDGE && k >= MIN_EDGE && i <= MAX_EDGE && k <= MAX_EDGE; i += y, k += x) {
            if (getPos(k, i) === "e") {
                tempMoves.push(createMove(k, i, castle));
            } else if (!getPos(k, i).includes(name[0])) {
                tempMoves.push(createMove(k, i, castle));
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
        if(name[0] === 'w'){
            if(castles.white000 && getPos(0, 7) === "wR") calcMoves(-2, 0, false, "white000")
            if(castles.white00  && getPos(7, 7) === "wR") calcMoves(2, 0, false, "white00")
        }
        if(name[0] === 'b'){
            if(castles.black000 && getPos(0, 0) === "bR") calcMoves(-2, 0, false, "black000")
            if(castles.black00  && getPos(7, 0) === "bR") calcMoves(2, 0, false, "black00")
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

export const getPotentialMoves = (position: position, boardMatrix: boardMatrix, name: string) => {
    let tempMoves: position[][]= [];

    const getPos: getPos = (x, y) => {
        return boardMatrix[y][x] ? boardMatrix[y][x] : "";
    };

    const createMove = (x: number, y: number, castle: string = ""): { x: number, y: number, castle: string} => {
        return { x, y, castle };
    };

    const calcMoves = (x: number, y: number) => {

        let dirMoves = []
        for (let i = position.y + y, k = position.x + x; i >= MIN_EDGE && k >= MIN_EDGE && i <= MAX_EDGE && k <= MAX_EDGE; i += y, k += x) {
            if (getPos(k, i).includes(name[0])) {
                break;
            }
            dirMoves.push(createMove(k, i));
        }
        tempMoves.push(dirMoves)
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
                if( i === 0 && n === 0) continue
                calcMoves(i, n);
            }
        }
    }

    return tempMoves
}