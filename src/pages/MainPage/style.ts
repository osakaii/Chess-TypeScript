import styled from "styled-components";
import gameProps from "~/utils/gameProps";

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

export const Title = styled.h1`
    color: ${gameProps.colors.brownFont};
`;

export const PosMoves = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    position: absolute;
    z-index: 3;
`;
