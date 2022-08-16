import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import gameProps from "../utils/gameProps";
import { position } from "../globaltypes";

type Props = {
    name: string;
    currentPiece: position;
    boardMatrix: string[][];
    setPossibleMoves: Dispatch<SetStateAction<position[]>>;
    setCurrentPiece: Dispatch<SetStateAction<position | null>>;
    position: {
        x: number;
        y: number;
    };
};

const Piece = (props: Props) => {
    const {
        name,
        currentPiece,
        boardMatrix,
        setPossibleMoves,
        setCurrentPiece,
        position,
    } = props;

    const pawnMove = () => {
        if (position.y === 0){
          setPossibleMoves([])
          return
        };
        let tempMoves = [];
        if (
            boardMatrix[position.y - 1][position.x - 1] !== "e" &&
            position.x !== 0
        ) {
            tempMoves.push({ x: position.x - 1, y: position.y - 1 });
        }
        if (
            boardMatrix[position.y - 1][position.x + 1] !== "e" &&
            position.x !== 7
        ) {
            tempMoves.push({ x: position.x + 1, y: position.y - 1 });
        }
        if (boardMatrix[position.y - 1][position.x] === "e") {
            tempMoves.push({ x: position.x, y: position.y - 1 });
        }
        setPossibleMoves(tempMoves);
    };

    const calcMoves = () => {
            pawnMove();
            return;
    };

    const handleClick = () => {

        if (
            JSON.stringify(currentPiece) !== JSON.stringify(position) ||
            !position
        ) {
            calcMoves();
            setCurrentPiece(position);
        } else {
            setPossibleMoves([]);
            setCurrentPiece(null);
        }
    };

    return (
        <PieceDiv
            onClick={handleClick}
            src={`/src/assets/pieces/${name}.svg`}
            x={position.x}
            y={position.y}
        />
    );
};

export default Piece;

const PieceDiv = styled.img<position>`
    width: ${gameProps.sizes.CellWidth}px;
    position: absolute;
    z-index: 3;
    cursor: pointer;
    left: ${(props) => props.x * gameProps.sizes.CellWidth}px;
    top: ${(props) => props.y * gameProps.sizes.CellWidth}px;
`;
