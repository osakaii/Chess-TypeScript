import { Dispatch, SetStateAction } from "react";
import { position } from "~/globaltypes";
import { useAppSelector } from "~/store/redux";
import { getMoves } from "~/utils/movesLogic";
import { PieceDiv } from "./style";

type Props = {
    name: string;
    currentPiece: position;
    setPossibleMoves: Dispatch<SetStateAction<position[]>>;
    setCurrentPiece: Dispatch<SetStateAction<position | null>>;
    position: position;
};

const Piece = (props: Props) => {
    const { name, currentPiece, setPossibleMoves, setCurrentPiece, position } = props;

    const {board} = useAppSelector(state => state.gameReducer)

    const calcMoves = (): void => {
        setPossibleMoves(getMoves(position, board, name));
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
