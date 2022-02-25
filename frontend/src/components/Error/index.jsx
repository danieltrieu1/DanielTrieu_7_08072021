import Icon from '../../assets/icon.png'
import styled from 'styled-components'

const StyledIcon = styled.img`
    display: flex;
    justify-content: center;
    width: 20rem;
    height: 20rem;
`

function Error() {
    return (
      <div className="Error">
          <StyledIcon src={Icon} alt='' />
            <h1>404 ERROR</h1>
      </div>
    );
  }
  
  export default Error;
  