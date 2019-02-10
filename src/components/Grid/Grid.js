import styled, {createGlobalStyle} from "styled-components"


 const GridStyle = styled.div`

        display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: row;
    /* color: ${props => (props.whiteColor ? 'white' : 'black')}; */


  }
`
export default GridStyle


