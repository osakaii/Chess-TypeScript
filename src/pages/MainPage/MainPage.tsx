import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store/redux";

import Piece from "~/components/Piece";
import Empty from "~/components/Empty";
import MoveCell from "~/components/MoveCell";
import GameFieldTexture from "~/components/GameFieldTexture";

import { Check, GameField, GameFieldWrapper, MainPageDiv, PosMoves } from "./style";
import { gameSlice } from "~/store/reducers/GameSlice";

type Props = {};

const MainPage = (props: Props) => {
    const { board, piecesMoves, curPiece, wCheck, bCheck } = useAppSelector((state) => state.gameReducer);
    const { calcPiecesMoves } = gameSlice.actions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(calcPiecesMoves());
    }, [board]);

    return (
        <MainPageDiv>
            {
                (wCheck || bCheck) && <Check>Check</Check>
            }
            <GameFieldWrapper>
                <GameFieldTexture />
                <GameField>
                    {board.map((row, indexY) =>
                        row.map((cell, indexX) => {
                            let position = {x: indexX, y: indexY}
                            if (cell !== "e") {
                                return (
                                    <Piece
                                        key={cell + indexX + indexY}
                                        name={cell}
                                        position={position}
                                    />
                                );
                            } else {
                                return (
                                    <Empty
                                        key={cell + indexX + indexY}
                                        position={position}
                                    />
                                );
                            }
                        })
                    )}
                </GameField>
                <PosMoves>
                    {
                        curPiece.isShow && piecesMoves[curPiece.id]!.map((cell, index) => 
                            <MoveCell key={index} position={cell} />
                        )
                    }
                </PosMoves>
            </GameFieldWrapper>
        </MainPageDiv>
    );
};

export default MainPage;
