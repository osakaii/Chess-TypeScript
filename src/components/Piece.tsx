import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import gameProps from "../utils/gameProps";
import { boardMatrix, position } from "../globaltypes";
import { rookMove, pawnMove } from "../utils/movesLogic";

type Props = {
    name: string;
    currentPiece: position;
    boardMatrix: boardMatrix;
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

 

    const calcMoves = (): void => {
      switch(name){
        case 'wP':
          setPossibleMoves(pawnMove(position, boardMatrix));
          break
        case 'wR':
          setPossibleMoves(rookMove(position, boardMatrix));
          break
      }
    };

    const handleClick = (): void => {
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
