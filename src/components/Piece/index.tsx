import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "~/store/redux";
import { position } from "~/globaltypes";
import { PieceDiv } from "./style";
import { gameSlice } from "~/store/reducers/GameSlice";

type Props = {
    name: string;
    position: position;
};

const Piece = (props: Props) => {
    const { name, position } = props;

    const { turn, curPiece } = useAppSelector((state) => state.gameReducer);
    const { setCurPiece, toggleShow } = gameSlice.actions;
    const dispatch = useAppDispatch();

    const handleClick = (): void => {
        if (name[0] !== turn) return;

        const currentId = name + position.x + position.y;

        if (curPiece.id === currentId) {
            dispatch(toggleShow());
        } else {
            dispatch(setCurPiece({ x: position.x, y: position.y, name: name, id: currentId, isShow: true }));
        }
    };

    return <PieceDiv onClick={handleClick} src={`/src/assets/pieces/${name}.svg`} x={position.x} y={position.y} />;
};

export default Piece;
