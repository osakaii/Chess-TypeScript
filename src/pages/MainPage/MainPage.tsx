import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store/redux";
import { move, position } from "~/globaltypes";

import Piece from "~/components/Piece";
import Empty from "~/components/Empty";
import MoveCell from "~/components/MoveCell";
import GameFieldTexture from "~/components/GameFieldTexture";

import { GameField, GameFieldWrapper, MainPageDiv, PosMoves } from "./style";
import { gameSlice } from "~/store/reducers/GameSlice";

export type currentPiece = {
    x: number,
    y: number,
    name: string
}

type Props = {};

const MainPage = (props: Props) => {
    const [possibleMoves, setPossibleMoves] = useState<move[]>([]);
    const [currentPiece, setCurrentPiece] = useState<currentPiece | null>(null);

    const dispatch = useAppDispatch()
    
    const {board, piecesMoves, curPiece} = useAppSelector(state => state.gameReducer)
    const {calcPiecesMoves} = gameSlice.actions

    useEffect(() => {
        dispatch(calcPiecesMoves())
    }, [board])

    return (
        <MainPageDiv>
            <GameFieldWrapper>
                <GameFieldTexture />
                <GameField>
                    {board.map((row, indexY) =>
                        row.map((cell, indexX) => {
                            if (cell !== "e") {
                                return (
                                    <Piece
                                        key={cell + indexX + indexY}
                                        name={cell}
                                        currentPiece={currentPiece!}
                                        setPossibleMoves={setPossibleMoves}
                                        setCurrentPiece={setCurrentPiece}
                                        position={{
                                            x: indexX,
                                            y: indexY,
                                        }}
                                    />
                                );
                            } else {
                                return (
                                    <Empty
                                        key={cell + indexX + indexY}
                                        position={{
                                            x: indexX,
                                            y: indexY,
                                        }}
                                    />
                                );
                            }
                        })
                    )}
                </GameField>
                <PosMoves>
                    {curPiece.isShow &&
                        piecesMoves[curPiece.y][curPiece.x]!.map((cell, index) => (
                            <MoveCell
                                key={index}
                                position={cell}
                            />
                        ))}
                </PosMoves>
            </GameFieldWrapper>
        </MainPageDiv>
    );
};

export default MainPage;
