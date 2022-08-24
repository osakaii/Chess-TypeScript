import styled from "styled-components";
import { ShadowedProps } from "~/globaltypes";
import gameProps from "~/utils/gameProps";

export const EmptyDiv = styled.div<ShadowedProps>`
    width: ${gameProps.sizes.CellWidth}px;
    position: absolute;
    z-index: 3;
    aspect-ratio: 1/1;
    left: ${(props) => props.posX * gameProps.sizes.CellWidth}px;
    top: ${(props) => props.posY * gameProps.sizes.CellWidth}px;
`;
