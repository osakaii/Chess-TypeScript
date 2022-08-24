import { useAppDispatch, useAppSelector } from '~/store/redux';
import { move } from "~/globaltypes";
import { gameSlice } from "~/store/reducers/GameSlice";

import MoveSound from "~/assets/sounds/Move.mp3";
import { GreenCircle, PosMove } from './style';

type Props = {
    position: move;
};

const MoveAudio = new Audio(MoveSound);

const MoveCell = (props: Props) => {
    const { position } = props;

    const {curPiece} = useAppSelector(state => state.gameReducer)
    const {movePiece, swapTurn, castle, toggleShow} = gameSlice.actions
    const dispatch = useAppDispatch()


    const clickHandler = (): void => {
        if(position.castle){
            dispatch(castle(position.castle))
        }else{
            dispatch(movePiece({from: {x: curPiece.x, y: curPiece.y, name: curPiece.name }, to: position}))
        }
   
        dispatch(swapTurn())
        dispatch(toggleShow())
        MoveAudio.play();
    }

    return (
        <PosMove
            posX={position.x}
            posY={position.y}
            onClick={clickHandler}
        >
            <GreenCircle/>
        </PosMove>
    );
};

export default MoveCell;


