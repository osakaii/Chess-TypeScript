import React from "react";
import styled from "styled-components";
import gameProps from "../utils/gameProps";

type Props = {
    position: {
        x: number;
        y: number;
    };
    movePiece: (moveTo: { x: number; y: number }) => void;
};

interface ShadowedProps {
    posX: number;
    posY: number;
}

const MoveCell = (props: Props) => {
    const { position, movePiece } = props;
    return (
        <PosMove
            posX={position.x}
            posY={position.y}
            onClick={() => movePiece(position)}
        >
            <GreenCircle/>
        </PosMove>
    );
};

export default MoveCell;

const PosMove = styled.div<ShadowedProps>`
    width: 64px;
    height: 64px;
    position: absolute;
    cursor: pointer;
    z-index: 4;
    left: ${(props) => props.posX * gameProps.sizes.CellWidth}px;
    top: ${(props) => props.posY * gameProps.sizes.CellWidth}px;
`;

const GreenCircle = styled.span`
    position: absolute;
    width: 50%;
    height: 50%;
    background-color: red;
    border-radius: 50%;
    transform: translate(50%, 50%);
`;