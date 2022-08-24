import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { boardMatrix, move, position } from "~/globaltypes";
import { currentPiece } from "~/pages/MainPage/MainPage";
import gameProps from "~/utils/gameProps";
import { getMoves } from "~/utils/movesLogic";

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
    x: number,
    y: number,
    name: string,
    id: string,
    isShow: boolean
}

interface GameState {
    board: boardMatrix;
    piecesMoves: move[][][] | null[][];
    turn: string;
    curPiece: curPiece;
    castles: castles;
}

const initialState: GameState = {
    board: gameProps.sizes.startBoardMatrix,
    piecesMoves: [],
    turn: "w",
    curPiece: {
        x: 0,
        y: 0,
        name: "",
        id: "",
        isShow: false
    },
    castles: {
        white00: true,
        white000: true,
        black00: true,
        black000: true,
    },
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
            state.piecesMoves = state.board.map((row, indexY) =>
                row.map((piece, indexX) => piece === "e" ? null : getMoves({ x: indexX, y: indexY }, state.board, piece, state.castles))
            );
        },

        swapTurn(state) {
            state.turn = state.turn === "w" ? "b" : "w";
        },

        setCurPiece(state, action: PayloadAction<curPiece>){
            state.curPiece = action.payload
        },

        toggleShow(state){
            state.curPiece.isShow = !state.curPiece.isShow
        },

        castle(state, action: PayloadAction<keyof castles>) {
            const castleMove: castleMove = (y, kiTo, rTo, kiFrom, rFrom, rook, king) => {
                state.board[y][kiTo] = king;
                state.board[y][rTo] = rook;
                state.board[y][kiFrom] = state.board[y][rFrom] = "e";
            };

            switch (action.payload) {
                case "white00":
                    castleMove(7, 6, 5, 4, 7, "wKi", "wR");
                    break;
                case "white000":
                    castleMove(7, 2, 3, 4, 0, "wKi", "wR");
                    break;
                case "black00":
                    castleMove(0, 6, 5, 4, 7, "bKi", "bR");
                    break;
                case "black000":
                    castleMove(0, 2, 3, 4, 0, "bKi", "bR");
                    break;
            }

            state.castles[action.payload] = false;
        },
    },
});

export default gameSlice.reducer;
