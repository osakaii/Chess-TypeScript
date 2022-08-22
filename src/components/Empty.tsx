import styled from "styled-components";
import { position, ShadowedProps } from "../globaltypes";
import gameProps from "../utils/gameProps";

type Props = {
  position: position;
};

const Empty = ({position}: Props) => {
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
