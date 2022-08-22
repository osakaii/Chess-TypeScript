import gameProps from "~/utils/gameProps";
import GameFieldTexture from "~/components/GameFieldTexture";
import Piece from "~/components/Piece/Piece";
import { useState } from "react";
import Empty from "~/components/Empty";
import MoveCell from "~/components/MoveCell";
import MoveSound from "~/assets/sounds/Move.mp3";
import { boardMatrix, position } from "~/globaltypes";
import { GameField, GameFieldWrapper, MainPageDiv, PosMoves } from "./style";

type Props = {};

const MoveAudio = new Audio(MoveSound);

const MainPage = (props: Props) => {
    const [boardMatrix, setBoardMatrix] = useState<boardMatrix>(gameProps.sizes.startBoardMatrix);
    const [possibleMoves, setPossibleMoves] = useState<position[]>([]);
    const [currentPiece, setCurrentPiece] = useState<position | null>(null);
    

    const movePiece = (moveTo: position): void => {
        setBoardMatrix((prev) =>
            prev.map((rows, indexY) =>
                rows.map((cell, indexX) => {
                    if (indexX === moveTo.x && indexY === moveTo.y) return prev[currentPiece!.y][currentPiece!.x];
                    if (indexX === currentPiece!.x && indexY === currentPiece!.y) return "e";
                    return cell;
                })
            )
        );
        MoveAudio.play();
        setCurrentPiece(null);
    };

    return (
        <MainPageDiv>
            <GameFieldWrapper>
                <GameFieldTexture />
                <GameField>
                    {boardMatrix.map((row, indexY) =>
                        row.map((cell, indexX) => {
                            if (cell !== "e") {
                                return (
                                    <Piece
                                        key={cell + indexX + indexY}
                                        name={cell}
                                        boardMatrix={boardMatrix}
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
                                movePiece={movePiece}
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
