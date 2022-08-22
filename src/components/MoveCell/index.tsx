import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from '~/store/redux';
import { position } from "~/globaltypes";
import { gameSlice } from "~/store/reducers/GameSlice";

import MoveSound from "~/assets/sounds/Move.mp3";
import { GreenCircle, PosMove } from './style';

type Props = {
    position: position;
    currentPiece: position;
    setCurrentPiece: Dispatch<SetStateAction<position | null>>;
};



const MoveAudio = new Audio(MoveSound);

const MoveCell = (props: Props) => {
    const dispatch = useAppDispatch()
    const {changeBoard} = gameSlice.actions

    const { position, currentPiece, setCurrentPiece } = props;

    const clickHandler = (): void => {
        dispatch(changeBoard({from: currentPiece,to: position}))
        setCurrentPiece(null)
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


