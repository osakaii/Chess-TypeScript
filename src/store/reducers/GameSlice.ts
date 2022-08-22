import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boardMatrix, position } from "~/globaltypes"
import gameProps from '~/utils/gameProps';

interface GameState{
    board: boardMatrix;
}

type changeBoardAction = PayloadAction<{
    from: position,
    to: position;
}>

const initialState: GameState = {
    board: gameProps.sizes.startBoardMatrix,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeBoard(state, action: changeBoardAction){
            const {from, to} = action.payload
            state.board[to.y][to.x] = state.board[from.y][from.x]
            state.board[from.y][from.x] = "e"
        }
    }
})

export default gameSlice.reducer