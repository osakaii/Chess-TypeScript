import { useState } from "react";
import { useAppSelector, useAppDispatch } from "~/store/redux";
import Piece from "~/components/Piece";
import Empty from "~/components/Empty";
import MoveCell from "~/components/MoveCell";
import { position } from "~/globaltypes";
import { GameField, GameFieldWrapper, MainPageDiv, PosMoves } from "./style";
import GameFieldTexture from "~/components/GameFieldTexture";

type Props = {};

const MainPage = (props: Props) => {
    const [possibleMoves, setPossibleMoves] = useState<position[]>([]);
    const [currentPiece, setCurrentPiece] = useState<position | null>(null);
    
    const {board} = useAppSelector(state => state.gameReducer)

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
                    {currentPiece &&
                        possibleMoves.map((cell, index) => (
                            <MoveCell
                                currentPiece={currentPiece}
                                setCurrentPiece={setCurrentPiece}
                                key={index}
                                position={{
                                    x: cell.x,
                                    y: cell.y,
                                }}
                            />
                        ))}
                </PosMoves>
            </GameFieldWrapper>
        </MainPageDiv>
    );
};

export default MainPage;
