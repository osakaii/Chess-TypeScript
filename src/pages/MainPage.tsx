import styled from "styled-components";
import gameProps from "../utils/gameProps";
import GameFieldTexture from "../components/GameFieldTexture";
import Piece from "../components/Piece/Piece";
import { useState } from "react";
import Empty from "../components/Empty";
import MoveCell from "../components/MoveCell";
import MoveSound from "../assets/sounds/Move.mp3";
import { boardMatrix, position } from "../globaltypes";

type Props = {};

const MainPage = (props: Props) => {
    const [boardMatrix, setBoardMatrix] = useState<boardMatrix>(
        gameProps.sizes.startBoardMatrix
    );

    const [possibleMoves, setPossibleMoves] = useState<position[]>([]);
    const [currentPiece, setCurrentPiece] = useState<position | null>(null);

    const movePiece = (moveTo: { x: number; y: number }) => {
        setBoardMatrix((prev) =>
            prev.map((rows, indexY) =>
                rows.map((cell, indexX) => {
                    if (indexX === moveTo.x && indexY === moveTo.y)
                        return prev[currentPiece!.y][currentPiece!.x];
                    if (
                        indexX === currentPiece!.x &&
                        indexY === currentPiece!.y
                    )
                        return "e";
                    return cell;
                })
            )
        );
        const MoveAudio = new Audio(MoveSound);
        MoveAudio.play();
        setCurrentPiece(null);
    };

    return (
        <MainPageDiv>
            <Title>Chess</Title>
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

const MainPageDiv = styled.div`
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const GameFieldWrapper = styled.div`
    position: relative;
    width: ${gameProps.sizes.boardWidth}px;
    aspect-ratio: 1/1;
`;

const GameField = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    position: absolute;
    z-index: 3;
`;

const Title = styled.h1`
    color: ${gameProps.colors.brownFont};
`;

const PosMoves = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    position: absolute;
    z-index: 3;
`;
