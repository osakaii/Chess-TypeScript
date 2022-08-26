import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import { boardMatrix, move, position } from "~/globaltypes";
import gameProps from "~/utils/gameProps";
import { calcKingMoves } from "~/utils/KingLogic";
import { getMoves } from "~/utils/movesLogic";

type currentPiece = {
    x: number;
    y: number;
    name: string;
};

type movePieceAction = PayloadAction<{
    from: currentPiece;
    to: position;
}>;

type castleMove = (y: number, kiTo: number, rTo: number, kiFrom: number, rFrom: number, rook: string, king: string) => void;

export type castles = {
    white00: boolean;
    white000: boolean;
    black00: boolean;
    black000: boolean;
};

type curPiece = {
    x: number;
    y: number;
    name: string;
    id: string;
    isShow: boolean;
};

export type piecesMoves = {
    [key: string]: move[];
};

interface GameState {
    board: boardMatrix;
    piecesMoves: piecesMoves;
    turn: string;
    curPiece: curPiece;
    castles: castles;
    wCheck: boolean;
    bCheck: boolean;
}

const initialState: GameState = {
    board: gameProps.sizes.startBoardMatrix,
    piecesMoves: {},
    turn: "w",
    curPiece: {
        x: 0,
        y: 0,
        name: "",
        id: "",
        isShow: false,
    },
    castles: {
        white00: true,
        white000: true,
        black00: true,
        black000: true,
    },
    wCheck: false,
    bCheck: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        movePiece({ board, castles }, action: movePieceAction) {
            const { from, to } = action.payload;
            board[to.y][to.x] = board[from.y][from.x];
            board[from.y][from.x] = "e";

            if (from.name === "wKi") {
                castles.white00 = castles.white000 = false;
            }
            if (from.name === "bKi") {
                castles.black00 = castles.black000 = false;
            }
            if (from.name === "wR" && from.x === 7) {
                castles.white00 = false;
            }
            if (from.name === "wR" && from.x === 0) {
                castles.white000 = false;
            }
            if (from.name === "bR" && from.x === 7) {
                castles.black00 = false;
            }
            if (from.name === "bR" && from.x === 0) {
                castles.black000 = false;
            }
        },

        calcPiecesMoves(state) {
            let noChecks = true;

            let tempMoves: piecesMoves = {};

            state.board.forEach((row, y) =>
                row.map((piece, x) => {
                    if (piece !== "e") {
                        let moves = getMoves({ x, y }, state.board, piece, state.castles);
                        moves.forEach((el: move, index: number) => {
                            const cell = state.board[el.y][el.x];
                            if (cell.includes("Ki")) {
                                noChecks = false;
                                cell[0] === "w" ? (state.wCheck = true) : (state.bCheck = true);
                            }
                        });
                        tempMoves[piece + x + y] = moves;
                    }
                })
            );
            
            tempMoves = calcKingMoves(tempMoves, current(state.board))

            state.piecesMoves = tempMoves;
            noChecks && (state.wCheck = state.bCheck = false);
        },

        swapTurn(state) {
            state.turn = state.turn === "w" ? "b" : "w";
        },

        setCurPiece(state, action: PayloadAction<curPiece>) {
            state.curPiece = action.payload;
        },

        toggleShow(state) {
            state.curPiece.isShow = !state.curPiece.isShow;
        },

        castle(state, action: PayloadAction<keyof castles>) {
            const castleMove: castleMove = (y, kiTo, rTo, kiFrom, rFrom, rook, king) => {
                state.board[y][kiTo] = king;
                state.board[y][rTo] = rook;
                state.board[y][kiFrom] = state.board[y][rFrom] = "e";
            };

            switch (action.payload) {
                case "white00":
                    castleMove(7, 5, 6, 4, 7, "wKi", "wR");
                    break;
                case "white000":
                    castleMove(7, 3, 2, 4, 0, "wKi", "wR");
                    break;
                case "black00":
                    castleMove(0, 5, 6, 4, 7, "bKi", "bR");
                    break;
                case "black000":
                    castleMove(0, 3, 2, 4, 0, "bKi", "bR");
                    break;
            }

            state.castles[action.payload] = false;
        },
    },
});

export default gameSlice.reducer;
