import { Dispatch, SetStateAction } from "react";
import { move, position } from "~/globaltypes";
import { currentPiece } from "~/pages/MainPage/MainPage";
import { useAppDispatch, useAppSelector } from "~/store/redux";
import { getMoves } from "~/utils/movesLogic";
import { PieceDiv } from "./style";
import { gameSlice } from '~/store/reducers/GameSlice';

type Props = {
    name: string;
    currentPiece: position;
    setPossibleMoves: Dispatch<SetStateAction<move[]>>;
    setCurrentPiece: Dispatch<SetStateAction<currentPiece | null>>;
    position: position;
};

const Piece = (props: Props) => {
    const { name, currentPiece, setPossibleMoves, setCurrentPiece, position } = props;

    const { board, turn, castles, curPiece } = useAppSelector((state) => state.gameReducer);
    const { setCurPiece, toggleShow } = gameSlice.actions
    const dispatch = useAppDispatch()

    const calcMoves = (): void => {
        setPossibleMoves(getMoves(position, board, name, castles));
    };

    const handleClick = (): void => {
        if(name[0] !== turn) return
        const currentId = name + position.x + position.y
        if( curPiece.id === currentId ){
            dispatch(toggleShow())
        }else{
            dispatch(setCurPiece({x: position.x, y: position.y, name: name, id: currentId, isShow: true}))
        }

        if (JSON.stringify(currentPiece) !== JSON.stringify({...position, name}) || !position) {
            calcMoves();
            setCurrentPiece({...position, name});
        } else {
            setPossibleMoves([]);
            setCurrentPiece(null);
        }
    };

    return <PieceDiv onClick={handleClick} src={`/src/assets/pieces/${name}.svg`} x={position.x} y={position.y} />;
};

export default Piece;
