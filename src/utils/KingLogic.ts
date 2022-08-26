import { boardMatrix, move } from "~/globaltypes"
import { piecesMoves } from "~/store/reducers/GameSlice"
import { getPotentialMoves } from "./movesLogic"

export const calcKingMoves = (piecesMoves: piecesMoves, board: boardMatrix) => {
    for(let key in piecesMoves){
        if(key.includes("Ki")){
            piecesMoves[key] = piecesMoves[key].filter((el: move) => {
                for (let key2 in piecesMoves) {
                    let tempArray = piecesMoves[key2]
                    for(let i = 0; i < tempArray.length; i++){
                        if( el.x === tempArray[i].x && el.y === tempArray[i].y && !key2.includes(key[0])){
                            return false
                        }
                    }
                }
                return true
            })
        }
    }

    for(let key in piecesMoves){
        if(key.includes("B") || key.includes('R') || key.includes("Q")){
            const curPos = {x: Number(key.at(-2)), y: Number(key.at(-1))}
            const potentialMoves = getPotentialMoves(curPos, board, key.slice(0, 2))

            let pressuredPieces: string[] = []

            potentialMoves.forEach((dir) => dir.forEach((el) => {
                if(board[el.y][el.x].includes('Ki')){
                    dir.forEach(el2 => {
                        let pieceInDir = board[el2.y][el2.x]
                        if(pieceInDir !== "e" && !pieceInDir.includes('Ki')) pressuredPieces.push(pieceInDir + el2.x + el2.y)
                    })
                }
            }))

            pressuredPieces.forEach(el => piecesMoves[el] = [])
        }
    }

    return piecesMoves
}