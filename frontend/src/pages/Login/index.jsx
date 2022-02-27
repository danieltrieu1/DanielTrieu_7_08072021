import styled from 'styled-components'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const LoginContainer = styled.div`
  margin: 30px;
  border-radius: 2rem;
  background-color: lightblue;
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

function Login() {
  return (
    <LoginWrapper>
      <LoginContainer>
        <LeftCol>
          <StyledTitle>
            T'arrives même pas à te connecter
            sale noob bébé cadum
          </StyledTitle>
        </LeftCol>
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Login