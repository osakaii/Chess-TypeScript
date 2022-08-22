import { Dispatch, SetStateAction } from "react";
import { boardMatrix, position } from "../../globaltypes";
import { getMoves } from "../../utils/movesLogic";
import { PieceDiv } from "./style";

type Props = {
    name: string;
    currentPiece: position;
    boardMatrix: boardMatrix;
    setPossibleMoves: Dispatch<SetStateAction<position[]>>;
    setCurrentPiece: Dispatch<SetStateAction<position | null>>;
    position: position;
};

const Piece = (props: Props) => {
    const { name, currentPiece, boardMatrix, setPossibleMoves, setCurrentPiece, position } = props;

    const calcMoves = (): void => {
        setPossibleMoves(getMoves(position, boardMatrix, name));
    };

    const handleClick = (): void => {
        if (JSON.stringify(currentPiece) !== JSON.stringify(position) || !position) {
            calcMoves();
            setCurrentPiece(position);
        } else {
            setPossibleMoves([]);
            setCurrentPiece(null);
        }
    };

    return <PieceDiv onClick={handleClick} src={`/src/assets/pieces/${name}.svg`} x={position.x} y={position.y} />;
};

export default Piece;
