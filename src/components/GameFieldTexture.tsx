import styled from "styled-components"
import gameProps from '../utils/gameProps';

type Props = {}

const GameFieldTexture = (props: Props) => {
  let turn = false

  return (
    <Field>
       {
          gameProps.sizes.cellsArray.map(cell => {
           
            cell % 8 === 0? turn = !turn : null
            let tempCell = turn ? cell + 1 : cell 
            
            if( tempCell % 2 === 0 ){
              return <Cell color = "black" key={cell}/>
            }
            return <Cell key={cell}/>
          })
        }
    </Field>
  )
}

export default GameFieldTexture

const Field = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  position: absolute;
  z-index: 2;
`
const Cell = styled.div`
  width: ${gameProps.sizes.CellWidth}px;
  aspect-ratio: 1/1;
  background-color: ${props => props.color === 'black'? gameProps.colors.blackCell : gameProps.colors.whiteCell};
`