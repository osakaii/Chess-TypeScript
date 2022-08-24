import styled, { keyframes } from "styled-components";
import gameProps from "~/utils/gameProps";

const alert = keyframes`
    from{
        transform: translateY(100px);
    }
    to{
        transform: translateY(0);
    }
`

export const MainPageDiv = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: #fff0dc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const GameFieldWrapper = styled.div`
    position: relative;
    width: ${gameProps.sizes.boardWidth}px;
    aspect-ratio: 1/1;
`;

export const GameField = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    position: absolute;
    z-index: 3;
`;

export const Check = styled.h1`
    position: absolute;
    top: 10%;
    font-size: 42px;
    color: #C80000;
    animation: ${alert} .5s linear 1;
`;

export const PosMoves = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    position: absolute;
    z-index: 3;
`;

