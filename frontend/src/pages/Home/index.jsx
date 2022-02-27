import styled from 'styled-components'

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const HomerContainer = styled.div`
  margin: 30px;
  border-radius: 2rem;
  background-color: pink;
  padding: 60px 90px;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 20px 0px grey;
  max-width: 1200px;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const StyledTitle = styled.h2`
  padding-bottom: 30px;
  max-width: 280px;
  line-height: 50px;
`

function Home() {
  return (
    <HomeWrapper>
      <HomerContainer>
        <LeftCol>
          <StyledTitle>
          Arrête de pleurer sale bébé cadum
          "j'arrive pas gneugneugneu"
          </StyledTitle>
        </LeftCol>
      </HomerContainer>
    </HomeWrapper>
  )
}

export default Home