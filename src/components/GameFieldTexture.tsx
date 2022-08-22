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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  z-index: 2;
`
const Cell = styled.div`
  width: ${gameProps.sizes.CellWidth}px;
  aspect-ratio: 1/1;
  background-color: ${props => props.color === 'black'? gameProps.colors.blackCell : gameProps.colors.whiteCell};
`