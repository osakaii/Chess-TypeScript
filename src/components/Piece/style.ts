import styled from "styled-components";
import { position } from "../../globaltypes";
import gameProps from "../../utils/gameProps";

export const PieceDiv = styled.img<position>`
    width: ${gameProps.sizes.CellWidth}px;
    position: absolute;
    z-index: 3;
    cursor: pointer;
    left: ${(props) => props.x * gameProps.sizes.CellWidth}px;
    top: ${(props) => props.y * gameProps.sizes.CellWidth}px;
`;
