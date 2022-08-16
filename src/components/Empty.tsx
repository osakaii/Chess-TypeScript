import styled from "styled-components";
import gameProps from "../utils/gameProps";

type Props = {
  position: {
    x: number;
    y: number;
  };
};

interface ShadowedProps {
  posX: number;
  posY: number;
}

const Empty = (props: Props) => {

  const { position } = props

  return <EmptyDiv posX={position.x} posY={position.y}></EmptyDiv>;
};

export default Empty;

const EmptyDiv = styled.div<ShadowedProps>`
  width: ${gameProps.sizes.CellWidth}px;
  position: absolute;
  z-index: 3;
  aspect-ratio: 1/1;
  left: ${(props) => props.posX * gameProps.sizes.CellWidth}px;
  top: ${(props) => props.posY * gameProps.sizes.CellWidth}px;
`;
