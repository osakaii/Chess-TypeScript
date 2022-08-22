import styled from "styled-components";
import { ShadowedProps } from "~/globaltypes";
import gameProps from "~/utils/gameProps";

export const PosMove = styled.div<ShadowedProps>`
    width: 64px;
    height: 64px;
    position: absolute;
    cursor: pointer;
    z-index: 4;
    left: ${(props) => props.posX * gameProps.sizes.CellWidth}px;
    top: ${(props) => props.posY * gameProps.sizes.CellWidth}px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const GreenCircle = styled.span`
    position: absolute;
    width: 35%;
    height: 35%;
    background-color: #ff6e13;
    border-radius: 50%;
`;
