import { position } from "~/globaltypes";
import { EmptyDiv } from "./styles";

type Props = {
  position: position;
};

const Empty = ({position}: Props) => {
  return <EmptyDiv posX={position.x} posY={position.y}></EmptyDiv>;
};

export default Empty;

