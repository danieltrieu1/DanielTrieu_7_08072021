import styled from 'styled-components'

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const SignupContainer = styled.div`
  margin: 30px;
  border-radius: 2rem;
  background-color: yellow;
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 1px 20px 0px grey;
  max-width: 1200px;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const StyledTitle = styled.h2`
  color: purple;
  padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px;
`

function Signup() {
  return (
    <SignupWrapper>
      <SignupContainer>
        <LeftCol>
          <StyledTitle>
          Ah le noob
          bébé cadum
          il arrive même pas à créer un compte
          </StyledTitle>
        </LeftCol>
      </SignupContainer>
    </SignupWrapper>
  )
}

export default Signup